---
title: "Heavy Rendering 與 Light Rendering：選得聰明，而不是選得辛苦"
excerpt: "當有人問「哪個渲染器最好——Maya、Blender 還是 Unreal？」，其實有點像在問「哪個程式語言最好——Python、C++ 還是 Java？」"
---
當有人問「哪個渲染器最好——Maya、Blender 還是 Unreal？」，其實有點像在問「哪個程式語言最好——Python、C++ 還是 Java？」

👉 真正的問題不在工具，而在演算法，以及你想要的最終視覺風格。
理解 Heavy Rendering 與 Light Rendering 的差異，你就能做出更聰明的選擇，而不是一味追逐「最好的渲染器」。

## Heavy Rendering vs Light Rendering
Heavy Rendering
* 以多次反彈、反射、折射與全域光照，真實地模擬光線。
* 使用複雜的取樣方法（Monte Carlo、path tracing）。
* 物理正確、結果一致、電影等級的品質。
* 例子：Arnold、Cycles Path Tracing、RenderMan RIS。

Light Rendering
* 簡化計算——通常只算直接光，或使用風格化的近似。
* 平塗色彩、卡通著色、NPR（非寫實渲染）或 scanline。
* 極快，常常接近即時。
* 例子：Maya Software、Blender Eevee、Unreal Engine 即時著色器。

![兩顆球的對照圖——左邊有真實的反射與焦散（Heavy），右邊是平塗的卡通著色（Light）。](/assets/blog/rendering/splited_sphere.png)

## 速度來自演算法，而不是平台

人們很容易以為「Maya 比 Blender 慢」或「UE 比 Arnold 快」。
但事實是：

* 速度差異根源於演算法的選擇，而不是平台。
* 無論是哪個引擎或 DCC，Light Rendering 永遠比 Heavy Rendering 快。
* Maya、Blender 和 Unreal 都同時支援 Heavy 與 Light 兩種渲染流程。

![一群坐在電腦前的貓——一隻滿頭大汗地算著複雜的光線追蹤數學，另一隻悠哉地輸出平塗色彩。](/assets/blog/rendering/heavy_vs_light.png)

## 合成帶來彈性

另一個誤解是把渲染當成只能選一個工具的決定。實務上，工作流程會結合各自的長處：

* 在 Unreal 渲染底色（快）。
* 在 Blender 渲染描邊 pass。
* 把兩者合成，得到最終的視覺效果。

這樣就不必強迫 3D 渲染器「包辦一切」，讓 pipeline 保持高效。

![Pipeline 示意圖——UE → Blender → After Effects/Nuke，箭頭表示各 pass 的合併。](/assets/blog/rendering/pipeline.png)


## 重點整理

* 不要把問題框成 Maya vs Blender vs Unreal。
* 先問：我們需要 Heavy Rendering 還是 Light Rendering？
* 再挑最符合這個選擇的渲染器。
* 用合成結合多種工具，而不是追逐一個萬用的渲染器。

## 結語

把討論從「哪個軟體最好」轉向「哪種演算法方法適合這個專案」，你就能避開無止境的爭論，做出更聰明的渲染決策。
