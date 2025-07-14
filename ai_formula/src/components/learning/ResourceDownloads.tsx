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

  // Ê®°Êì¨Ë≥áÊ??∏Ê?
  const mockResources: Resource[] = [
    {
      id: '1',
      name: 'Prompt Engineering ÂÆåÊï¥?áÂ?',
      type: 'pdf',
      url: '/downloads/prompt-engineering-guide.pdf',
      size: '2.3 MB',
      description: 'ÂÆåÊï¥??Prompt Engineering ?áÂ?ÔºåÂ??´Ê??âÈ?Ë¶ÅÊ?ÂøµÂ?ÂØ¶Áî®?ÄÂ∑ß„Ä?,
      downloadCount: 1245,
      lastUpdated: new Date('2024-01-15'),
      category: '?ôÂ≠∏Ë≥áÊ?',
      tags: ['prompt-engineering', '?áÂ?', 'AI'],
      isNew: false,
      isPopular: true,
      previewUrl: '/preview/prompt-engineering-guide.pdf'
    },
    {
      id: '2',
      name: 'ChatGPT API ÁØÑ‰?‰ª?¢º',
      type: 'code',
      url: '/downloads/chatgpt-api-examples.zip',
      size: '156 KB',
      description: 'ÂÆåÊï¥??ChatGPT API ‰ΩøÁî®ÁØÑ‰?ÔºåÂ???Python ??JavaScript ?àÊú¨??,
      downloadCount: 892,
      lastUpdated: new Date('2024-01-18'),
      category: '‰ª?¢ºÁØÑ‰?',
      tags: ['ChatGPT', 'API', 'Python', 'JavaScript'],
      isNew: true,
      isPopular: false
    },
    {
      id: '3',
      name: 'AI ?âÁî®Ê°à‰?Ë≥áÊ???,
      type: 'dataset',
      url: '/downloads/ai-use-cases-dataset.csv',
      size: '5.7 MB',
      description: '?ÖÂê´ 1000+ ??AI ?âÁî®Ê°à‰??ÑË??ôÈ?ÔºåÈÅ©?àÂ??êÂ??îÁ©∂??,
      downloadCount: 567,
      lastUpdated: new Date('2024-01-10'),
      category: 'Ë≥áÊ???,
      tags: ['dataset', 'AI', 'Ê°à‰??îÁ©∂'],
      isNew: false,
      isPopular: false
    },
    {
      id: '4',
      name: 'Prompt Ê®°Êùø?ÜÂ?',
      type: 'template',
      url: '/downloads/prompt-templates.json',
      size: '89 KB',
      description: 'Á≤æÈÅ∏??Prompt Ê®°Êùø?ÜÂ?ÔºåÊ∂µ?ãÂ?Á®ÆÊ??®Â†¥?Ø„Ä?,
      downloadCount: 1834,
      lastUpdated: new Date('2024-01-20'),
      category: 'Ê®°Êùø',
      tags: ['templates', 'prompt', 'Ê®°Êùø'],
      isNew: true,
      isPopular: true
    },
    {
      id: '5',
      name: 'Ë™≤Á??çÈ?Á∏ΩÁ?',
      type: 'document',
      url: '/downloads/course-summary.docx',
      size: '445 KB',
      description: 'Ë™≤Á??çÈ?Á∏ΩÁ??áÊ?ÔºåÂ??´Ê??âÈ?Ë¶ÅÊ?ÂøµÂ??úÈçµË¶ÅÈ???,
      downloadCount: 723,
      lastUpdated: new Date('2024-01-16'),
      category: 'Á∏ΩÁ?',
      tags: ['summary', '?çÈ?', 'Á∏ΩÁ?'],
      isNew: false,
      isPopular: false
    },
    {
      id: '6',
      name: 'ÂØ¶Êà∞ÊºîÁ§∫Ë¶ñÈ†ª',
      type: 'video',
      url: '/downloads/demo-video.mp4',
      size: '127 MB',
      description: 'ÂÆåÊï¥?ÑÂØ¶?∞Ê?Á§∫Ë??ªÔ?Â±ïÁ§∫ Prompt Engineering ?ÑÂØ¶?õÊ??®„Ä?,
      downloadCount: 456,
      lastUpdated: new Date('2024-01-12'),
      category: 'Ë¶ñÈ†ª',
      tags: ['video', 'demo', 'ÊºîÁ§∫'],
      isNew: false,
      isPopular: false
    }
  ];

  const allResources = resources.length > 0 ? resources : mockResources;

  // ?éÊøæ?åÊ?Â∫èË?Ê∫?
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

  // ?≤Â?È°ûÂ??ñÊ?
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

  // ?≤Â?È°ûÂ?Ê®ôÁ±§
  const getTypeLabel = (type: Resource['type']) => {
    switch (type) {
      case 'pdf':
        return 'PDF';
      case 'code':
        return '‰ª?¢º';
      case 'dataset':
        return 'Ë≥áÊ???;
      case 'template':
        return 'Ê®°Êùø';
      case 'video':
        return 'Ë¶ñÈ†ª';
      case 'image':
        return '?ñÁ?';
      case 'document':
        return '?áÊ?';
      default:
        return '?á‰ª∂';
    }
  };

  // ?ïÁ?‰∏ãË?
  const handleDownload = (resource: Resource) => {
    // Ê®°Êì¨‰∏ãË?
    const link = document.createElement('a');
    link.href = resource.url;
    link.download = resource.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Ê®ôË??∫Â∑≤‰∏ãË?
    setDownloadedItems(prev => new Set([...prev, resource.id]));
  };

  // Ë§áË£Ω???
  const handleCopyLink = (resource: Resource) => {
    const fullUrl = window.location.origin + resource.url;
    navigator.clipboard.writeText(fullUrl);
  };

  // ?êË¶Ω?á‰ª∂
  const handlePreview = (resource: Resource) => {
    if (resource.previewUrl) {
      window.open(resource.previewUrl, '_blank');
    }
  };

  // ?ºÂ??ñÊ???
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('zh-HK', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // ?ºÂ??ñ‰?ËºâÊ¨°??
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
          <h3 className="text-lg font-semibold text-gray-300 mb-2">?ÑÊ??âË?Ê∫?/h3>
          <p className="text-sm text-gray-500">
            ?®Ë?Ë™≤Á??≤Ë?ÔºåÈÄôË£°?ÉÂá∫?æÁõ∏?úÁ?‰∏ãË?Ë≥áÊ?Ôº?
            ?ÖÊã¨Ë™≤Á?Ë≥áÊ??Å‰ª£Á¢ºÁ?‰æãÂ??ÉËÄÉÊ?Ê™î„Ä?
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* ?úÁ¥¢?åÈ?ÊøæÊéß??*/}
      <div className="p-4 border-b border-gray-700 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="?úÁ¥¢Ë≥áÊ?..."
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
              <option value="all">?®ÈÉ®È°ûÂ?</option>
              <option value="pdf">PDF</option>
              <option value="code">‰ª?¢º</option>
              <option value="dataset">Ë≥áÊ???/option>
              <option value="template">Ê®°Êùø</option>
              <option value="video">Ë¶ñÈ†ª</option>
              <option value="document">?áÊ?</option>
            </select>
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-gray-700 border-gray-600 text-white rounded-md px-3 py-2 text-sm"
          >
            <option value="name">?âÂ?Á®?/option>
            <option value="size">?âÂ§ßÂ∞?/option>
            <option value="downloads">?â‰?ËºâÊï∏</option>
            <option value="updated">?âÊõ¥?∞Ê???/option>
          </select>
        </div>
      </div>

      {/* Ë≥áÊ??óË°® */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-4">
            {filteredResources.length === 0 ? (
              <div className="text-center py-8">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">Ê≤íÊ??æÂà∞?∏È?Ë≥áÊ?</p>
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
                        {/* ?á‰ª∂È°ûÂ??ñÊ? */}
                        <div className="flex-shrink-0 p-3 bg-gray-700 rounded-lg">
                          {getTypeIcon(resource.type)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          {/* ?á‰ª∂?çÂ?Ê®ôÁ±§ */}
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-semibold text-white text-lg truncate">
                                {resource.name}
                              </h4>
                              <Badge variant="outline" className="text-xs text-gray-400 border-gray-600">
                                {getTypeLabel(resource.type)}
                              </Badge>
                              {resource.isNew && (
                                <Badge className="text-xs bg-green-600 text-white">??/Badge>
                              )}
                              {resource.isPopular && (
                                <Badge className="text-xs bg-orange-600 text-white">?±È?</Badge>
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
                          
                          {/* ?èËø∞ */}
                          <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                            {resource.description}
                          </p>
                          
                          {/* Ê®ôÁ±§ */}
                          <div className="flex flex-wrap gap-2 mb-3">
                            {resource.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs text-blue-400 border-blue-400">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          
                          {/* Â∫ïÈÉ®‰ø°ÊÅØ?å‰?ËºâÊ???*/}
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
                                  <span className="text-sm">Â∑≤‰?Ëº?/span>
                                </div>
                              )}
                              <Button
                                onClick={() => handleDownload(resource)}
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                                size="sm"
                              >
                                <Download className="w-4 h-4 mr-2" />
                                ‰∏ãË?
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

      {/* Â∫ïÈÉ®Áµ±Ë? */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>
            ??{filteredResources.length} ?ãË?Ê∫?
            {searchTerm && ` ???úÁ¥¢: "${searchTerm}"`}
            {filterType !== 'all' && ` ??È°ûÂ?: ${getTypeLabel(filterType)}`}
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
