---
seoTitle: "Prompt Swim：結合 Stripe 用量計費的 AI 圖片藝廊案例研究"
subtitle: "用多少付多少的 AI 圖片藝廊——OpenAI 生圖、Stripe Checkout，以及永遠不會重複扣款的點數帳本。"
excerpt: "案例研究：我如何打造 Prompt Swim——使用者透過 Stripe 購買點數、用點數以 DALL·E 生成圖片的公開 AI 圖片藝廊。涵蓋第三方 API 串接、以 webhook 驅動的金流、交易式點數帳務，以及給正要在產品中加入 AI 與計費功能的團隊的經驗分享。"
role: "獨立完成——產品、設計、工程、營運"
platform: "網頁（Next.js on Vercel）"
cta: "需要 AI 功能、金流，或把第三方 API 串進你的產品嗎？一起聊聊吧。"
---

Prompt Swim 是一個公開的 AI 生成圖片藝廊，每張圖都會附上生成它的 prompt。使用者用 Google 登入、透過 Stripe 購買點數包，再用點數呼叫 OpenAI 的 DALL·E 模型生成圖片。每張成果都會存進個人頁面和共用動態牆，讓藝廊同時成為一座大家可以互相學習的 prompt 圖書館。

表面上它是個小產品，但底下有大多數 AI 與 SaaS 產品都需要的元件：付費的第三方 API、透過 webhook 回呼的金流服務、使用者帳號、檔案儲存，以及一本在任何環節中途失敗時都必須保持正確的帳本。這篇案例研究說明這些元件如何組合在一起，寫給正在規劃類似串接的團隊。

![Prompt Swim 藝廊：每張圖都連結到作者與生成它的 prompt。](/assets/work/prompt-swim/gallery.jpg)

## 使用者體驗

1. **瀏覽。** 首頁是所有人作品的無限捲動動態牆，最新的排在最前面。點開圖片可以看到原始 prompt、使用的模型、作者，以及分享／收藏按鈕。
2. **登入。** 只提供 Google OAuth：一鍵完成，不需要保管任何密碼。第一次登入會自動建立帶有唯一帳號名稱的公開個人頁面和點數帳戶。
3. **生成。** 選擇模型（DALL·E 3 或 DALL·E 2）、輸入 prompt，也可以選擇匿名發布。圖片幾秒內出現，點數餘額同步更新。
4. **儲值。** 點數用完時，價格頁透過 Stripe Checkout 販售四種點數包。沒有訂閱制。

![用多少付多少：四種點數包，每個模型的花費一開始就標清楚。](/assets/work/prompt-swim/pricing.png)

## 為什麼用點數而不是訂閱

AI 生成的每一次請求都有實際成本，而且用量起伏很大：有人生成三張就離開，有人一個晚上生成三百張。固定月費不是對前者收太多，就是在後者身上賠錢。

預付點數兩邊都照顧到：

- **價格跟著成本走。** DALL·E 3 的上游成本比 DALL·E 2 高，所以收 60 點而不是 30 點。各模型的價格放在設定檔裡，OpenAI 調價時只要改環境變數，不用重新部署。
- **不會有未付款的用量。** 錢在呼叫 API 之前就已入帳，不需要開發票，也不用追討續約失敗的信用卡。
- **買越多越划算。** $2 方案每美元 600 點，$30 方案每美元 1,000 點。

## 架構

```
Browser (Next.js App Router + React Query)
  │
  ├─► /api/generate-image ── auth ─► OpenAI Images API
  │                                   └─► copy result to S3
  │                                   └─► Mongo transaction:
  │                                         insert image + deduct points
  │
  ├─► /api/create-checkout-session ─► Stripe Checkout
  │                                   └─► order saved as "created"
  │
  └─► /api/images?page=n ─► paginated public feed

Stripe ─► /api/stripe-webhook ── verify signature
                                 └─► Mongo transaction:
                                       order → "completed" + credit points
```

- **Next.js on Vercel**：同一套程式碼提供 UI 和所有 API route。生成圖片的 route 設定了較長的函式逾時，因為 DALL·E 3 的呼叫可能需要一段時間。
- **Auth.js 搭配 Google** 處理登入，session 以 JWT 保存，使用者資料透過官方 adapter 存進 MongoDB。`createUser` 事件會同時建立個人頁面和點數帳戶，不會出現沒有帳戶的使用者。
- **MongoDB** 儲存個人資料、圖片、點數帳戶和訂單。所有牽涉到錢的操作都在多文件交易（transaction）中執行。
- **AWS S3** 永久保存圖片。OpenAI 只回傳臨時網址，所以每張結果都會被下載、以自己的 ID 重新上傳，並附上使用者與模型的 metadata。

## 串接 OpenAI：當成付費且不可靠的外部依賴來對待

呼叫 OpenAI 只要一行，大部分的功夫都在它周圍：

- **花錢之前先驗證。** 未登入的請求、空白 prompt、未知的模型，都會在送往上游之前被擋下。模型清單在伺服器端檢查，不只是下拉選單。
- **有型別的錯誤。** OpenAI 端的失敗（例如違反內容政策）會變成 `ImageGenerationError` 並回傳 400 與易讀訊息；我自己程式的 bug 則回傳 500。使用者看到的是「你的 prompt 被拒絕了」，而不是 stack trace。
- **保留模型實際做了什麼。** DALL·E 3 會在生成前改寫 prompt。改寫後的 `revised_prompt` 和使用者原始輸入一起保存，對學習寫 prompt 的使用者和除錯都很有用。
- **資產掌握在自己手上。** 因為圖片在寫入任何紀錄前就已複製到 S3，藝廊永遠不會出現一小時後就失效的連結。

## 串接 Stripe：webhook 才是唯一的真相來源

最常見的金流 bug，是因為使用者進到「付款成功」頁面就幫他加點數。但使用者會關分頁、有些付款方式會延後結清，成功網址也可以被直接造訪。Prompt Swim 從不在瀏覽器端加任何點數。

**1. 價格由伺服器決定。** 前端只告訴伺服器要買哪個方案，價格由伺服器依自己的價目表計算；兩者不一致就拒絕請求。在 DevTools 改請求內容，也不可能用 $2 買到 30,000 點。

**2. 每次結帳都記成一筆訂單。** 建立 Checkout Session 時，會以 Stripe session ID 存下一筆訂單，狀態為 `created`，並記錄使用者、點數與以「分」為單位的價格。

**3. 只有通過驗證的 webhook 能推進訂單狀態。** webhook route 用原始 request body 驗證 Stripe 的簽章，再處理以下事件：

- `checkout.session.completed` 且 `payment_status: paid` → 履約：訂單 → `completed`，加上點數
- `checkout.session.async_payment_succeeded` → 履約（適用延後結清的付款方式）
- `checkout.session.async_payment_failed` → 訂單 → `failed`
- `checkout.session.expired` → 訂單 → `expired`

**4. 履約是冪等的。** Stripe 會重送 webhook，有時同一事件會送兩次。訂單狀態就是一個小型狀態機：`created` 的訂單只能履約一次；對 `completed` 的訂單再次履約什麼都不會發生；對 `expired` 或 `failed` 的訂單履約則會直接報錯，而不是默默加點。重複送達不會造成重複加點。

**5. 訂單狀態和餘額一起變動。** 把訂單標為完成和加上點數在同一個 MongoDB 交易中執行，要嘛都成功、要嘛都不發生，永遠不會出現「付了錢卻沒拿到點數」、需要人工補救的狀態。

## 點數帳本

扣點用的是同一個模式，只是方向相反。圖片生成並存好之後，同一個交易會寫入圖片紀錄並扣除對應點數。如果資料庫寫入失敗，使用者不會為看不到的圖付錢；藝廊裡也不會出現沒付費的圖片。

## 現在的我會怎麼改

這套系統完成了它的任務，但帶著正式環境的經驗重讀一遍，如果是客戶專案，我會再收緊三個地方：

- **在呼叫模型之前預扣點數，而不是之後。** 目前餘額檢查發生在生成之後，所以點數不足的使用者仍會觸發一次付費的 OpenAI 呼叫，然後才被拒絕。改成「預扣 → 生成 → 結算或退回」的流程就能解決。
- **用有條件的原子更新處理餘額。** 現在是讀取餘額、修改、再寫回。在交易中這是正確的，但用一個帶有 `balance >= cost` 條件的 `$inc` 更簡單，在高併發下也更穩。
- **記錄已處理過的 webhook event ID。** 訂單狀態機已經能防止重複加點，但保存 Stripe 的 event ID 能讓重播和稽核更容易追蹤。

這些都不是上線前必須解決的問題。但知道邊界在哪裡，正是 demo 和可以交接給別人的系統之間的差別。

## 如果你正在打造類似的東西

Prompt Swim 是我自己的產品，但這些元件幾乎出現在每一個要在既有業務中加入 AI 或金流的專案裡：

- **在產品中加入 AI 功能** → 伺服器端呼叫模型，搭配驗證、有型別的錯誤處理、每次請求的成本計算，以及由你掌控的輸出儲存
- **依用量收費** → 預付點數、用量計費或 Stripe 訂閱，價格一律在伺服器端把關
- **安全地收款** → Stripe Checkout 搭配驗證簽章、冪等的 webhook，作為唯一的真相來源
- **讓金錢與資料保持一致** → 交易式寫入，中途失敗也不會讓客戶被扣款卻沒拿到服務
- **串接第三方 API** → OAuth 登入、雲端儲存，以及你的產品所依賴的任何 REST 或 webhook 服務

我常協助的專案類型：在既有 app 中加入生成式 AI（圖片、文字、視覺辨識）、在 Stripe 上建置用量或點數計費、把金流、登入或儲存服務串進 Next.js 或 Python 後端，以及檢查既有串接是否有上面提到的重複扣款或 webhook 遺失問題。
