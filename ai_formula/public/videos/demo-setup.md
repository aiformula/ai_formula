# 🎥 視頻設置完成指南

## ✅ **已完成的功能**

### **1. 彈出式視頻播放器**
- ✅ 全屏模態框播放器
- ✅ 自訂控制面板 (播放/暫停/靜音/全屏)
- ✅ 鍵盤快捷鍵支援
- ✅ 響應式設計
- ✅ 動畫效果

### **2. 工具卡片整合**
- ✅ 懸停顯示播放按鈕
- ✅ VIDEO 標識
- ✅ 圖片 + 視頻混合模式

### **3. 視頻格式支援**
- ✅ MP4 (本地文件)
- ✅ WebM (本地文件)
- ✅ YouTube (嵌入)
- ✅ Vimeo (嵌入)

## 🚀 **如何使用**

### **上傳視頻到你的網站**

1. **準備視頻文件**：
   ```
   - 文件名：databricks-demo.mp4
   - 大小：< 50MB
   - 解析度：1080p 或 720p
   - 格式：MP4 (推薦)
   ```

2. **放到正確位置**：
   ```
   ai_formula/public/videos/databricks-demo.mp4
   ```

3. **配置工具數據**：
   ```typescript
   {
     id: 'databricks-ai',
     videoUrl: '/videos/databricks-demo.mp4',
     videoType: 'mp4',
     useVideo: true,
     showVideoModal: true, // 關鍵：啟用彈出播放器
   }
   ```

### **不同視頻來源配置**

#### **🎬 YouTube 視頻**
```typescript
{
  videoUrl: 'https://www.youtube.com/watch?v=VIDEO_ID',
  videoType: 'youtube',
  showVideoModal: true,
}
```

#### **📹 本地 MP4 文件**
```typescript
{
  videoUrl: '/videos/your-video.mp4',
  videoType: 'mp4',
  showVideoModal: true,
}
```

#### **☁️ 雲端存儲 (CDN)**
```typescript
{
  videoUrl: 'https://your-cdn.com/videos/demo.mp4',
  videoType: 'mp4',
  showVideoModal: true,
}
```

### **快捷鍵操作**
- **ESC**：關閉視頻
- **空格**：播放/暫停
- **M**：靜音切換
- **F**：全屏切換

## 📊 **效果預覽**

當用戶懸停在 Databricks 卡片上時：
1. 顯示黃色播放按鈕
2. 右上角顯示 "VIDEO" 標識
3. 點擊播放按鈕打開彈出式播放器
4. 全屏播放視頻，支援所有控制功能

## ⚡ **性能優化建議**

1. **視頻壓縮**：
   ```bash
   # 使用 FFmpeg 壓縮
   ffmpeg -i input.mov -c:v libx264 -crf 23 -preset medium output.mp4
   ```

2. **懶加載**：視頻只在點擊時才載入

3. **後備方案**：視頻載入失敗時顯示圖片

4. **CDN 加速**：大文件建議使用 CDN

現在你可以為任何工具添加彈出式視頻了！ 