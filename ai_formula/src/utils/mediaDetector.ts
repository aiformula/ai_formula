interface MediaItem {
  type: 'image' | 'video';
  url: string;
  alt?: string;
  caption?: string;
  title?: string;
  thumbnail?: string;
  videoType?: 'mp4' | 'webm' | 'youtube' | 'vimeo';
}

interface Tool {
  id: string;
  images?: { url: string; alt: string; caption?: string }[];
  videos?: { url: string; type: 'mp4' | 'webm' | 'youtube' | 'vimeo'; title?: string; thumbnail?: string }[];
  imageUrl?: string;
  imageAlt?: string;
  videoUrl?: string;
  videoType?: 'mp4' | 'webm' | 'youtube' | 'vimeo';
  autoDetectMedia?: boolean;
}

/**
 * 自動檢測工具的媒體文件
 * 根據工具ID搜尋對應的圖片和視頻文件
 */
export const detectToolMedia = async (toolId: string): Promise<MediaItem[]> => {
  const mediaItems: MediaItem[] = [];
  
  // 定義可能的文件擴展名
  const imageExtensions = ['png', 'jpg', 'jpeg', 'svg', 'webp'];
  const videoExtensions = ['mp4', 'webm', 'mov'];
  
  // 檢測圖片文件
  for (const ext of imageExtensions) {
    const possiblePaths = [
      `/aitools/${toolId}.${ext}`,
      `/aitools/${toolId}-logo.${ext}`,
      `/aitools/${toolId}-icon.${ext}`,
      `/aitools/${toolId}-1.${ext}`,
      `/aitools/${toolId}-2.${ext}`,
      `/aitools/${toolId}-3.${ext}`,
      `/aitools/${toolId}-screenshot.${ext}`,
      `/aitools/${toolId}-preview.${ext}`,
    ];
    
    for (const path of possiblePaths) {
      if (await checkFileExists(path)) {
        mediaItems.push({
          type: 'image',
          url: path,
          alt: `${toolId} image`,
          caption: getImageCaption(path)
        });
      }
    }
  }
  
  // 檢測視頻文件
  for (const ext of videoExtensions) {
    const possiblePaths = [
      `/videos/${toolId}.${ext}`,
      `/videos/${toolId}-demo.${ext}`,
      `/videos/${toolId}-tutorial.${ext}`,
      `/videos/${toolId}-preview.${ext}`,
      `/videos/${toolId}-showcase.${ext}`,
    ];
    
    for (const path of possiblePaths) {
      if (await checkFileExists(path)) {
        mediaItems.push({
          type: 'video',
          url: path,
          videoType: ext as 'mp4' | 'webm',
          title: getVideoTitle(path),
          thumbnail: await findVideoThumbnail(toolId, path)
        });
      }
    }
  }
  
  return mediaItems;
};

/**
 * 檢查文件是否存在（瀏覽器環境友好版本）
 */
const checkFileExists = async (path: string): Promise<boolean> => {
  try {
    // 在開發環境中，我們簡化檢查邏輯
    // 實際部署時，應該使用服務器端 API 來檢查文件存在性
    
    // 暫時跳過網絡檢查，避免瀏覽器中的 CORS 問題
    // 可以在這裡添加一個已知文件列表
    const knownFiles = [
      '/aitools/hailuo.jpeg',
      '/aitools/hailuo.png',
      '/aitools/databricks-ai.png',
      '/aitools/databricks-ai-logo.png',
      '/videos/databricks-demo.mp4',
      '/videos/hailuo-demo.mp4'
    ];
    
    return knownFiles.includes(path);
  } catch {
    return false;
  }
};

/**
 * 根據文件路徑生成圖片說明
 */
const getImageCaption = (path: string): string => {
  const filename = path.split('/').pop() || '';
  
  if (filename.includes('logo')) return 'Official Logo';
  if (filename.includes('icon')) return 'App Icon';
  if (filename.includes('screenshot')) return 'Screenshot';
  if (filename.includes('preview')) return 'Preview';
  if (filename.includes('-1')) return 'Image 1';
  if (filename.includes('-2')) return 'Image 2';
  if (filename.includes('-3')) return 'Image 3';
  
  return 'Tool Image';
};

/**
 * 根據文件路徑生成視頻標題
 */
const getVideoTitle = (path: string): string => {
  const filename = path.split('/').pop() || '';
  
  if (filename.includes('demo')) return 'Demo Video';
  if (filename.includes('tutorial')) return 'Tutorial';
  if (filename.includes('preview')) return 'Preview';
  if (filename.includes('showcase')) return 'Showcase';
  
  return 'Tool Video';
};

/**
 * 尋找視頻縮圖
 */
const findVideoThumbnail = async (toolId: string, videoPath: string): Promise<string | undefined> => {
  const thumbnailExtensions = ['png', 'jpg', 'jpeg'];
  const videoName = videoPath.split('/').pop()?.split('.')[0] || toolId;
  
  for (const ext of thumbnailExtensions) {
    const thumbnailPath = `/images/thumbnails/${videoName}.${ext}`;
    if (await checkFileExists(thumbnailPath)) {
      return thumbnailPath;
    }
  }
  
  // 如果沒有專用縮圖，使用工具的主要圖片作為縮圖
  const fallbackPaths = [
    `/aitools/${toolId}.png`,
    `/aitools/${toolId}.jpg`,
    `/aitools/${toolId}-logo.png`,
  ];
  
  for (const path of fallbackPaths) {
    if (await checkFileExists(path)) {
      return path;
    }
  }
  
  return undefined;
};

/**
 * 組合工具的所有媒體項目
 */
export const combineToolMedia = async (tool: Tool): Promise<MediaItem[]> => {
  const mediaItems: MediaItem[] = [];
  
  // 如果啟用自動檢測
  if (tool.autoDetectMedia) {
    const detectedMedia = await detectToolMedia(tool.id);
    mediaItems.push(...detectedMedia);
  }
  
  // 添加手動配置的圖片
  if (tool.images) {
    tool.images.forEach(img => {
      mediaItems.push({
        type: 'image',
        url: img.url,
        alt: img.alt,
        caption: img.caption
      });
    });
  }
  
  // 添加手動配置的視頻
  if (tool.videos) {
    tool.videos.forEach(video => {
      mediaItems.push({
        type: 'video',
        url: video.url,
        videoType: video.type,
        title: video.title,
        thumbnail: video.thumbnail
      });
    });
  }
  
  // 添加向後兼容的單一圖片
  if (tool.imageUrl && !mediaItems.some(item => item.url === tool.imageUrl)) {
    mediaItems.unshift({
      type: 'image',
      url: tool.imageUrl,
      alt: tool.imageAlt || 'Tool image',
      caption: 'Main Image'
    });
  }
  
  // 添加向後兼容的單一視頻
  if (tool.videoUrl && !mediaItems.some(item => item.url === tool.videoUrl)) {
    mediaItems.push({
      type: 'video',
      url: tool.videoUrl,
      videoType: tool.videoType,
      title: 'Main Video'
    });
  }
  
  return mediaItems;
};

/**
 * 獲取媒體顯示模式
 */
export const getMediaDisplayMode = (mediaItems: MediaItem[]): 'single' | 'carousel' | 'grid' => {
  if (mediaItems.length <= 1) return 'single';
  if (mediaItems.length <= 3) return 'carousel';
  return 'grid';
};

/**
 * 媒體統計信息
 */
export const getMediaStats = (mediaItems: MediaItem[]) => {
  const imageCount = mediaItems.filter(item => item.type === 'image').length;
  const videoCount = mediaItems.filter(item => item.type === 'video').length;
  
  return {
    total: mediaItems.length,
    images: imageCount,
    videos: videoCount,
    hasMultiple: mediaItems.length > 1,
    hasMixed: imageCount > 0 && videoCount > 0
  };
}; 