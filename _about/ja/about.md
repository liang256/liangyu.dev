# プロフィール - Liang

Liang です。バックエンドエンジニアリング、ワークフロー自動化、クリエイティブテクノロジーが交わる領域でものづくりをしている開発者です。VFX パイプラインツール、AI を活用した制作、個人開発の SaaS など、技術的な深さと領域固有の制約が重なる場所での仕事を続けてきました。

# やっていること

### パイプラインツール
混沌とした制作ワークフローを、安定して再現できるものにするツール。バッチ処理、Houdini の自動化、ヘッドレスレンダリング、そして実際の制作現場で破綻しないドメイン駆動の Python 設計。例：[Enso Executer](https://github.com/liang256/enso-executer)。

### バックエンドエンジニアリング
きれいなドメインモデルとよく考えられた API を持つ、保守しやすいバックエンド。旅行代理店の発券 API 連携、ゼロからの ERP 構築、拡張できなくなった古いシステムの作り直しを手がけてきました。

### 現場で使える AI
ノイズを増やすのではなく、本当に役立つ AI 機能と AI を活用したワークフロー。特に VFX のように、モデルの知識が薄い専門領域で。[このテーマの記事](/ja/posts)は、宣伝ではなく具体的に書いています。

### クリエイティブテクノロジー
出身はアニメーション制作で、Disney Jr. のシリーズでリギングも担当しました。ツールを使う人のことを考え、生成 AI の出力も API のレスポンスとしてではなく、一枚の絵として評価します。

# オープンソース

VFX パイプライン開発者の間でよく知られた OpenUSD のリファレンス、[USD Survival Guide](https://github.com/LucaScheller/VFX-UsdSurvivalGuide) に修正を貢献しました。[マージされたプルリクエスト](https://github.com/LucaScheller/VFX-UsdSurvivalGuide/pull/19)では、USD API の実際の挙動と合っていなかったコード例を修正しました。たとえば：

```diff
- Sdf.AttributeSpec(prim_spec, UsdGeom.Tokens.purpose, ...)
+ Sdf.AttributeSpec(prim_spec, UsdGeom.Tokens.visibility, ...)
- UsdGeom.Primvar.IsPrimvar(primvar)  # Returns: False
+ UsdGeom.Primvar.IsPrimvar(primvar)  # Returns: True
```

# アニメーションからのインスピレーション

Pixar と宮崎駿が物語と美意識への感覚を育て、『ねこぢる草』『オーバー・ザ・ガーデンウォール』『Smiling Friends』が、面白い技術の仕事は技術だけで完結しないことを思い出させてくれます。

# 連絡

パイプラインツールをつくっている方、プロダクトに AI や決済を組み込みたい方、はっきりした世界観のある AI ビジュアルをお探しの方、クリエイティブテックの難しい技術課題について考えている方——ぜひお話ししましょう。メールは [liangyu.chen.dev@gmail.com](mailto:liangyu.chen.dev@gmail.com) までどうぞ。コードは [GitHub](https://github.com/liang256) に、文章は[ブログ](/ja/posts)にあります。
