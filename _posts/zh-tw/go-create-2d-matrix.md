---
title: "Go：如何正確建立 2D 矩陣？"
excerpt: "在 Go 中建立 2D slice 的實用指南，從直覺做法到連續記憶體配置。"
---

## Slice 還是 Array？
在 Go 裡，array 只能用常數 `int` 建立
```go
arr := [4]int // works

size := 4
arr := [size]int // Not work!
```
所以如果要實作一個建立 N 大小矩陣的函式，就用 `slice`

## 實作

### 直覺做法
- 記憶體使用不佳，矩陣不是連續的

```go
func newMatrix(s int) [][]int {
    
    m := make([][]int, s)
    
    // Wrong!
    //
    // for _, row := range m {
    //     row = make([]int, s)
    // }
    //
    
    for i, _ := range m {
        m[i] = make([]int, s)
    }
    
    return m
}
```
### 方法 2
- 確保得到連續的矩陣

```go
func newMatrix(s int) [][]int {
	// allocate the whole space of the matrix
	spaces := make([]int, s*s)

	// create an empty matrix: [[] [] []...]
	m := make([][]int, s)

	// assign spaces to the matrix
	i, j := 0, 0
	for i < s {
		m[i] = spaces[j : j+s]
		i++
		j += s
	}

	return m
}
```

### 泛型
更有彈性！
```go
func newMatrix[T any](s int) [][]T {
	// allocate the whole space of the matrix
	spaces := make([]T, s*s)

	// create an empty matrix: [[] [] []...]
	m := make([][]T, s)

	// assign spaces to the matrix
	i, j := 0, 0
	for i < s {
		m[i] = spaces[j : j+s]
		i++
		j += s
	}

	return m
}
```
用法
```go
m := newMatrix[unit](3) // [[0 0 0] [0 0 0] [0 0 0]]
```


## 參考資料
- [What is a concise way to create a 2D slice in Go?](https://stackoverflow.com/questions/39804861/what-is-a-concise-way-to-create-a-2d-slice-in-go)
