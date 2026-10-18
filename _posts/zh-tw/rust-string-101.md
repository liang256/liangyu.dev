---
title: "Rust：String 入門"
excerpt: "附範例的 Rust 字串操作"
---
```rust
fn main() {
    let mut str = String::from("Hello ");
    // let mut str = "Hello "; <- this won't work
    // let mut str = "Hello ".to_string(); <- this works
    println!("Now str: {}", str);
    
    // Get length & capacity of a string
    println!("Length: {} Capacity: {}", str.len(), str.capacity());

    // Push char
    str.push('R');
    println!("Now str: {}", str);

    // Push string
    str.push_str("ust"); // capacity is doubled to 12
    println!("Now str: {}", str);

    // Check if empty
    println!("Is empty: {}", str.is_empty());

    // Check if contains
    println!("Contains 'PHP'? {}", str.contains("PHP"));

    // Replace substring with
    println!("Replace output: {}", str.replace("Rust", "Solana"));
    // replace is not a in-place operation
    // so value of str is still "Hello Rust"

    // Iterate a string by word (whitespace)
    for word in str.split_whitespace() {
        println!("{}", word);
    }

    // Create a string with capacity
    let str_with_cap_10 = String::with_capacity(10);
    println!("Length: {} Capacity: {}", str_with_cap_10.len(), str_with_cap_10.capacity());
}
```

上面的程式會輸出：
```
Now str: Hello 
Length: 6 Capacity: 6
Now str: Hello R
Now str: Hello Rust
Is empty: false
Contains 'PHP'? false
Replace output: Hello Solana
Hello
Rust
Length: 0 Capacity: 10
```

## 用「+」串接字串

```rust
let s1 = String::from("Hello");
let s2 = String::from(" Rust");
let s3 = s1 + &s2; // Note: s1 is no longer valid since it's ownership is moved to s3
// s3 = "Hello Rust"
```

## 用 format! 巨集組合字串
假設我們需要用連字號串接字串
```rust
let s1 = "rust";
let s2 = "ruby";
let s3 = "ray";

let combined_str = format!("{}-{}-{}", s1, s2, s3);
// combined_str = "rust-rude-ray"
```
