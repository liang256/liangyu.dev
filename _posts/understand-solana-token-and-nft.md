---
title: What Is Different Between Solana Token and NFT?
date: "2022-04-22T22:22:39"
excerpt: ""
coverImage: "/assets/blog/understand-solana-token-and-nft/cover.jpg"
author:
  name: Liang
  picture: "/assets/blog/authors/jj.jpeg"
ogImage:
  url: "/assets/blog/understand-solana-token-and-nft/cover.jpg"
---
## Introduction
This article aims to explain tokens on the Solana blockchain in the simplest way possible.

Note! This specifically refers to Solana, as the details differ significantly from Ethereum tokens. If you're interested, you can research the differences between the two.

This article is for those who have read the [official documentation](https://spl.solana.com/token) but still feel lost, like I did.


## Bank Accounts
Using foreign currency as an example, if Mr. Crab wants to deposit USD, JPY, and EUR in a bank, he must open three corresponding accounts. A USD account can only hold USD, a JPY account can only hold JPY, and an EUR account can only hold EUR.

Solana tokens follow the same rule. When we want to hold a specific token, we must first create an associated account for that token, and then we can transfer the token into it.

So, if you want to hold multiple types of tokens, you'll need multiple token accounts.



## Minting Rights
In addition to holding various tokens, we can also issue our own tokens on Solana.

Using USD as an analogy, "issuing" is like the US Federal Reserve announcing that it will issue a currency with the code USD; before actually minting USD, the total supply of USD will be 0.

The Federal Reserve can then decide how much USD to mint, and no one else can mint USD. The Federal Reserve can allocate the minted USD to any account: either to its own USD account or to any other USD account.

So, the concept of minting rights is straightforward: only the token "issuer" has the right to mint that token. Others cannot mint it but can be designated as the "recipient" of the minted tokens, provided they have an account for that token.


## NFT
On the Solana blockchain, NFTs are essentially no different from the tokens we initially discussed—they are all tokens.

When issuing tokens on Solana, we can set the smallest unit, which defaults to 0.000000001, and the total supply can be limited or unlimited. An NFT is simply a token with the smallest unit of 1 and a total supply of 1!

NFTs on Solana:

Smallest unit is 1
Minting 1 immediately disables further minting
Similarly, to store an NFT, we need to open an account corresponding to that NFT.

## Practical Operation
Up to this point, we have explained the concept of Solana tokens.

Yes, it's that simple!

Now, let's move on to the more technical part. We'll use the CLI to issue tokens in practice.

For those comfortable with English, you can directly follow the [official documentation](https://spl.solana.com/token).

### Issuing Tokens
```sh
$ spl-token create-token
```
Execution result:
```sh
$ spl-token create-token
Creating token 4o4wYDr7mQGFFawdhdaHCz5CTTeZtsdw4aVdyCApXZHd

Signature: 55e32Jz8qdNxsBHd6TKvGQnuPHvDdKf2vYRU8f1CM4UWNR3FaFtYzmMYCHdzJ15z5CZpeXKu4Qgtcf2Bph136KK82qYQ6JPguUvtktoe6y43BAvgN2C3iyYHWZX1GAB6TbXD3B1nNRHFk4Rxcx7uhnAcB4SUGTXTG4
```
The token has now been issued! The token ID is `4o4wYDr7mQGFFawdhdaHCz5CTTeZtsdw4aVdyCApXZHd`. Each ID is unique, so when you implement it, your token ID will be different. We will use <token ID> to represent it in the following steps.

### Minting

After issuing the token, we can check the total supply of the token:
```sh
$ spl-token supply <token ID>
```
Execution result:
```sh
$ spl-token supply 4o4wYDr7mQGFFawdhdaHCz5CTTeZtsdw4aVdyCApXZHd
0
```
Currently, the total supply should be 0 because we haven't minted any tokens yet.

### Token Account

Create a token account that can "only" store that token:
```sh
$ spl-token create-account <token ID>
```
Execution result:
```sh
$ spl-token create-account 4o4wYDr7mQGFFawdhdaHCz5CTTeZtsdw4aVdyCApXZHd
Creating account 9Vz65o3NNNJvhPnheCr6MfFx7HUwxnZt4JhLSXEmmfqz

Signature: smvyxxvZmktfex1dT5umcbqAYZecc2ZFesNUAFQhGfbbLkj2NHM5QJcCZHKrciAVa8gBecMbTFVWhL3k23qSRpM
```
So, our token account is `9Vz65o3NNNJvhPnheCr6MfFx7HUwxnZt4JhLSXEmmfqz`, which is specifically for storing the token `4o4wYDr7mQGFFawdhdaHCz5CTTeZtsdw4aVdyCApXZHd`.


### Minting

```sh
$ spl-token mint <token ID> <amount> <recipient token account>
```
Execution result:
```sh
$ spl-token mint 4o4wYDr7mQGFFawdhdaHCz5CTTeZtsdw4aVdyCApXZHd 100
Minting 100 tokens
  Token: 4o4wYDr7mQGFFawdhdaHCz5CTTeZtsdw4aVdyCApXZHd
  Recipient: 9Vz65o3NNNJvhPnheCr6MfFx7HUwxnZt4JhLSXEmmfqz

Signature: SY6xk2KQNrvizeaCEMvbbQKgPGUYKPZWusjdwWtoAbauqLB8Y3qdKhE6Hp46yhut7z2qcwqSi67uPf6DzA3FfRD
```
If <recipient token account> is not specified, the default will be your token account; if a token account hasn't been created previously, the minting will fail.

We successfully transferred 100 tokens of `4o4wYDr7mQGFFawdhdaHCz5CTTeZtsdw4aVdyCApXZHd` to my account `9Vz65o3NNNJvhPnheCr6MfFx7HUwxnZt4JhLSXEmmfqz`.

Checking our accounts:
```sh
$ spl-token accounts
```
Execution result:
```sh
$ spl-token accounts
Token                                         Balance
---------------------------------------------------------------
2KN5U3jFNC5hf5tCELzg86zi27urr81XMo5MGkC4PiKY  0.100000001
2XkLQPjaXDsRSyF5xV8TBArBwwmUsVmviAyMx675EFDt  1
3M41XViQ3ARAgwEd3Nq3xZEtE7fZEQQd4X25gumMPLQQ  22
4o4wYDr7mQGFFawdhdaHCz5CTTeZtsdw4aVdyCApXZHd  100
6Ta6A8XaohhU1pAaRSKkmuMAKJyVLuYAXizKSyNyaueK  2
95dgoH52qHRapAb8DtW4uQxdcMiyhqG4cS1J4UH8744G  0.11
CmyPi9HBo1yszknenu71vWJaJ9VT5Lnt5Q7SpBXQK4AY  1
GZeBB6EdP4Yrdx9jHed15dCj9ToA9ff8uQiTkfuW6Xc9  1
```
You can see in the 4th row that we have 100 tokens of the one we just issued. The other tokens and their corresponding amounts are also listed.

Using the following command, we can see more clearly in which account we hold which token:
```sh
$ spl-token account -v
```
Execution result:
```sh
$ spl-token account -v
Token                                         Account                                       Balance
----------------------------------------------------------------------------------------------------------
2KN5U3jFNC5hf5tCELzg86zi27urr81XMo5MGkC4PiKY  14si8Shrx9vnVMBbFq5QEgjX1iwG4d7Ffmt6zoHdcA1Q  0.100000001
2XkLQPjaXDsRSyF5xV8TBArBwwmUsVmviAyMx675EFDt  2o6ud26e1bCPYdfMjS1ctHYXXXYPRaEMxLq3WFmC8jyv  1
3M41XViQ3ARAgwEd3Nq3xZEtE7fZEQQd4X25gumMPLQQ  CZ7645yM6g5JFcvHPBVXN8xWKdRdBiykXNLdF1t2kbbe  22
4o4wYDr7mQGFFawdhdaHCz5CTTeZtsdw4aVdyCApXZHd  9Vz65o3NNNJvhPnheCr6MfFx7HUwxnZt4JhLSXEmmfqz  100
6Ta6A8XaohhU1pAaRSKkmuMAKJyVLuYAXizKSyNyaueK  ypBba7nbYHgNg6T6L37iK2C52DAMJm8vB4Q8Qx66m8y   2
95dgoH52qHRapAb8DtW4uQxdcMiyhqG4cS1J4UH8744G  7xonGX7bnV31XL7BDX1YJSEQUBSrd5mb3FdNyLbkEaNZ  0.11
CmyPi9HBo1yszknenu71vWJaJ9VT5Lnt5Q7SpBXQK4AY  HVo4VECQ14Ffq5922E5X5yVbwsSebSESatt6UviZLFtA  1
GZeBB6EdP4Yrdx9jHed15dCj9ToA9ff8uQiTkfuW6Xc9  8uyD4nnnqRmV1mVuLE6hmfAiqVt7Krvc7tAmat2NN5cx  1
```

### Issuing NFTs

As mentioned earlier, NFTs on Solana are fundamentally the same as regular tokens, just with a minimum unit and a total supply of 1. The implementation would be as follows:

`-- decimals 0` means there are 0 decimal places, so the token can only be held in whole numbers. If you try to transfer 0.1, it will not fail, but the account balance will not increase—feel free to try it out.
```sh
$ spl-token create-token --decimals 0
```
Execution result:
```sh
$ spl-token create-token --decimals 0
Creating token 9J7Bmg8Yx4dPsSiiQAvdHuwLS5dCf9ET6jyamwpaJUKR

Signature: 5aHJuH1eBvzHQZ2NCHPVPcCioKyfJdiPkhtTVtbfCvUcqeUrZ1vohf1i59pcmZWz8jo9pcqJ9ZkBvAxXstJStwGY
```
Next, create the corresponding account and mint the token:
```sh
$ spl-token create-account 9J7Bmg8Yx4dPsSiiQAvdHuwLS5dCf9ET6jyamwpaJUKR

$ spl-token mint 9J7Bmg8Yx4dPsSiiQAvdHuwLS5dCf9ET6jyamwpaJUKR 1
```
Note that you can mint more than 1, and it will succeed, but the total supply will exceed 1, and it won't be considered an NFT anymore.

After successfully minting 1 token, we immediately disable the minting feature for that token.

This disabling is irreversible, thus achieving the definition of an NFT—each token is unique.

Command:
```sh
$ spl-token authorize <token ID> mint --disable
```
Execution result:
```sh
$ spl-token authorize 9J7Bmg8Yx4dPsSiiQAvdHuwLS5dCf9ET6jyamwpaJUKR mint --disable
Updating 9J7Bmg8Yx4dPsSiiQAvdHuwLS5dCf9ET6jyamwpaJUKR
  Current mint authority: 46hytJBhguswo6S8fCcVtR85HEnb9nd1hwMxFWYnSHXc
  New mint authority: disabled

Signature: 295NVTrVZYSygVXZbNwG91HE99GaosN2QA6U4fNZ5v976nFQXWRk1suLNqM81smniTuH92QgG6YBLfHQ8eM6bEwW
```

## Summary
- To hold one type of token, you must have an account for that specific token.
- An NFT is a type of token with a minimum unit and total supply of 1.


## Reference
- https://spl.solana.com/token
- https://pencilflip.medium.com/solanas-token-program-explained-de0ddce29714