# AI Formula 顏色系統使用指南

## 🎨 顏色變量系統

### 主要顏色變量
```css
--ai-formula-primary: #FFD600       /* 主要黃色 */
--ai-formula-primary-hover: #EAB308  /* 黃色懸停 */
--ai-formula-secondary: #FFA500      /* 次要橙色 */
--ai-formula-accent: #FF6B6B         /* 強調紅色 */
--ai-formula-success: #4ECDC4        /* 成功青色 */
--ai-formula-info: #5DADE2           /* 信息藍色 */
--ai-formula-warning: #F7DC6F        /* 警告黃色 */
--ai-formula-error: #E74C3C          /* 錯誤紅色 */
```

### 深色主題變量
```css
--ai-formula-dark: #0f0f0f           /* 主要深色背景 */
--ai-formula-dark-light: #1a1a1a     /* 淺深色背景 */
--ai-formula-dark-medium: #2a2a2a    /* 中等深色背景 */
--ai-formula-gray-600: #6b7280       /* 灰色邊框 */
--ai-formula-gray-300: #d1d5db       /* 淺灰色文字 */
```

## 🚀 CSS 工具類

### 背景類
```css
.ai-bg-primary          /* 主要背景 */
.ai-bg-secondary        /* 次要背景 */
.ai-bg-accent           /* 強調背景 */
.ai-bg-dark             /* 深色背景 */
.ai-bg-dark-light       /* 淺深色背景 */
.ai-bg-dark-medium      /* 中等深色背景 */
.ai-bg-gradient-dark    /* 深色漸變背景 */
```

### 文字類
```css
.ai-text-primary        /* 主要文字顏色 */
.ai-text-secondary      /* 次要文字顏色 */
.ai-text-accent         /* 強調文字顏色 */
.ai-text-success        /* 成功文字顏色 */
.ai-text-info           /* 信息文字顏色 */
.ai-text-warning        /* 警告文字顏色 */
.ai-text-error          /* 錯誤文字顏色 */
```

### 邊框類
```css
.ai-border-primary      /* 主要邊框 */
.ai-border-secondary    /* 次要邊框 */
.ai-border-accent       /* 強調邊框 */
.ai-border-gray         /* 灰色邊框 */
```

## 📋 使用規範

### ✅ 正確使用
```jsx
// 使用 CSS 變量
<div className="ai-bg-primary ai-text-dark">
  <h1 className="ai-text-accent">標題</h1>
</div>

// 使用內聯樣式時引用變量
<div style={{ backgroundColor: 'var(--ai-formula-primary)' }}>
  內容
</div>
```

### ❌ 避免使用
```jsx
// 避免硬編碼顏色
<div className="bg-[#FFD600] text-[#0f0f0f]">
  <h1 style={{ color: '#FF6B6B' }}>標題</h1>
</div>

// 避免直接使用 hex 顏色
<div style={{ backgroundColor: '#FFD600' }}>
  內容
</div>
```

## 🔍 代碼審查檢查清單

### 顏色使用檢查
- [ ] 沒有使用硬編碼的 hex 顏色（如 #FFD600）
- [ ] 沒有使用 Tailwind 的自定義顏色類（如 bg-[#FFD600]）
- [ ] 所有顏色都使用了 AI Formula 變量或工具類
- [ ] 新增的組件遵循顏色系統規範
- [ ] 內聯樣式優先使用 CSS 變量

### 組件結構檢查
- [ ] 複雜的內聯樣式已提取為 CSS 類
- [ ] 重複的樣式已創建為可重用的組件
- [ ] 組件遵循 AI Formula 設計規範
- [ ] 響應式設計使用了統一的斷點

## 🛠️ 開發工具配置

### ESLint 規則
```javascript
// .eslintrc.js
module.exports = {
  rules: {
    'ai-formula/no-hardcoded-colors': 'error',
    'ai-formula/use-color-variables': 'error',
    'ai-formula/no-inline-styles': 'warn'
  }
};
```

### VS Code 擴展建議
- **Tailwind CSS IntelliSense**: 自動完成工具類
- **CSS Variables**: 高亮顯示 CSS 變量
- **Color Highlight**: 顯示顏色預覽

## 🎯 主題切換支持

### 實現步驟
1. 確保所有顏色使用 CSS 變量
2. 為亮色主題創建變量集合
3. 使用 Context API 管理主題狀態
4. 在根元素上切換主題類名

### 主題切換示例
```jsx
// ThemeContext.tsx
const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {}
});

// 在組件中使用
const { theme, toggleTheme } = useContext(ThemeContext);
return (
  <div className={`ai-theme-${theme}`}>
    <button onClick={toggleTheme}>切換主題</button>
  </div>
);
```

## 📊 性能優化

### CSS 變量優勢
- **維護性**: 一處修改，全局生效
- **一致性**: 統一的顏色使用標準
- **可擴展性**: 輕鬆添加新主題
- **性能**: 避免重複的顏色計算

### 最佳實踐
1. 優先使用工具類而非內聯樣式
2. 為複雜樣式創建專用 CSS 類
3. 使用 CSS 變量實現動態主題
4. 定期審查和清理未使用的樣式

## 🔧 故障排除

### 常見問題
1. **顏色不生效**: 檢查 CSS 變量是否正確定義
2. **主題切換異常**: 確認主題類名正確應用
3. **樣式衝突**: 檢查 CSS 優先級和 !important 使用
4. **響應式問題**: 確認使用了統一的斷點變量

### 調試技巧
- 使用瀏覽器開發者工具檢查 CSS 變量值
- 確認 CSS 類名正確應用
- 檢查 CSS 加載順序和優先級
- 驗證主題切換邏輯是否正確

## 📈 未來擴展

### 計劃功能
- [ ] 自動化顏色對比度檢查
- [ ] 主題生成器工具
- [ ] 顏色使用情況分析
- [ ] 無障礙性合規檢查

### 持續改進
- 收集用戶反饋優化顏色系統
- 定期更新和維護顏色變量
- 擴展主題支持（如節日主題）
- 提升開發工具和自動化水平

---

**最後更新**: 2024年1月
**版本**: 1.0.0
**維護者**: AI Formula 開發團隊 