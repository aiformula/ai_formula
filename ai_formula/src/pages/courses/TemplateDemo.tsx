/**
 * Template Demo Page
 * @fileoverview 展示新課程模板系統的示範頁面
 * @author AI Formula Team
 * @version 1.0.0
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  getCourseConfig, 
  getAllCourses, 
  CourseOutlineTemplate,
  CourseLearningTemplate
} from '@/components/course-template';
import { 
  BookOpen, 
  Play, 
  CheckCircle, 
  Code, 
  Lightbulb,
  ArrowRight
} from 'lucide-react';

const TemplateDemo: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState<string>('chatgpt');
  const [currentView, setCurrentView] = useState<'outline' | 'learning'>('outline');
  
  const allCourses = getAllCourses();
  const currentConfig = getCourseConfig(selectedCourse);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navigation />
      
      <div className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* 標題部分 */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-100 text-blue-800">模板系統示範</Badge>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              課程模板系統
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              演示新的可擴展課程模板系統，支持動態添加任何新課程而無需重複編寫代碼。
            </p>
          </div>

          {/* 特色介紹 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="h-5 w-5 mr-2 text-blue-600" />
                  可重用模板
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  一套模板支持所有課程類型，消除重複代碼，提高開發效率。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2 text-green-600" />
                  動態配置
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  通過配置文件動態管理課程數據、主題色彩和功能特性。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-purple-600" />
                  易於擴展
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  添加新課程只需提供數據和配置，無需編寫新的組件代碼。
                </p>
              </CardContent>
            </Card>
          </div>

          {/* 課程選擇器 */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">選擇課程</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {allCourses.map((course) => (
                <Card 
                  key={course.courseId}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedCourse === course.courseId 
                      ? 'ring-2 ring-blue-500 shadow-lg' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedCourse(course.courseId)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 mb-2">
                          {course.courseName}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          Course ID: {course.courseId}
                        </p>
                        <div className="flex items-center space-x-2">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: course.themeColor }}
                          />
                          <span className="text-sm text-gray-500">
                            {course.themeColor}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={selectedCourse === course.courseId ? 'default' : 'secondary'}>
                          {selectedCourse === course.courseId ? '已選中' : '點擊選擇'}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* 視圖選擇器 */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">選擇視圖</h2>
            <div className="flex space-x-4">
              <Button
                variant={currentView === 'outline' ? 'default' : 'outline'}
                onClick={() => setCurrentView('outline')}
                className="flex items-center"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                課程大綱
              </Button>
              <Button
                variant={currentView === 'learning' ? 'default' : 'outline'}
                onClick={() => setCurrentView('learning')}
                className="flex items-center"
              >
                <Play className="h-4 w-4 mr-2" />
                學習頁面
              </Button>
            </div>
          </div>

          {/* 當前配置信息 */}
          {currentConfig && (
            <div className="mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>當前配置</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">課程ID:</span>
                      <p className="text-gray-900">{currentConfig.courseId}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">主題色:</span>
                      <p className="text-gray-900">{currentConfig.themeColor}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">基礎路由:</span>
                      <p className="text-gray-900">{currentConfig.baseRoute}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">CSS前綴:</span>
                      <p className="text-gray-900">{currentConfig.cssPrefix}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* 實際演示區域 */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                實時演示：{currentConfig?.courseName}
              </h2>
              <Button
                onClick={() => navigate(currentConfig?.baseRoute || '#')}
                className="flex items-center"
              >
                前往實際頁面
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
            
            <Card className="border-2 border-dashed border-gray-300">
              <CardContent className="p-0">
                <div className="bg-gray-50 p-4 border-b">
                  <p className="text-sm text-gray-600">
                    以下是使用模板系統動態渲染的 {currentView === 'outline' ? '課程大綱' : '學習頁面'}
                  </p>
                </div>
                <div className="h-96 overflow-auto">
                  {currentConfig && currentView === 'outline' && (
                    <div className="scale-75 origin-top-left transform" style={{ width: '133.33%' }}>
                      <CourseOutlineTemplate config={currentConfig} />
                    </div>
                  )}
                  {currentConfig && currentView === 'learning' && (
                    <div className="scale-75 origin-top-left transform" style={{ width: '133.33%' }}>
                      <CourseLearningTemplate config={currentConfig} />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 使用說明 */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">如何添加新課程</h2>
            <Card>
              <CardContent className="p-6">
                <ol className="list-decimal list-inside space-y-3 text-gray-700">
                  <li>在 <code className="bg-gray-100 px-2 py-1 rounded">src/data/</code> 中創建課程數據文件</li>
                  <li>在 <code className="bg-gray-100 px-2 py-1 rounded">src/hooks/</code> 中創建進度追蹤 Hook</li>
                  <li>在 <code className="bg-gray-100 px-2 py-1 rounded">courseRegistry.ts</code> 中添加課程配置</li>
                  <li>在 <code className="bg-gray-100 px-2 py-1 rounded">App.tsx</code> 中添加路由（使用 CourseRouter）</li>
                  <li>完成！新課程自動擁有所有功能</li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateDemo; 