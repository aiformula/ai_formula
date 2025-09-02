# Content Security Policy (CSP) 安全指南

## 🔒 問題解決

這個文檔說明了如何解決 "Content Security Policy of your site blocks the use of 'eval' in JavaScript" 錯誤。

## 🎯 已實施的解決方案

### 1. **CSP 策略配置**

我們在 `index.html` 中添加了嚴格的 CSP 策略：

```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://www.googletagmanager.com https://www.google-analytics.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com;
  font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com;
  img-src 'self' data: https: blob:;
  connect-src 'self' https://api.supabase.io https://*.supabase.co https://fonts.googleapis.com https://www.google-analytics.com;
  object-src 'none';
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
">
```

### 2. **Vite 配置優化**

在 `vite.config.ts` 中：

- **開發服務器 CSP 標頭**：確保開發環境也遵循 CSP 策略
- **Framer Motion 預構建**：通過 `optimizeDeps.include` 預構建 framer-motion
- **Terser 壓縮**：使用安全的代碼壓縮，避免 eval 使用
- **分塊策略**：將 framer-motion 單獨分塊處理

### 3. **Framer Motion 安全配置**

創建了 `src/config/motionConfig.ts`：

- **安全動畫變量**：預定義常用動畫效果
- **禁用實驗性功能**：避免可能使用 eval 的功能
- **靜態變換**：使用預定義的變換而非動態生成

## 🚀 使用指南

### 在組件中使用安全動畫

```typescript
import { safeAnimations } from '@/config/motionConfig';
import { motion } from 'framer-motion';

// 使用預定義的安全動畫
<motion.div {...safeAnimations.fadeIn}>
  內容
</motion.div>

// 或者使用組合動畫
<motion.div 
  {...safeAnimations.slideUp}
  {...safeAnimations.hover}
>
  互動內容
</motion.div>
```

### 避免的做法

❌ **不要使用**：
```typescript
// 避免動態生成動畫字串
const dynamicAnimation = eval(`{ opacity: ${value} }`);

// 避免在 transformTemplate 中使用複雜邏輯
transformTemplate: ({ x, y }) => `translate(${eval(x)}px, ${eval(y)}px)`
```

✅ **推薦使用**：
```typescript
// 使用預定義的動畫變量
const animation = safeAnimations.fadeIn;

// 使用靜態變換
transformTemplate: ({ x, y }) => `translate(${x}px, ${y}px)`
```

## 🔧 故障排除

### 如果仍然看到 CSP 錯誤

1. **清除瀏覽器緩存**：
   ```bash
   # Chrome DevTools > Application > Storage > Clear site data
   ```

2. **檢查構建輸出**：
   ```bash
   npm run build
   # 檢查 dist/index.html 是否包含 CSP 標頭
   ```

3. **驗證開發服務器**：
   ```bash
   npm run dev
   # 在 Network 標籤檢查 Response Headers 中的 CSP
   ```

### 添加新的第三方服務

如果需要添加新的外部服務，更新 CSP 策略：

```html
<!-- 例如添加 Google Analytics -->
script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com;
connect-src 'self' https://www.google-analytics.com;
```

## 📊 性能優化

### Framer Motion 優化

1. **預構建**：framer-motion 已在 `vite.config.ts` 中預構建
2. **分塊加載**：framer-motion 被分離到獨立的 chunk
3. **Tree Shaking**：只導入使用的動畫功能

### 監控 CSP 違規

在生產環境中監控 CSP 違規：

```javascript
// 可選：添加 CSP 違規報告
document.addEventListener('securitypolicyviolation', (e) => {
  console.warn('CSP Violation:', e.violatedDirective, e.blockedURI);
  // 發送到監控服務
});
```

## 🛡️ 安全最佳實踐

1. **定期審查 CSP**：檢查是否有不必要的 'unsafe-*' 指令
2. **最小化權限**：只允許必要的來源
3. **監控報告**：設置 CSP 違規報告端點
4. **測試**：在所有支持的瀏覽器中測試 CSP 策略

## 📝 相關文件

- `index.html` - CSP meta 標籤
- `vite.config.ts` - 構建和開發服務器配置
- `src/config/motionConfig.ts` - Framer Motion 安全配置
- `package.json` - 包含 terser 依賴

## 🔄 版本歷史

- **v1.0** - 初始 CSP 實施
- **v1.1** - 添加 Framer Motion 安全配置
- **v1.2** - 優化構建配置和預構建設置 