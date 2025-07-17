# 🎨 AI Formula 統一空間與尺寸系統指南

## 📋 **作為你嘅專業 UI/UX 設計師，我為你建立咗一套完整嘅『空間與尺寸規範』！**

呢個系統將徹底解決你網站『尺寸混亂』嘅問題，令到所有元素都有和諧嘅節奏感同專業感。

---

## 🎯 **第一步：間距系統 (8px 基礎單位)**

### **基於 8px Grid System 嘅間距階梯**

```css
--space-1: 4px    /* xx-small: icon 同文字之間嘅微調 */
--space-2: 8px    /* x-small: 細微元素之間 */
--space-3: 12px   /* small: 文字和圖標之間 */
--space-4: 16px   /* medium: 按鈕內部嘅 padding */
--space-6: 24px   /* large: 卡片內部嘅 padding */
--space-8: 32px   /* x-large: 章節標題同內容之間嘅距離 */
--space-12: 48px  /* xxx-large: 不同區塊 (section) 之間嘅大距離 */
--space-16: 64px  /* huge: 主要區域之間 */
--space-24: 96px  /* gigantic: 頁面級別間距 */
```

### **使用指南：**

| 用途 | 間距變數 | 實際值 | 使用場景 |
|------|----------|--------|----------|
| 微調間距 | `var(--space-1)` | 4px | Icon 和文字之間 |
| 小間距 | `var(--space-2)` | 8px | 標籤內部、小元素間 |
| 中小間距 | `var(--space-3)` | 12px | 按鈕 icon 和文字間 |
| 標準間距 | `var(--space-4)` | 16px | 按鈕內部 padding |
| 卡片間距 | `var(--space-6)` | 24px | 卡片內部 padding |
| 區塊間距 | `var(--space-8)` | 32px | 組件之間距離 |
| 大區塊間距 | `var(--space-12)` | 48px | Section 之間 |
| 頁面間距 | `var(--space-16)` | 64px | 主要區域間距 |

---

## 📝 **第二步：統一字體層級**

### **清晰嘅資訊層次結構**

```css
/* 標題層級 */
.text-h1 { font-size: 72px; font-weight: 700; }  /* 頁面最主要嘅大標題 */
.text-h2 { font-size: 60px; font-weight: 700; }  /* 主要區塊標題 */
.text-h3 { font-size: 48px; font-weight: 600; }  /* 次級頁面標題 */
.text-h4 { font-size: 36px; font-weight: 600; }  /* 區塊標題 */
.text-h5 { font-size: 30px; font-weight: 600; }  /* 卡片標題 */
.text-h6 { font-size: 24px; font-weight: 600; }  /* 最小標題 */

/* 內文層級 */
.text-body { font-size: 16px; font-weight: 400; }    /* 標準內文 */
.text-caption { font-size: 12px; font-weight: 400; } /* 小標註/輔助文字 */
```

### **字體使用例子：**

```tsx
{/* ✅ 正確：使用統一字體類 */}
<h1 className="text-h1">AI Formula 平台</h1>
<h2 className="text-h2">課程系統</h2>
<h5 className="text-h5">卡片標題</h5>
<p className="text-body">這是標準內文...</p>
<small className="text-caption">輔助說明文字</small>

{/* ❌ 錯誤：直接使用 Tailwind */}
<h1 className="text-4xl font-bold">不統一嘅標題</h1>
```

---

## 🎯 **第三步：標準化組件尺寸**

### **按鈕尺寸統一**

**所有按鈕都有一致嘅高度同內邊距！**

```css
/* 統一按鈕高度 */
--btn-height-sm: 32px   /* 小按鈕 */
--btn-height-md: 40px   /* 標準按鈕 (主要使用) */
--btn-height-lg: 48px   /* 大按鈕 */
--btn-height-xl: 56px   /* 超大按鈕 (CTA) */

/* 統一按鈕內邊距 */
--btn-padding-x-sm: 12px   /* 小按鈕 */
--btn-padding-x-md: 16px   /* 標準按鈕 */
--btn-padding-x-lg: 24px   /* 大按鈕 */
--btn-padding-x-xl: 32px   /* 超大按鈕 */
```

### **卡片尺寸統一**

**所有卡片都有一致嘅內邊距同圓角！**

```css
/* 統一卡片內邊距 */
--card-padding-sm: 16px   /* 小卡片 */
--card-padding-md: 24px   /* 標準卡片 */
--card-padding-lg: 32px   /* 大卡片 */

/* 統一圓角 */
--radius-md: 8px    /* 按鈕、輸入框 */
--radius-lg: 12px   /* 卡片 */
--radius-xl: 16px   /* 模態框 */
```

---

## 💻 **第四步：CSS 實踐方案**

### **1. 統一按鈕使用例子**

```css
/* ✅ 主要按鈕 - 統一尺寸 */
.btn-primary-unified {
  height: var(--btn-height-md);           /* 40px 統一高度 */
  padding: 0 var(--btn-padding-x-md);     /* 0 16px 統一內邊距 */
  border-radius: var(--radius-md);        /* 8px 統一圓角 */
  font-size: var(--text-base);            /* 16px 統一字體 */
  font-weight: var(--font-medium);        /* 500 統一粗度 */
  
  background: #3b82f6;
  color: white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);                    /* 8px icon和文字間距 */
}

/* ✅ 次要按鈕 - 同樣統一尺寸 */
.btn-secondary-unified {
  height: var(--btn-height-md);           /* 與主要按鈕相同高度 */
  padding: 0 var(--btn-padding-x-md);     /* 相同內邊距 */
  border-radius: var(--radius-md);        /* 相同圓角 */
  font-size: var(--text-base);            /* 相同字體大小 */
  
  background: transparent;
  border: 1px solid #d1d5db;
  color: #6b7280;
}
```

### **2. 統一卡片使用例子**

```css
/* ✅ 標準卡片 - 統一間距 */
.card-standard-unified {
  background: white;
  border-radius: var(--radius-lg);        /* 12px 統一圓角 */
  padding: var(--card-padding-md);        /* 24px 統一內邊距 */
  box-shadow: var(--shadow-sm);           /* 統一陰影 */
}

/* 卡片內部間距也要統一 */
.card-content-spacing {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);                    /* 16px 內部元素間距 */
}
```

### **3. 在你現有組件中應用**

#### **修復你嘅 Button 組件：**

```tsx
// 之前 ❌
<Button className="h-10 px-4 py-2">不統一</Button>

// 之後 ✅  
<Button className="btn-unified btn-unified-md">統一尺寸</Button>

// 或者直接用 CSS 變數
<Button style={{
  height: 'var(--btn-height-md)',
  padding: '0 var(--btn-padding-x-md)',
  borderRadius: 'var(--radius-md)'
}}>
  統一按鈕
</Button>
```

#### **修復你嘅 Card 組件：**

```tsx
// 之前 ❌
<Card className="p-6">不統一間距</Card>

// 之後 ✅
<Card className="card-unified card-unified-md">統一間距</Card>

// 或者用 CSS 變數
<Card style={{
  padding: 'var(--card-padding-md)',
  borderRadius: 'var(--radius-lg)'
}}>
  統一卡片
</Card>
```

---

## 🛠️ **如何開始應用**

### **Step 1: 引入新系統**

在你嘅 `src/styles/design-system.css` 已經引入咗：

```css
@import url('./unified-spacing-system.css');
```

### **Step 2: 逐步替換現有組件**

#### **優先級順序：**

1. **按鈕** - 影響最大，先修復
2. **卡片** - 使用最多，第二優先
3. **輸入框** - 表單體驗
4. **間距** - 最後調整布局間距

#### **替換策略：**

```css
/* 🎯 替換 Tailwind 類 */

/* 之前 ❌ */
.old-button { @apply h-10 px-4 py-2 rounded-md; }

/* 之後 ✅ */
.new-button {
  height: var(--btn-height-md);
  padding: 0 var(--btn-padding-x-md);
  border-radius: var(--radius-md);
}
```

### **Step 3: 驗證效果**

#### **檢查清單：**

- [ ] 所有按鈕高度是否一致？
- [ ] 所有卡片內邊距是否統一？
- [ ] 字體層級是否清晰？
- [ ] 組件間距是否有節奏感？

---

## 📏 **快速參考表**

### **常用間距組合：**

```css
/* 🎯 按鈕 */
height: var(--btn-height-md);     /* 40px */
padding: 0 var(--btn-padding-x-md); /* 0 16px */

/* 🎯 卡片 */
padding: var(--card-padding-md);  /* 24px */
border-radius: var(--radius-lg);  /* 12px */

/* 🎯 組件間距 */
gap: var(--space-4);              /* 16px 內部元素 */
margin-bottom: var(--space-8);    /* 32px 組件間 */

/* 🎯 區塊間距 */
margin-bottom: var(--space-12);   /* 48px 區塊間 */
```

### **常用字體組合：**

```css
/* 🎯 卡片標題 */
font-size: var(--text-3xl);      /* 30px */
font-weight: var(--font-semibold); /* 600 */

/* 🎯 內文 */
font-size: var(--text-base);     /* 16px */
font-weight: var(--font-normal); /* 400 */

/* 🎯 說明文字 */
font-size: var(--text-sm);       /* 14px */
color: #6b7280;                  /* 灰色 */
```

---

## 🎉 **預期效果**

應用呢個統一系統之後，你嘅網站將會：

✅ **視覺一致性** - 所有按鈕、卡片、間距都統一  
✅ **專業感提升** - 有節奏感嘅設計令網站更加專業  
✅ **維護容易** - 統一嘅變數系統易於修改和維護  
✅ **用戶體驗** - 一致嘅交互模式提升用戶體驗  

**你而家擁有咗一份清晰嘅設計尺寸藍圖！按照呢個規範逐一修正所有頁面，就可以徹底解決『尺寸混亂』嘅問題！** 🚀

---

## 💡 **下一步建議**

1. **先修復最重要嘅按鈕組件**
2. **然後統一所有卡片嘅間距**  
3. **最後調整頁面級別嘅布局間距**
4. **測試響應式設計在不同設備上嘅效果**

如果你需要我幫你應用到具體嘅組件，隨時話我知！ 