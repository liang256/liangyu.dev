---
title: "The Perks of ChatGPT Plus: Is It Worth $20 a Month?"
excerpt: "If you think ChatGPT Plus is too expensive at $20 a month, or you're on the fence about subscribing, this one's for you."
---

If you think $20 a month is too expensive, or you're on the fence about subscribing, this one's for you.
## Better Answers
### Translation
A very simple translation task shows the difference between the free version (ChatGPT 3.5) and the paid versions (ChatGPT 4, ChatGPT 4o):
```text
Prompt：翻譯成英文：「小傑與奇犽」
ChatGPT 3.5："Xiao Jie and Qi Ya" 
ChatGPT 4：「小傑與奇犽」在英文中可以翻譯為 "Gon and Killua"。這是來自日本動漫《Hunter × Hunter》的兩個角色名稱。 
ChatGPT 4o："Gon and Killua"
```
(The prompt asks for the Chinese names 「小傑與奇犽」 in English. 3.5 transliterates them literally; 4 and 4o recognise them as Gon and Killua from *Hunter × Hunter*.)

### Coding
```text
prompt：請寫一個Python函數來計算一個列表中所有數字的平方並返回一個新列表。
```
(“Write a Python function that squares every number in a list and returns a new list.”)

ChatGPT3
```python
def square_numbers(numbers):
    result = []
    for number in numbers:
        result.append(number ** 2)
    return result

# 示例使用
numbers = [1, 2, 3, 4, 5]
squared_numbers = square_numbers(numbers)
print(squared_numbers)  # 輸出: [1, 4, 9, 16, 25]
```

ChatGPT4
```python
def square_numbers(numbers):
    # 使用列表生成式提高效率和簡潔性
    return [number ** 2 for number in numbers]

# 示例使用
numbers = [1, 2, 3, 4, 5]
squared_numbers = square_numbers(numbers)
print(squared_numbers)  # 輸出: [1, 4, 9, 16, 25]
```
- **ChatGPT 3.5**: gives a working solution, but builds the result with a traditional for loop, so the code is longer and less concise.
- **ChatGPT 4**: gives a more efficient, more concise solution using a list comprehension, and the code is clearer and easier to read.

## It Understands Images
It can analyse a financial report:

![](/assets/blog/is-chatgpt-worth-20-per-month/tesla-financial-report.webp)
<br/>

ChatGPT's reply:
```text
從數據可以看出，特斯拉的季度營收在2021年和2022年呈上升趨勢，特別是在2022年第四季度達到了最高的24,318百萬美元。2023年儘管也保持了較高的營收，但略有波動。2024年第一季度的營收有所下降，為21,301百萬美元。
```
(“The data shows Tesla's quarterly revenue trending upward through 2021 and 2022, peaking at $24,318 million in Q4 2022. Revenue stayed high in 2023 but fluctuated slightly, and dipped to $21,301 million in Q1 2024.”)

There are lots of situations where it's inconvenient to turn something into text, or you just can't be bothered — so paste a screenshot into ChatGPT instead. For example, screenshot a conversation and ask ChatGPT how you might reply, or upload a photo of your dinner and ask it to break down the nutrition.

Beyond understanding images, the paid version can also call DALL-E to generate images, and analyse uploaded PDF files.

## Personalisation

"Custom instructions" and "Memory" are both powerful features that only come with the paid version!

Custom instructions let you set your background and how you want ChatGPT to reply. For example, when I asked it to compare blogging platforms, it took my job into account and recommended building my own site with Next.js on Vercel instead of WordPress.

Memory lets it remember your preferences and past conversations. Normally every chat is independent and ChatGPT doesn't know what you said in another one, but with memory it does. For example, when I asked for writing ideas, it remembered that we'd discussed AI-related topics before, so it picked up where we left off and gave me more consistent answers.

![](/assets/blog/is-chatgpt-worth-20-per-month/customed-chatgpt.webp)

## Role-Play and Companionship

It started out as pure fun and testing, but it got more addictive the more I played!

A lot of the time, the reason we chat with friends is to feel understood, validated or encouraged, or to talk something through. ChatGPT does all of that well, and there's almost nothing it won't talk about (apart from some sensitive topics — though there are ways around that, which I'll share another time). It's arguably the best listener there is. Personalisation goes a long way here; without it, the conversation feels noticeably like talking to an AI.

![](/assets/blog/is-chatgpt-worth-20-per-month/chat-with-megumi.webp)

## Priority Access

Paid users get priority access, so it doesn't lag even at peak times — a real plus for heavy users.


## Why Go Paid
- Noticeably more accurate answers
- It understands images, can call DALL-E to generate images, and can analyse uploaded PDFs
- Custom instructions and memory

##### Is It Worth It?

Are these features and advantages worth $20 a month? For anyone who wants a more personalised, higher-quality experience, the answer is a clear yes.

## You're a Good Fit for the Paid Version If You're…
### A Professional

- You need precise technical advice and code examples.
- You're writing and polishing your résumé, or practising for interviews.
- You want market analysis and business strategy suggestions.
- You're answering academic questions or writing research reports.

### A Content Creator

- You're looking for inspiration and creative ideas.
- You're writing high-quality blog posts and video scripts.

### Someone Looking for Companionship

- You want a genuine, emotionally engaged conversation.
- You want a "friend" who remembers your preferences.
