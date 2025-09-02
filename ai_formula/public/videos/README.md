# 視頻文件管理說明

## 📹 **視頻文件存放指南**

### **支援的視頻格式**
- **MP4**（推薦）：最佳兼容性，支援所有瀏覽器
- **WebM**：Google 支援的格式，檔案較小
- **MOV**：蘋果格式，需要轉換為 MP4

### **視頻規格建議**
- **解析度**：1920x1080 (1080p) 或 1280x720 (720p)
- **長度**：建議 30 秒 - 3 分鐘
- **檔案大小**：< 50MB（為了快速載入）
- **編碼**：H.264

### **文件命名規範**
```
工具名稱-描述.mp4
例如：
databricks-ai-demo.mp4
chatgpt-tutorial.mp4
midjourney-showcase.webm
```

### **如何添加視頻**

#### **方法 1：直接上傳文件**
1. 將視頻文件放到這個 `videos/` 文件夾
2. 在 `tools-data.ts` 中設定：
```typescript
{
  id: 'databricks-ai',
  videoUrl: '/videos/databricks-ai-demo.mp4',
  videoType: 'mp4',
  useVideo: true,
  showVideoModal: true, // 啟用彈出播放器
}
```

#### **方法 2：使用 CDN 或雲端存儲**
```typescript
{
  videoUrl: 'https://your-cdn.com/videos/demo.mp4',
  videoType: 'mp4',
  useVideo: true,
  showVideoModal: true,
}
```

### **視頻壓縮工具推薦**
- **線上工具**：CloudConvert, Online-Convert
- **軟體工具**：HandBrake, FFmpeg
- **命令行**：
```bash
# 使用 FFmpeg 壓縮視頻
ffmpeg -i input.mov -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k output.mp4
```

### **測試視頻**
目前包含一個測試視頻用於開發：
- `test-video.mp4` - 用於測試彈出式播放器功能

### **注意事項**
⚠️ **檔案大小**：避免上傳過大的視頻文件  
⚠️ **格式兼容**：建議使用 MP4 格式以確保最佳兼容性  
⚠️ **版權問題**：確保你有權使用和分發這些視頻  
⚠️ **載入速度**：大文件會影響網站載入速度 