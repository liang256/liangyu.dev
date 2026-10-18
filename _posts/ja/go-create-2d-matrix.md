---
title: "Go：2 次元行列を正しくつくるには？"
excerpt: "Go で 2 次元スライスをつくる実践ガイド。素朴な方法から連続したメモリ配置まで。"
---

## スライスか配列か？
Go では、配列は定数の `int` でしか作れません
```go
arr := [4]int // works

size := 4
arr := [size]int // Not work!
```
そのため、N サイズの行列をつくる関数を実装したいなら `slice` を使います

## 実装

### 素直な方法
- メモリの使い方がよくなく、行列が連続しない

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
- 連続した行列を確実に得る

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

### ジェネリクス
より柔軟に！
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
使い方
```go
m := newMatrix[unit](3) // [[0 0 0] [0 0 0] [0 0 0]]
```


## 参考
- [What is a concise way to create a 2D slice in Go?](https://stackoverflow.com/questions/39804861/what-is-a-concise-way-to-create-a-2d-slice-in-go)
