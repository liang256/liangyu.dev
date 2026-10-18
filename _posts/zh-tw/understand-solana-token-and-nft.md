---
title: "Solana 的 Token 和 NFT 有什麼不同？"
excerpt: "清楚介紹 Solana 的 token 帳戶、鑄造權，以及為什麼 NFT 只是供應量為 1 的 token。"
---
## 前言
這篇文章想用最簡單的方式，解釋 Solana 區塊鏈上的 token。

注意！這裡專指 Solana，細節和以太坊的 token 差異很大。有興趣的話，可以自行研究兩者的差別。

這篇文章寫給和我一樣，讀過[官方文件](https://spl.solana.com/token)卻還是一頭霧水的人。


## 銀行帳戶
以外幣為例，如果蟹老闆想在銀行存美金、日圓和歐元，他必須開三個對應的帳戶。美金帳戶只能存美金，日圓帳戶只能存日圓，歐元帳戶只能存歐元。

Solana 的 token 也遵循同樣的規則。當我們想持有某個 token，必須先為那個 token 建立一個對應的帳戶，然後才能把 token 轉進去。

所以，如果你想持有多種 token，就需要多個 token 帳戶。



## 鑄造權
除了持有各種 token，我們也可以在 Solana 上發行自己的 token。

用美金來比喻，「發行」就像美國聯準會宣布要發行一種代碼為 USD 的貨幣；在真正鑄造美金之前，USD 的總供應量會是 0。

接著聯準會可以決定要鑄造多少美金，而其他人都不能鑄造美金。聯準會可以把鑄造出的美金分配到任何帳戶：可以是自己的美金帳戶，也可以是任何其他的美金帳戶。

所以鑄造權的概念很直接：只有 token 的「發行者」有權鑄造該 token。其他人不能鑄造，但可以被指定為鑄造出的 token 的「接收者」，前提是他們擁有該 token 的帳戶。


## NFT
在 Solana 區塊鏈上，NFT 本質上和我們一開始談的 token 沒有不同——它們都是 token。

在 Solana 上發行 token 時，我們可以設定最小單位，預設是 0.000000001，總供應量可以有上限也可以沒有。NFT 就只是最小單位為 1、總供應量為 1 的 token！

Solana 上的 NFT：

最小單位是 1
鑄造 1 個之後立刻停用後續鑄造
同樣地，要存放 NFT，我們需要開一個對應該 NFT 的帳戶。

## 實際操作
到這裡，我們已經解釋完 Solana token 的概念。

沒錯，就是這麼簡單！

接下來進入比較技術的部分。我們會用 CLI 實際發行 token。

英文閱讀沒問題的人，可以直接跟著[官方文件](https://spl.solana.com/token)操作。

### 發行 Token
```sh
$ spl-token create-token
```
執行結果：
```sh
$ spl-token create-token
Creating token 4o4wYDr7mQGFFawdhdaHCz5CTTeZtsdw4aVdyCApXZHd

Signature: 55e32Jz8qdNxsBHd6TKvGQnuPHvDdKf2vYRU8f1CM4UWNR3FaFtYzmMYCHdzJ15z5CZpeXKu4Qgtcf2Bph136KK82qYQ6JPguUvtktoe6y43BAvgN2C3iyYHWZX1GAB6TbXD3B1nNRHFk4Rxcx7uhnAcB4SUGTXTG4
```
Token 已經發行了！Token ID 是 `4o4wYDr7mQGFFawdhdaHCz5CTTeZtsdw4aVdyCApXZHd`。每個 ID 都是唯一的，所以你實作時，你的 token ID 會不一樣。接下來的步驟我們用 <token ID> 來代表它。

### 鑄造

發行 token 後，我們可以查看該 token 的總供應量：
```sh
$ spl-token supply <token ID>
```
執行結果：
```sh
$ spl-token supply 4o4wYDr7mQGFFawdhdaHCz5CTTeZtsdw4aVdyCApXZHd
0
```
目前總供應量應該是 0，因為我們還沒有鑄造任何 token。

### Token 帳戶

建立一個「只能」存放該 token 的 token 帳戶：
```sh
$ spl-token create-account <token ID>
```
執行結果：
```sh
$ spl-token create-account 4o4wYDr7mQGFFawdhdaHCz5CTTeZtsdw4aVdyCApXZHd
Creating account 9Vz65o3NNNJvhPnheCr6MfFx7HUwxnZt4JhLSXEmmfqz

Signature: smvyxxvZmktfex1dT5umcbqAYZecc2ZFesNUAFQhGfbbLkj2NHM5QJcCZHKrciAVa8gBecMbTFVWhL3k23qSRpM
```
所以我們的 token 帳戶是 `9Vz65o3NNNJvhPnheCr6MfFx7HUwxnZt4JhLSXEmmfqz`，專門用來存放 token `4o4wYDr7mQGFFawdhdaHCz5CTTeZtsdw4aVdyCApXZHd`。


### 鑄造

```sh
$ spl-token mint <token ID> <amount> <recipient token account>
```
執行結果：
```sh
$ spl-token mint 4o4wYDr7mQGFFawdhdaHCz5CTTeZtsdw4aVdyCApXZHd 100
Minting 100 tokens
  Token: 4o4wYDr7mQGFFawdhdaHCz5CTTeZtsdw4aVdyCApXZHd
  Recipient: 9Vz65o3NNNJvhPnheCr6MfFx7HUwxnZt4JhLSXEmmfqz

Signature: SY6xk2KQNrvizeaCEMvbbQKgPGUYKPZWusjdwWtoAbauqLB8Y3qdKhE6Hp46yhut7z2qcwqSi67uPf6DzA3FfRD
```
如果沒有指定 <recipient token account>，預設會是你自己的 token 帳戶；如果之前沒有建立 token 帳戶，鑄造就會失敗。

我們成功把 100 個 `4o4wYDr7mQGFFawdhdaHCz5CTTeZtsdw4aVdyCApXZHd` token 轉進了我的帳戶 `9Vz65o3NNNJvhPnheCr6MfFx7HUwxnZt4JhLSXEmmfqz`。

查看我們的帳戶：
```sh
$ spl-token accounts
```
執行結果：
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
在第 4 列可以看到，我們持有 100 個剛剛發行的 token。其他 token 與對應的數量也都列出來了。

用下面的指令，可以更清楚地看到我們在哪個帳戶持有哪個 token：
```sh
$ spl-token account -v
```
執行結果：
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

### 發行 NFT

如前所述，Solana 上的 NFT 本質上和一般 token 相同，只是最小單位與總供應量都是 1。實作方式如下：

`-- decimals 0` 表示小數位數為 0，所以這個 token 只能以整數持有。如果你嘗試轉 0.1，並不會失敗，但帳戶餘額不會增加——歡迎自己試試看。
```sh
$ spl-token create-token --decimals 0
```
執行結果：
```sh
$ spl-token create-token --decimals 0
Creating token 9J7Bmg8Yx4dPsSiiQAvdHuwLS5dCf9ET6jyamwpaJUKR

Signature: 5aHJuH1eBvzHQZ2NCHPVPcCioKyfJdiPkhtTVtbfCvUcqeUrZ1vohf1i59pcmZWz8jo9pcqJ9ZkBvAxXstJStwGY
```
接著建立對應的帳戶並鑄造 token：
```sh
$ spl-token create-account 9J7Bmg8Yx4dPsSiiQAvdHuwLS5dCf9ET6jyamwpaJUKR

$ spl-token mint 9J7Bmg8Yx4dPsSiiQAvdHuwLS5dCf9ET6jyamwpaJUKR 1
```
注意，你可以鑄造超過 1 個，也會成功，但總供應量就會超過 1，也就不再算是 NFT 了。

成功鑄造 1 個 token 後，我們立刻停用該 token 的鑄造功能。

這個停用是不可逆的，因此達成了 NFT 的定義——每個 token 都是獨一無二的。

指令：
```sh
$ spl-token authorize <token ID> mint --disable
```
執行結果：
```sh
$ spl-token authorize 9J7Bmg8Yx4dPsSiiQAvdHuwLS5dCf9ET6jyamwpaJUKR mint --disable
Updating 9J7Bmg8Yx4dPsSiiQAvdHuwLS5dCf9ET6jyamwpaJUKR
  Current mint authority: 46hytJBhguswo6S8fCcVtR85HEnb9nd1hwMxFWYnSHXc
  New mint authority: disabled

Signature: 295NVTrVZYSygVXZbNwG91HE99GaosN2QA6U4fNZ5v976nFQXWRk1suLNqM81smniTuH92QgG6YBLfHQ8eM6bEwW
```

## 總結
- 要持有某種 token，你必須擁有該 token 專屬的帳戶。
- NFT 是一種最小單位與總供應量都是 1 的 token。


## 參考資料
- https://spl.solana.com/token
- https://pencilflip.medium.com/solanas-token-program-explained-de0ddce29714
