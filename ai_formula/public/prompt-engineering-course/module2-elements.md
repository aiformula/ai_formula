# 模組二：Prompt 的組成與範例
## Module 2: Prompt Structure and Examples

### 💡 核心概念學習：Prompt 組成、最佳實踐、範例分析

#### 提示的基本結構 (Basic Prompt Structure)

一個有效的提示通常包含以下幾個部分：

**1. 角色設定 (Role Definition)**
```
你是一位經驗豐富的[專業領域]專家，擁有[具體經驗]。
You are an experienced [professional field] expert with [specific experience].
```

**2. 任務描述 (Task Description)**
```
請幫我[具體任務]，要求[具體要求]。
Please help me [specific task] with the requirements of [specific requirements].
```

**3. 輸出格式 (Output Format)**
```
請以[格式]的形式回答，包含[具體內容]。
Please answer in [format] including [specific content].
```

**4. 上下文信息 (Context Information)**
```
背景：[相關背景信息]
Background: [relevant background information]
```

#### 角色設定技巧 (Role Setting Techniques)

**專業角色設定**
```
你是一位擁有10年經驗的市場營銷專家，專精於數位營銷和品牌策略。
You are a marketing expert with 10 years of experience, specializing in digital marketing and brand strategy.
```

**教育角色設定**
```
你是一位耐心的老師，善於用簡單易懂的方式解釋複雜概念。
You are a patient teacher who is good at explaining complex concepts in simple terms.
```

**創意角色設定**
```
你是一位富有創意的作家，擅長創作引人入勝的故事和內容。
You are a creative writer who excels at creating engaging stories and content.
```

#### 上下文管理 (Context Management)

**提供相關背景**
```
我正在為一家香港的中小企業制定AI轉型策略，公司主要從事[行業]。
I am developing an AI transformation strategy for a Hong Kong SME in the [industry] sector.
```

**設定目標受眾**
```
我的目標受眾是[描述]，他們需要[具體需求]。
My target audience is [description] who need [specific needs].
```

**明確期望結果**
```
我希望得到一個[具體類型]的[具體內容]，用於[具體用途]。
I hope to get a [specific type] of [specific content] for [specific purpose].
```

### 📊 範例分析 (Example Analysis)

#### 範例1：商業分析提示

**原始提示：**
```
幫我分析市場趨勢。
Help me analyze market trends.
```

**改進後的提示：**
```
你是一位資深的市場分析師，擁有15年亞太地區市場研究經驗。

請幫我分析2024年香港中小企業在AI技術應用方面的市場趨勢。

背景：我是一家香港科技諮詢公司的業務發展經理，需要為客戶提供市場洞察報告。

請提供：
1. 主要趨勢分析（3-5個重點）
2. 機遇與挑戰
3. 實用的建議
4. 相關數據支持

請以結構化報告的形式回答，包含執行摘要和詳細分析。
```

#### 範例2：內容創作提示

**原始提示：**
```
寫一篇關於AI的文章。
Write an article about AI.
```

**改進後的提示：**
```
你是一位專業的科技作家，專精於AI和數位轉型主題。

請為香港中小企業老闆撰寫一篇關於AI應用的實用指南文章。

要求：
- 文章長度：800-1000字
- 語言：繁體中文
- 風格：實用、易懂、有具體例子
- 目標：幫助讀者理解如何開始AI轉型

文章結構：
1. 引言：AI對中小企業的重要性
2. 主要內容：3-4個實用的AI應用場景
3. 實施建議：具體的開始步驟
4. 結論：鼓勵和展望

請確保內容實用、具體，並包含香港本地案例。
```

### 🎯 最佳實踐 (Best Practices)

#### 清晰性原則 (Clarity Principles)

1. **具體明確** - 避免模糊的詞彙
2. **結構化** - 使用清晰的結構和格式
3. **簡潔** - 去除不必要的冗餘信息
4. **一致性** - 保持語言和風格的一致性

#### 具體性要求 (Specificity Requirements)

**不好的例子：**
```
幫我寫一些內容。
Help me write some content.
```

**好的例子：**
```
請為我的電商網站撰寫3個產品描述，每個描述200字，突出產品特色和用戶價值。
Please write 3 product descriptions for my e-commerce website, each 200 words, highlighting product features and user value.
```

#### 迭代優化方法 (Iterative Optimization)

1. **第一版** - 基本提示
2. **第二版** - 添加角色設定
3. **第三版** - 增加具體要求
4. **第四版** - 優化輸出格式
5. **最終版** - 測試和調整

### 📝 練習任務

**任務1：角色設定練習**
為以下場景設計專業的角色設定：
- 財務顧問
- 技術支持專家
- 創意設計師

**任務2：提示結構化練習**
將以下簡單提示改進為結構化提示：
- "幫我寫郵件"
- "分析數據"
- "設計海報"

**任務3：上下文管理練習**
為你的具體需求設計一個完整的提示，包含所有必要元素。

### 🔍 常見錯誤分析

1. **過於籠統** - 沒有具體要求
2. **缺乏上下文** - AI無法理解背景
3. **格式不明確** - 不知道期望的輸出格式
4. **角色不清** - 沒有明確AI應該扮演的角色

### 📚 實用模板

**商業分析模板：**
```
角色：[專業角色]
任務：[具體分析任務]
背景：[相關背景信息]
要求：[具體要求]
格式：[期望輸出格式]
```

**內容創作模板：**
```
角色：[創作者角色]
主題：[創作主題]
目標受眾：[目標讀者]
風格：[寫作風格]
結構：[內容結構]
要求：[具體要求]
```

---

**下一模組預告：我們將學習提示工程的最佳實踐和進階技巧。**

**Next Module Preview: We will learn best practices and advanced techniques in prompt engineering.** 