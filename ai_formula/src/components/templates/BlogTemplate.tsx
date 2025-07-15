import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Calendar, User, ArrowLeft, Share2, Bookmark, Eye } from 'lucide-react';

interface BlogTemplateProps {
  // Article basic information
  title: string;
  titleZh?: string;
  excerpt: string;
  excerptZh?: string;
  content: React.ReactNode;
  
  // Article metadata
  author: string;
  authorZh?: string;
  publishDate: string;
  publishDateZh?: string;
  readTime: string;
  readTimeZh?: string;
  category: string;
  categoryZh?: string;
  tags: string[];
  tagsZh?: string[];
  
  // Article stats
  viewCount?: number;
  likeCount?: number;
  
  // Display options
  showStats?: boolean;
  showTags?: boolean;
  showShare?: boolean;
  showBookmark?: boolean;
  showBackButton?: boolean;
  
  // Callbacks
  onBack?: () => void;
  onShare?: () => void;
  onBookmark?: () => void;
  onLike?: () => void;
}

const BlogTemplate: React.FC<BlogTemplateProps> = ({
  title,
  titleZh,
  excerpt,
  excerptZh,
  content,
  author,
  authorZh,
  publishDate,
  publishDateZh,
  readTime,
  readTimeZh,
  category,
  categoryZh,
  tags,
  tagsZh,
  viewCount,
  likeCount,
  showStats = true,
  showTags = true,
  showShare = true,
  showBookmark = true,
  showBackButton = true,
  onBack,
  onShare,
  onBookmark,
  onLike,
}) => {
  const getCategoryColor = (category: string) => {
    const colorMap: { [key: string]: string } = {
      'AI科技': 'bg-blue-500/20 text-blue-300 border-blue-500/50',
      'AI Technology': 'bg-blue-500/20 text-blue-300 border-blue-500/50',
      '工具指南': 'bg-green-500/20 text-green-300 border-green-500/50',
      'Tool Guide': 'bg-green-500/20 text-green-300 border-green-500/50',
      '基礎教學': 'bg-purple-500/20 text-purple-300 border-purple-500/50',
      'Fundamentals': 'bg-purple-500/20 text-purple-300 border-purple-500/50',
      '科技前瞻': 'bg-orange-500/20 text-orange-300 border-orange-500/50',
      'Tech Innovation': 'bg-orange-500/20 text-orange-300 border-orange-500/50',
    };
    return colorMap[category] || 'bg-gray-500/20 text-gray-300 border-gray-500/50';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header Actions */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            {showBackButton && (
              <Button
                variant="ghost"
                onClick={onBack}
                className="text-gray-300 hover:text-white hover:bg-gray-700"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {titleZh ? '返�?' : 'Back'}
              </Button>
            )}
            <div className="flex items-center gap-2">
              {showShare && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onShare}
                  className="text-gray-300 hover:text-white hover:bg-gray-700"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              )}
              {showBookmark && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onBookmark}
                  className="text-gray-300 hover:text-white hover:bg-gray-700"
                >
                  <Bookmark className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-3 mb-4">
                <Badge className={getCategoryColor(category)}>
                  {categoryZh || category}
                </Badge>
                {showStats && viewCount && (
                  <div className="flex items-center text-gray-400 text-sm">
                    <Eye className="w-4 h-4 mr-1" />
                    <span>{viewCount}</span>
                  </div>
                )}
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                {titleZh || title}
              </h1>
              
              <p className="text-gray-300 text-lg mb-6">
                {excerptZh || excerpt}
              </p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{authorZh || author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{publishDateZh || publishDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{readTimeZh || readTime}</span>
                </div>
              </div>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="bg-gray-800/30 border-gray-700 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="prose prose-lg prose-invert max-w-none">
                {content}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tags Section */}
        {showTags && tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <Card className="bg-gray-800/30 border-gray-700 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  {titleZh ? '標籤' : 'Tags'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(tagsZh || tags).map((tag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-gray-700/50 text-gray-300 border-gray-600 hover:bg-gray-600/50 transition-colors"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Article Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Card className="bg-gray-800/30 border-gray-700 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-4">
                {onLike && (
                  <Button
                    variant="outline"
                    onClick={onLike}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    ?��? {likeCount ? `${likeCount}` : '0'}
                  </Button>
                )}
                {showShare && (
                  <Button
                    variant="outline"
                    onClick={onShare}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    {titleZh ? '?�享' : 'Share'}
                  </Button>
                )}
                {showBookmark && (
                  <Button
                    variant="outline"
                    onClick={onBookmark}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    <Bookmark className="w-4 h-4 mr-2" />
                    {titleZh ? '?��?' : 'Bookmark'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogTemplate; 
