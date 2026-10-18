---
title: "Solana のトークンと NFT は何が違うのか？"
excerpt: "Solana のトークンアカウント、ミント権限、そして NFT が供給量 1 のトークンにすぎない理由をわかりやすく紹介します。"
---
## はじめに
この記事では、Solana ブロックチェーン上のトークンを、できるだけシンプルに説明します。

注意！ここでは Solana に限った話をしています。Ethereum のトークンとは細部が大きく異なります。興味があれば、両者の違いを調べてみてください。

この記事は、私と同じように[公式ドキュメント](https://spl.solana.com/token)を読んでもまだよくわからない、という人に向けたものです。


## 銀行口座
外貨を例にしましょう。カーニさんが銀行に米ドル、日本円、ユーロを預けたいなら、それぞれに対応する 3 つの口座を開く必要があります。米ドル口座には米ドルしか、円口座には円しか、ユーロ口座にはユーロしか入れられません。

Solana のトークンも同じルールに従います。特定のトークンを保有したいときは、まずそのトークンに対応するアカウントを作成し、それからトークンを送ってもらうことができます。

つまり、複数の種類のトークンを保有したいなら、複数のトークンアカウントが必要です。



## ミント権限
さまざまなトークンを保有するだけでなく、Solana では自分のトークンを発行することもできます。

米ドルにたとえると、「発行」とは、米連邦準備制度が USD というコードの通貨を発行すると宣言するようなものです。実際に米ドルを鋳造（ミント）するまでは、USD の総供給量は 0 です。

その後、連邦準備制度はどれだけの米ドルをミントするかを決められ、ほかの誰も米ドルをミントすることはできません。連邦準備制度は、ミントした米ドルを任意の口座に割り当てられます。自分の米ドル口座でも、ほかの任意の米ドル口座でもかまいません。

つまりミント権限の考え方はシンプルです。トークンの「発行者」だけがそのトークンをミントする権利を持ちます。ほかの人はミントできませんが、そのトークンのアカウントを持っていれば、ミントされたトークンの「受取人」に指定されることはできます。


## NFT
Solana ブロックチェーン上では、NFT は最初に説明したトークンと本質的に何も変わりません。どちらもトークンです。

Solana でトークンを発行するとき、最小単位を設定できます（デフォルトは 0.000000001）。総供給量は上限ありにも無制限にもできます。NFT とは、最小単位が 1 で総供給量が 1 のトークンにすぎないのです！

Solana 上の NFT：

最小単位は 1
1 つミントしたら、すぐにそれ以降のミントを無効にする
同じように、NFT を保管するには、その NFT に対応するアカウントを開く必要があります。

## 実際の操作
ここまでで、Solana のトークンの概念を説明しました。

そう、これだけシンプルなのです！

では、もう少し技術的な部分に進みましょう。CLI を使って実際にトークンを発行します。

英語に抵抗がない人は、[公式ドキュメント](https://spl.solana.com/token)をそのまま参照してもかまいません。

### トークンの発行
```sh
$ spl-token create-token
```
実行結果：
```sh
$ spl-token create-token
Creating token 4o4wYDr7mQGFFawdhdaHCz5CTTeZtsdw4aVdyCApXZHd

Signature: 55e32Jz8qdNxsBHd6TKvGQnuPHvDdKf2vYRU8f1CM4UWNR3FaFtYzmMYCHdzJ15z5CZpeXKu4Qgtcf2Bph136KK82qYQ6JPguUvtktoe6y43BAvgN2C3iyYHWZX1GAB6TbXD3B1nNRHFk4Rxcx7uhnAcB4SUGTXTG4
```
これでトークンが発行されました！トークン ID は `4o4wYDr7mQGFFawdhdaHCz5CTTeZtsdw4aVdyCApXZHd` です。ID はそれぞれ一意なので、実際に試すとあなたのトークン ID は異なります。以降の手順では <token ID> で表します。

### ミント

トークンを発行したら、そのトークンの総供給量を確認できます：
```sh
$ spl-token supply <token ID>
```
実行結果：
```sh
$ spl-token supply 4o4wYDr7mQGFFawdhdaHCz5CTTeZtsdw4aVdyCApXZHd
0
```
まだ何もミントしていないので、現時点の総供給量は 0 のはずです。

### トークンアカウント

そのトークン「だけ」を保管できるトークンアカウントを作成します：
```sh
$ spl-token create-account <token ID>
```
実行結果：
```sh
$ spl-token create-account 4o4wYDr7mQGFFawdhdaHCz5CTTeZtsdw4aVdyCApXZHd
Creating account 9Vz65o3NNNJvhPnheCr6MfFx7HUwxnZt4JhLSXEmmfqz

Signature: smvyxxvZmktfex1dT5umcbqAYZecc2ZFesNUAFQhGfbbLkj2NHM5QJcCZHKrciAVa8gBecMbTFVWhL3k23qSRpM
```
これで、トークン `4o4wYDr7mQGFFawdhdaHCz5CTTeZtsdw4aVdyCApXZHd` 専用のトークンアカウント `9Vz65o3NNNJvhPnheCr6MfFx7HUwxnZt4JhLSXEmmfqz` ができました。


### ミント

```sh
$ spl-token mint <token ID> <amount> <recipient token account>
```
実行結果：
```sh
$ spl-token mint 4o4wYDr7mQGFFawdhdaHCz5CTTeZtsdw4aVdyCApXZHd 100
Minting 100 tokens
  Token: 4o4wYDr7mQGFFawdhdaHCz5CTTeZtsdw4aVdyCApXZHd
  Recipient: 9Vz65o3NNNJvhPnheCr6MfFx7HUwxnZt4JhLSXEmmfqz

Signature: SY6xk2KQNrvizeaCEMvbbQKgPGUYKPZWusjdwWtoAbauqLB8Y3qdKhE6Hp46yhut7z2qcwqSi67uPf6DzA3FfRD
```
<recipient token account> を指定しない場合、デフォルトは自分のトークンアカウントになります。トークンアカウントを事前に作成していなければ、ミントは失敗します。

`4o4wYDr7mQGFFawdhdaHCz5CTTeZtsdw4aVdyCApXZHd` のトークン 100 個を、私のアカウント `9Vz65o3NNNJvhPnheCr6MfFx7HUwxnZt4JhLSXEmmfqz` に送ることができました。

アカウントを確認してみましょう：
```sh
$ spl-token accounts
```
実行結果：
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
4 行目を見ると、先ほど発行したトークンを 100 個持っていることがわかります。ほかのトークンとその数量も一覧に出ています。

次のコマンドを使うと、どのアカウントでどのトークンを持っているかがより明確にわかります：
```sh
$ spl-token account -v
```
実行結果：
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

### NFT の発行

前述のとおり、Solana 上の NFT は基本的に通常のトークンと同じで、最小単位と総供給量が 1 なだけです。実装は次のようになります：

`-- decimals 0` は小数点以下の桁数が 0 という意味で、このトークンは整数単位でしか保有できません。0.1 を送ろうとしても失敗はしませんが、アカウントの残高は増えません。ぜひ試してみてください。
```sh
$ spl-token create-token --decimals 0
```
実行結果：
```sh
$ spl-token create-token --decimals 0
Creating token 9J7Bmg8Yx4dPsSiiQAvdHuwLS5dCf9ET6jyamwpaJUKR

Signature: 5aHJuH1eBvzHQZ2NCHPVPcCioKyfJdiPkhtTVtbfCvUcqeUrZ1vohf1i59pcmZWz8jo9pcqJ9ZkBvAxXstJStwGY
```
続いて、対応するアカウントを作成してトークンをミントします：
```sh
$ spl-token create-account 9J7Bmg8Yx4dPsSiiQAvdHuwLS5dCf9ET6jyamwpaJUKR

$ spl-token mint 9J7Bmg8Yx4dPsSiiQAvdHuwLS5dCf9ET6jyamwpaJUKR 1
```
なお、1 より多くミントすることもでき、成功もしますが、総供給量が 1 を超えてしまい、もう NFT とはみなされません。

1 つのトークンのミントに成功したら、すぐにそのトークンのミント機能を無効にします。

この無効化は元に戻せないため、NFT の定義——すべてのトークンが唯一無二であること——が実現されます。

コマンド：
```sh
$ spl-token authorize <token ID> mint --disable
```
実行結果：
```sh
$ spl-token authorize 9J7Bmg8Yx4dPsSiiQAvdHuwLS5dCf9ET6jyamwpaJUKR mint --disable
Updating 9J7Bmg8Yx4dPsSiiQAvdHuwLS5dCf9ET6jyamwpaJUKR
  Current mint authority: 46hytJBhguswo6S8fCcVtR85HEnb9nd1hwMxFWYnSHXc
  New mint authority: disabled

Signature: 295NVTrVZYSygVXZbNwG91HE99GaosN2QA6U4fNZ5v976nFQXWRk1suLNqM81smniTuH92QgG6YBLfHQ8eM6bEwW
```

## まとめ
- ある種類のトークンを保有するには、そのトークン専用のアカウントが必要。
- NFT とは、最小単位と総供給量が 1 のトークンの一種。


## 参考
- https://spl.solana.com/token
- https://pencilflip.medium.com/solanas-token-program-explained-de0ddce29714
