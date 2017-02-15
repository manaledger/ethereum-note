package main

import (
	"bytes"
	"encoding/binary"
	"encoding/hex"
	"fmt"
	"os"
	"strings"
	"unicode"
)

func main() {

	arg_num := len(os.Args)

	if arg_num != 2 {
		fmt.Printf("param number error,you expected to input 2 but  %d\n", arg_num)
		return
	}

	str := os.Args[1]
	fmt.Println("转换前16进制字符串:")
	fmt.Println(str)
	org_str := str[2:]
	result_str := ""

	//7a \z 特殊字符分隔字段
	org_strs := strings.Split(org_str, "7a")
	//fmt.Println(org_strs);

	for i, bl := 0, len(org_strs); i < bl; i += 1 {
		if org_strs[i] != "" {
			if i%2 == 0 {
				temp_str, err := a2s(org_strs[i])
				if err == nil {
					result_str += temp_str
				}
			} else {
				temp_str, err := u2s(org_strs[i])
				if err == nil {
					result_str += temp_str
				}
			}
		}

	}
	fmt.Println("转换结果->:")
	fmt.Println(result_str)

}

func u2s(form string) (to string, err error) {
	bs, err := hex.DecodeString(form)

	if err != nil {
		return
	}
	for i, bl, br, r := 0, len(bs), bytes.NewReader(bs), uint16(0); i < bl; i += 2 {
		binary.Read(br, binary.BigEndian, &r)
		to += string(r)
	}
	return
}

func a2s(form string) (to string, err error) {
	bs, err := hex.DecodeString(form)

	if err != nil {
		return
	}
	for i, bl, br, r := 0, len(bs), bytes.NewReader(bs), uint8(0); i < bl; i += 1 {
		binary.Read(br, binary.BigEndian, &r)
		to += string(r)
	}
	return
}

/*
判断字符串是否包含中文字符
*/
func IsChineseChar(str string) bool {
	for _, r := range str {
		if unicode.Is(unicode.Scripts["Han"], r) {
			return true
		}
	}
	return false
}
