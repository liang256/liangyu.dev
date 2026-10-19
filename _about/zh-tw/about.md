# 關於我 - Liang

我是 Liang，一名在後端工程、工作流程自動化與創意科技交會處打造產品的開發者。我的經歷橫跨 VFX pipeline 工具、AI 輔助製作與獨立 SaaS——這些工作往往落在技術深度與特定領域限制交織的地方。

# 我在做什麼

### Pipeline 工具
讓混亂的製作流程變得可靠、可重複的工具：批次處理、Houdini 自動化、無頭渲染，以及在真實製作現場站得住的領域驅動 Python 架構。例如 [Enso Executer](https://github.com/liang256/enso-executer)。

### 後端工程
可維護的後端系統，乾淨的領域模型、經過思考的 API。我串接過旅行社票務 API、從零打造 ERP 系統，也重建過脆弱到無法擴充的老舊系統。

### 實戰中的 AI
真正幫得上忙、而不是製造雜訊的 AI 功能與 AI 輔助流程，尤其是在 VFX 這類模型懂得比較少的特定領域。我[在這方面的文章](/zh-tw/posts)力求具體，不做推銷。

### 創意科技
我來自動畫業，包括替一部 Disney Jr. 影集做綁定（rigging）。我會思考使用工具的人，也會把生成式 AI 的產出當成一張圖來評判，而不只是一個 API 回應。

# 開源貢獻

我曾為 [USD Survival Guide](https://github.com/LucaScheller/VFX-UsdSurvivalGuide) 貢獻修正，這是 VFX pipeline 開發者之間知名的 OpenUSD 參考資料。[我被合併的 pull request](https://github.com/LucaScheller/VFX-UsdSurvivalGuide/pull/19) 修正了幾個和 USD API 實際行為不符的範例，例如：

```diff
- Sdf.AttributeSpec(prim_spec, UsdGeom.Tokens.purpose, ...)
+ Sdf.AttributeSpec(prim_spec, UsdGeom.Tokens.visibility, ...)
- UsdGeom.Primvar.IsPrimvar(primvar)  # Returns: False
+ UsdGeom.Primvar.IsPrimvar(primvar)  # Returns: True
```

# 來自動畫的靈感

Pixar 與宮崎駿塑造了我對敘事與工藝的感受；《貓湯》、《花園牆外》、《Smiling Friends》則提醒我：有趣的技術工作從來不只是技術。

# 聯絡

如果你正在打造 pipeline 工具、想在產品中加入 AI 或金流、在找有明確風格的 AI 視覺，或在創意科技中思考一個困難的技術問題——我很有興趣聊聊。歡迎寄信到 [liangyu.chen.dev@gmail.com](mailto:liangyu.chen.dev@gmail.com)。你可以在 [GitHub](https://github.com/liang256) 找到我的程式碼，在[部落格](/zh-tw/posts)讀到我的文章。
