import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, AlertCircle, BarChart3, FileText, Search, Globe } from 'lucide-react';

interface ContentAuditItem {
  id: string;
  title: string;
  url: string;
  type: 'page' | 'course' | 'blog' | 'component';
  language: 'zh-HK' | 'en';
  seoScore: number;
  performanceScore: number;
  uxScore: number;
  issues: AuditIssue[];
  lastUpdated: Date;
}

interface AuditIssue {
  type: 'error' | 'warning' | 'info';
  category: 'seo' | 'performance' | 'ux' | 'content';
  message: string;
  severity: 'high' | 'medium' | 'low';
  recommendation: string;
}

interface AuditResults {
  totalPages: number;
  averageScores: {
    seo: number;
    performance: number;
    ux: number;
  };
  issuesByCategory: {
    seo: number;
    performance: number;
    ux: number;
    content: number;
  };
  highPriorityIssues: number;
}

const ContentAuditTool: React.FC = () => {
  const [auditResults, setAuditResults] = useState<AuditResults | null>(null);
  const [contentItems, setContentItems] = useState<ContentAuditItem[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedLanguage, setSelectedLanguage] = useState<'all' | 'zh-HK' | 'en'>('all');

  // Mock data for demonstration
  const mockContentItems: ContentAuditItem[] = [
    {
      id: '1',
      title: 'AI Formula ä¸»é?',
      url: '/',
      type: 'page',
      language: 'zh-HK',
      seoScore: 85,
      performanceScore: 78,
      uxScore: 92,
      issues: [
        {
          type: 'warning',
          category: 'seo',
          message: 'ç¼ºå?çµæ??–æ•¸?šæ?è¨?,
          severity: 'medium',
          recommendation: 'æ·»å? JSON-LD çµæ??–æ•¸?šä»¥?é??œç´¢å¼•æ??†è§£'
        },
        {
          type: 'error',
          category: 'performance',
          message: '?–ç??ªå„ª??,
          severity: 'high',
          recommendation: 'å£“ç¸®?–ç?ä¸¦ä½¿??WebP ?¼å?'
        }
      ],
      lastUpdated: new Date('2024-01-15')
    },
    {
      id: '2',
      title: 'Prompt Engineering Course',
      url: '/courses/prompt-engineering',
      type: 'course',
      language: 'en',
      seoScore: 72,
      performanceScore: 85,
      uxScore: 88,
      issues: [
        {
          type: 'warning',
          category: 'seo',
          message: 'Meta description too short',
          severity: 'medium',
          recommendation: 'Expand meta description to 150-160 characters'
        },
        {
          type: 'info',
          category: 'content',
          message: 'Content could be more engaging',
          severity: 'low',
          recommendation: 'Add interactive elements and multimedia content'
        }
      ],
      lastUpdated: new Date('2024-01-10')
    },
    {
      id: '3',
      title: 'AI å·¥å…·?™å­¸?šå®¢',
      url: '/blog/ai-tools-guide',
      type: 'blog',
      language: 'zh-HK',
      seoScore: 90,
      performanceScore: 82,
      uxScore: 85,
      issues: [
        {
          type: 'info',
          category: 'ux',
          message: '?¯è??§å¯ä»¥æ”¹??,
          severity: 'low',
          recommendation: 'å¢žå?æ®µè½?“è??Œä½¿?¨æ›´å¤šå?æ¨™é?'
        }
      ],
      lastUpdated: new Date('2024-01-20')
    }
  ];

  const runContentAudit = async () => {
    setIsRunning(true);
    
    // Simulate audit process
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      // Update progress here if needed
    }
    
    setContentItems(mockContentItems);
    
    // Calculate audit results
    const results: AuditResults = {
      totalPages: mockContentItems.length,
      averageScores: {
        seo: mockContentItems.reduce((sum, item) => sum + item.seoScore, 0) / mockContentItems.length,
        performance: mockContentItems.reduce((sum, item) => sum + item.performanceScore, 0) / mockContentItems.length,
        ux: mockContentItems.reduce((sum, item) => sum + item.uxScore, 0) / mockContentItems.length
      },
      issuesByCategory: {
        seo: mockContentItems.reduce((sum, item) => sum + item.issues.filter(issue => issue.category === 'seo').length, 0),
        performance: mockContentItems.reduce((sum, item) => sum + item.issues.filter(issue => issue.category === 'performance').length, 0),
        ux: mockContentItems.reduce((sum, item) => sum + item.issues.filter(issue => issue.category === 'ux').length, 0),
        content: mockContentItems.reduce((sum, item) => sum + item.issues.filter(issue => issue.category === 'content').length, 0)
      },
      highPriorityIssues: mockContentItems.reduce((sum, item) => sum + item.issues.filter(issue => issue.severity === 'high').length, 0)
    };
    
    setAuditResults(results);
    setIsRunning(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'error': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'info': return <CheckCircle className="w-4 h-4 text-blue-500" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const filteredItems = contentItems.filter(item => 
    selectedLanguage === 'all' || item.language === selectedLanguage
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content Audit Tool</h1>
          <p className="text-gray-600 mt-2">Analyze and optimize your content for SEO, performance, and user experience</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <select 
            value={selectedLanguage} 
            onChange={(e) => setSelectedLanguage(e.target.value as 'all' | 'zh-HK' | 'en')}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="all">All Languages</option>
            <option value="zh-HK">ä¸­æ? (é¦™æ¸¯)</option>
            <option value="en">English</option>
          </select>
          
          <Button 
            onClick={runContentAudit}
            disabled={isRunning}
            className="flex items-center space-x-2"
          >
            <Search className="w-4 h-4" />
            <span>{isRunning ? 'Running Audit...' : 'Run Content Audit'}</span>
          </Button>
        </div>
      </div>

      {isRunning && (
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span>Analyzing content...</span>
              </div>
              <Progress value={100} className="w-full" />
            </div>
          </CardContent>
        </Card>
      )}

      {auditResults && (
        <div className="space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Pages</p>
                    <p className="text-2xl font-bold text-gray-900">{auditResults.totalPages}</p>
                  </div>
                  <FileText className="w-8 h-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg SEO Score</p>
                    <p className={`text-2xl font-bold ${getScoreColor(auditResults.averageScores.seo)}`}>
                      {Math.round(auditResults.averageScores.seo)}
                    </p>
                  </div>
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Performance</p>
                    <p className={`text-2xl font-bold ${getScoreColor(auditResults.averageScores.performance)}`}>
                      {Math.round(auditResults.averageScores.performance)}
                    </p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">High Priority Issues</p>
                    <p className="text-2xl font-bold text-red-600">{auditResults.highPriorityIssues}</p>
                  </div>
                  <AlertCircle className="w-8 h-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Results */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="pages">Page Analysis</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Issues by Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">SEO Issues</span>
                        <Badge variant="outline">{auditResults.issuesByCategory.seo}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Performance Issues</span>
                        <Badge variant="outline">{auditResults.issuesByCategory.performance}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">UX Issues</span>
                        <Badge variant="outline">{auditResults.issuesByCategory.ux}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Content Issues</span>
                        <Badge variant="outline">{auditResults.issuesByCategory.content}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Score Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">SEO Score</span>
                          <span className="text-sm text-gray-600">{Math.round(auditResults.averageScores.seo)}/100</span>
                        </div>
                        <Progress value={auditResults.averageScores.seo} className="w-full" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Performance Score</span>
                          <span className="text-sm text-gray-600">{Math.round(auditResults.averageScores.performance)}/100</span>
                        </div>
                        <Progress value={auditResults.averageScores.performance} className="w-full" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">UX Score</span>
                          <span className="text-sm text-gray-600">{Math.round(auditResults.averageScores.ux)}/100</span>
                        </div>
                        <Progress value={auditResults.averageScores.ux} className="w-full" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="pages" className="space-y-4">
              {filteredItems.map((item) => (
                <Card key={item.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                        <CardDescription className="flex items-center space-x-2">
                          <span>{item.url}</span>
                          <Badge variant="outline">{item.type}</Badge>
                          <Badge variant="outline" className="flex items-center space-x-1">
                            <Globe className="w-3 h-3" />
                            <span>{item.language}</span>
                          </Badge>
                        </CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        <Badge className={getScoreBadgeColor(item.seoScore)}>
                          SEO: {item.seoScore}
                        </Badge>
                        <Badge className={getScoreBadgeColor(item.performanceScore)}>
                          Perf: {item.performanceScore}
                        </Badge>
                        <Badge className={getScoreBadgeColor(item.uxScore)}>
                          UX: {item.uxScore}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Issues ({item.issues.length})</h4>
                      {item.issues.map((issue, index) => (
                        <Alert key={index} className="py-3">
                          <div className="flex items-start space-x-2">
                            {getIssueIcon(issue.type)}
                            <div className="flex-1">
                              <AlertDescription>
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-medium">{issue.message}</span>
                                  <Badge variant="outline" className="text-xs">
                                    {issue.severity}
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-600">{issue.recommendation}</p>
                              </AlertDescription>
                            </div>
                          </div>
                        </Alert>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-600">High Priority Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-2">
                        <XCircle className="w-4 h-4 text-red-500 mt-0.5" />
                        <span className="text-sm">Optimize images for better performance</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <XCircle className="w-4 h-4 text-red-500 mt-0.5" />
                        <span className="text-sm">Add missing structured data markup</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-yellow-600">Medium Priority Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-2">
                        <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5" />
                        <span className="text-sm">Improve meta descriptions length</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5" />
                        <span className="text-sm">Enhance content readability</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default ContentAuditTool; 