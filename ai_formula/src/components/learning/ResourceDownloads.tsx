import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { 
  Download, 
  FileText, 
  Code, 
  Database, 
  Image, 
  File, 
  ExternalLink,
  Search,
  Filter,
  FolderOpen,
  Clock,
  CheckCircle,
  Star,
  Eye,
  Copy,
  Share2,
  BookOpen,
  Archive,
  Zap,
  Play
} from 'lucide-react';

interface Resource {
  id: string;
  name: string;
  type: 'pdf' | 'code' | 'dataset' | 'template' | 'video' | 'image' | 'document';
  url: string;
  size: string;
  description: string;
  downloadCount: number;
  lastUpdated: Date;
  category: string;
  tags: string[];
  isNew: boolean;
  isPopular: boolean;
  previewUrl?: string;
}

interface ResourceDownloadsProps {
  resources: Resource[];
}

export const ResourceDownloads: React.FC<ResourceDownloadsProps> = ({ resources }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'pdf' | 'code' | 'dataset' | 'template' | 'video' | 'image' | 'document'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'size' | 'downloads' | 'updated'>('name');
  const [downloadedItems, setDownloadedItems] = useState<Set<string>>(new Set());

  // 模擬資源數據
  const mockResources: Resource[] = [
    {
      id: '1',
      name: 'Prompt Engineering 完整指南',
      type: 'pdf',
      url: '/downloads/prompt-engineering-guide.pdf',
      size: '2.3 MB',
      description: '完整的 Prompt Engineering 指南，包含所有重要概念和實用技巧。',
      downloadCount: 1245,
      lastUpdated: new Date('2024-01-15'),
      category: '教學資料',
      tags: ['prompt-engineering', '指南', 'AI'],
      isNew: false,
      isPopular: true,
      previewUrl: '/preview/prompt-engineering-guide.pdf'
    },
    {
      id: '2',
      name: 'ChatGPT API 範例代碼',
      type: 'code',
      url: '/downloads/chatgpt-api-examples.zip',
      size: '156 KB',
      description: '完整的 ChatGPT API 使用範例，包含 Python 和 JavaScript 版本。',
      downloadCount: 892,
      lastUpdated: new Date('2024-01-18'),
      category: '代碼範例',
      tags: ['ChatGPT', 'API', 'Python', 'JavaScript'],
      isNew: true,
      isPopular: false
    },
    {
      id: '3',
      name: 'AI 應用案例資料集',
      type: 'dataset',
      url: '/downloads/ai-use-cases-dataset.csv',
      size: '5.7 MB',
      description: '包含 1000+ 個 AI 應用案例的資料集，適合分析和研究。',
      downloadCount: 567,
      lastUpdated: new Date('2024-01-10'),
      category: '資料集',
      tags: ['dataset', 'AI', '案例研究'],
      isNew: false,
      isPopular: false
    },
    {
      id: '4',
      name: 'Prompt 模板集合',
      type: 'template',
      url: '/downloads/prompt-templates.json',
      size: '89 KB',
      description: '精選的 Prompt 模板集合，涵蓋各種應用場景。',
      downloadCount: 1834,
      lastUpdated: new Date('2024-01-20'),
      category: '模板',
      tags: ['templates', 'prompt', '模板'],
      isNew: true,
      isPopular: true
    },
    {
      id: '5',
      name: '課程重點總結',
      type: 'document',
      url: '/downloads/course-summary.docx',
      size: '445 KB',
      description: '課程重點總結文檔，包含所有重要概念和關鍵要點。',
      downloadCount: 723,
      lastUpdated: new Date('2024-01-16'),
      category: '總結',
      tags: ['summary', '重點', '總結'],
      isNew: false,
      isPopular: false
    },
    {
      id: '6',
      name: '實戰演示視頻',
      type: 'video',
      url: '/downloads/demo-video.mp4',
      size: '127 MB',
      description: '完整的實戰演示視頻，展示 Prompt Engineering 的實際應用。',
      downloadCount: 456,
      lastUpdated: new Date('2024-01-12'),
      category: '視頻',
      tags: ['video', 'demo', '演示'],
      isNew: false,
      isPopular: false
    }
  ];

  const allResources = resources.length > 0 ? resources : mockResources;

  // 過濾和排序資源
  const filteredResources = allResources
    .filter(resource => {
      const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesFilter = filterType === 'all' || resource.type === filterType;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'size':
          return parseInt(a.size) - parseInt(b.size);
        case 'downloads':
          return b.downloadCount - a.downloadCount;
        case 'updated':
          return b.lastUpdated.getTime() - a.lastUpdated.getTime();
        default:
          return 0;
      }
    });

  // 獲取類型圖標
  const getTypeIcon = (type: Resource['type']) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-5 h-5 text-red-400" />;
      case 'code':
        return <Code className="w-5 h-5 text-green-400" />;
      case 'dataset':
        return <Database className="w-5 h-5 text-blue-400" />;
      case 'template':
        return <BookOpen className="w-5 h-5 text-purple-400" />;
      case 'video':
        return <Play className="w-5 h-5 text-pink-400" />;
      case 'image':
        return <Image className="w-5 h-5 text-yellow-400" />;
      case 'document':
        return <File className="w-5 h-5 text-gray-400" />;
      default:
        return <File className="w-5 h-5 text-gray-400" />;
    }
  };

  // 獲取類型標籤
  const getTypeLabel = (type: Resource['type']) => {
    switch (type) {
      case 'pdf':
        return 'PDF';
      case 'code':
        return '代碼';
      case 'dataset':
        return '資料集';
      case 'template':
        return '模板';
      case 'video':
        return '視頻';
      case 'image':
        return '圖片';
      case 'document':
        return '文檔';
      default:
        return '文件';
    }
  };

  // 處理下載
  const handleDownload = (resource: Resource) => {
    // 模擬下載
    const link = document.createElement('a');
    link.href = resource.url;
    link.download = resource.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // 標記為已下載
    setDownloadedItems(prev => new Set([...prev, resource.id]));
  };

  // 複製連結
  const handleCopyLink = (resource: Resource) => {
    const fullUrl = window.location.origin + resource.url;
    navigator.clipboard.writeText(fullUrl);
  };

  // 預覽文件
  const handlePreview = (resource: Resource) => {
    if (resource.previewUrl) {
      window.open(resource.previewUrl, '_blank');
    }
  };

  // 格式化時間
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('zh-HK', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // 格式化下載次數
  const formatDownloadCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  if (allResources.length === 0) {
    return (
      <div className="p-4 h-full flex items-center justify-center">
        <div className="text-center">
          <FolderOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-300 mb-2">還沒有資源</h3>
          <p className="text-sm text-gray-500">
            隨著課程進行，這裡會出現相關的下載資源，
            包括課程資料、代碼範例和參考文檔。
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* 搜索和過濾控制 */}
      <div className="p-4 border-b border-gray-700 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="搜索資源..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-700 border-gray-600 text-white"
          />
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="bg-gray-700 border-gray-600 text-white rounded-md px-3 py-2 text-sm"
            >
              <option value="all">全部類型</option>
              <option value="pdf">PDF</option>
              <option value="code">代碼</option>
              <option value="dataset">資料集</option>
              <option value="template">模板</option>
              <option value="video">視頻</option>
              <option value="document">文檔</option>
            </select>
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-gray-700 border-gray-600 text-white rounded-md px-3 py-2 text-sm"
          >
            <option value="name">按名稱</option>
            <option value="size">按大小</option>
            <option value="downloads">按下載數</option>
            <option value="updated">按更新時間</option>
          </select>
        </div>
      </div>

      {/* 資源列表 */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-4">
            {filteredResources.length === 0 ? (
              <div className="text-center py-8">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">沒有找到相關資源</p>
              </div>
            ) : (
              filteredResources.map((resource) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group"
                >
                  <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        {/* 文件類型圖標 */}
                        <div className="flex-shrink-0 p-3 bg-gray-700 rounded-lg">
                          {getTypeIcon(resource.type)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          {/* 文件名和標籤 */}
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-semibold text-white text-lg truncate">
                                {resource.name}
                              </h4>
                              <Badge variant="outline" className="text-xs text-gray-400 border-gray-600">
                                {getTypeLabel(resource.type)}
                              </Badge>
                              {resource.isNew && (
                                <Badge className="text-xs bg-green-600 text-white">新</Badge>
                              )}
                              {resource.isPopular && (
                                <Badge className="text-xs bg-orange-600 text-white">熱門</Badge>
                              )}
                            </div>
                            
                            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              {resource.previewUrl && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handlePreview(resource)}
                                  className="text-gray-400 hover:text-white p-1 h-auto"
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleCopyLink(resource)}
                                className="text-gray-400 hover:text-white p-1 h-auto"
                              >
                                <Copy className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-gray-400 hover:text-white p-1 h-auto"
                              >
                                <Share2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          
                          {/* 描述 */}
                          <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                            {resource.description}
                          </p>
                          
                          {/* 標籤 */}
                          <div className="flex flex-wrap gap-2 mb-3">
                            {resource.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs text-blue-400 border-blue-400">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          
                          {/* 底部信息和下載按鈕 */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                              <span className="flex items-center space-x-1">
                                <Archive className="w-3 h-3" />
                                <span>{resource.size}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Download className="w-3 h-3" />
                                <span>{formatDownloadCount(resource.downloadCount)}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{formatDate(resource.lastUpdated)}</span>
                              </span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              {downloadedItems.has(resource.id) && (
                                <div className="flex items-center space-x-1 text-green-400">
                                  <CheckCircle className="w-4 h-4" />
                                  <span className="text-sm">已下載</span>
                                </div>
                              )}
                              <Button
                                onClick={() => handleDownload(resource)}
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                                size="sm"
                              >
                                <Download className="w-4 h-4 mr-2" />
                                下載
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>

      {/* 底部統計 */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>
            共 {filteredResources.length} 個資源
            {searchTerm && ` • 搜索: "${searchTerm}"`}
            {filterType !== 'all' && ` • 類型: ${getTypeLabel(filterType)}`}
          </span>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <FileText className="w-3 h-3 text-red-400" />
              <span>{allResources.filter(r => r.type === 'pdf').length}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Code className="w-3 h-3 text-green-400" />
              <span>{allResources.filter(r => r.type === 'code').length}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Database className="w-3 h-3 text-blue-400" />
              <span>{allResources.filter(r => r.type === 'dataset').length}</span>
            </div>
            <div className="flex items-center space-x-1">
              <BookOpen className="w-3 h-3 text-purple-400" />
              <span>{allResources.filter(r => r.type === 'template').length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceDownloads; 