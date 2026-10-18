---
title: "Heavy Rendering と Light Rendering：頑張るより、賢く選ぶ"
excerpt: "「いちばん良いレンダラーはどれ？ Maya、Blender、それとも Unreal？」と聞くのは、「いちばん良いプログラミング言語はどれ？ Python、C++、それとも Java？」と聞くのに少し似ています。"
---
「いちばん良いレンダラーはどれ？ Maya、Blender、それとも Unreal？」と聞くのは、「いちばん良いプログラミング言語はどれ？ Python、C++、それとも Java？」と聞くのに少し似ています。

👉 本当の問題はツールではなく、アルゴリズムと、最終的にどんなルックにしたいかです。
Heavy Rendering と Light Rendering の違いを理解すれば、「最高のレンダラー」を追いかける代わりに、より賢い選択ができるようになります。

## Heavy Rendering vs Light Rendering
Heavy Rendering
* 複数回のバウンス、反射、屈折、グローバルイルミネーションで光をリアルにシミュレートする。
* 複雑なサンプリング（モンテカルロ法、パストレーシング）を使う。
* 物理的に正確で一貫した、映画品質の結果。
* 例：Arnold、Cycles Path Tracing、RenderMan RIS。

Light Rendering
* 計算を簡略化する。多くは直接光のみ、またはスタイライズされた近似。
* フラットな色、トゥーンシェーディング、NPR（ノンフォトリアリスティックレンダリング）、スキャンライン。
* 非常に高速で、多くはほぼリアルタイム。
* 例：Maya Software、Blender Eevee、Unreal Engine のリアルタイムシェーダー。

![2 つの球の比較画像——左はリアルな反射とコースティクス（Heavy）、右はフラットなカートゥーンシェーディング（Light）。](/assets/blog/rendering/splited_sphere.png)

## 速さはプラットフォームではなく、アルゴリズムから生まれる

「Maya は Blender より遅い」「UE は Arnold より速い」と思い込むのは簡単です。
でも実際は：

* 速度の差は、プラットフォームではなくアルゴリズムの選択に根ざしている。
* エンジンや DCC に関係なく、Light Rendering は常に Heavy Rendering より速い。
* Maya、Blender、Unreal はどれも、Heavy と Light の両方のレンダリングフローをサポートしている。

![パソコンに向かう猫たち——1 匹は複雑なレイトレーシングの計算に汗をかき、もう 1 匹はフラットな色の出力でくつろいでいる。](/assets/blog/rendering/heavy_vs_light.png)

## コンポジットが柔軟性を生む

もう一つの誤解は、レンダリングを一つのツールで決めるものだと考えることです。実際のワークフローでは、それぞれの強みを組み合わせます：

* Unreal でベースカラーをレンダリングする（高速）。
* Blender でアウトラインのパスをレンダリングする。
* 両方をコンポジットして最終的なルックにする。

こうすれば 3D レンダラーに「すべて」をやらせる必要がなく、パイプラインを効率的に保てます。

![パイプラインの図——UE → Blender → After Effects/Nuke、各パスが合成される様子を矢印で示している。](/assets/blog/rendering/pipeline.png)


## ポイント

* Maya vs Blender vs Unreal という構図で考えない。
* まず問う：必要なのは Heavy Rendering か、Light Rendering か？
* そのうえで、その選択にいちばん合うレンダラーを選ぶ。
* 万能のレンダラーを追い求めるより、コンポジットで複数のツールを組み合わせる。

## おわりに

「どのソフトが最高か」から「どのアルゴリズム的アプローチがプロジェクトに合うか」へと議論の軸を移せば、終わりのない論争を避け、より賢いレンダリングの判断ができるようになります。
