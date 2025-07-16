import React from 'react';
import { 
  Play, CheckCircle, Clock, BookOpen, ArrowRight,
  MessageSquare, Bookmark, ThumbsUp, Share2, 
  Target, TrendingUp, Award, Zap
} from 'lucide-react';

const DesignSystemDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI FORMULA 設計系統展示
          </h1>
          <p className="text-xl text-gray-600">
            統一的UI組件庫和設計標準
          </p>
        </div>

        {/* Color System */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-900 mb-8">顏色系統</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="w-full h-20 rounded-lg mb-4" style={{backgroundColor: 'var(--ai-formula-primary)'}}></div>
              <h3 className="font-semibold text-gray-900">Primary</h3>
              <p className="text-sm text-gray-600">#FFD600</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="w-full h-20 rounded-lg mb-4" style={{backgroundColor: 'var(--ai-formula-accent-blue)'}}></div>
              <h3 className="font-semibold text-gray-900">Accent Blue</h3>
              <p className="text-sm text-gray-600">#3B82F6</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="w-full h-20 rounded-lg mb-4" style={{backgroundColor: 'var(--ai-formula-accent-purple)'}}></div>
              <h3 className="font-semibold text-gray-900">Accent Purple</h3>
              <p className="text-sm text-gray-600">#8B5CF6</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="w-full h-20 rounded-lg mb-4" style={{backgroundColor: 'var(--ai-formula-success)'}}></div>
              <h3 className="font-semibold text-gray-900">Success</h3>
              <p className="text-sm text-gray-600">#10B981</p>
            </div>
          </div>
        </section>

        {/* Button System */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-900 mb-8">按鈕系統</h2>
          <div className="bg-white rounded-xl p-8 shadow-sm border">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">主要動作按鈕</h3>
                <div className="flex flex-wrap gap-4">
                  <button className="btn-primary">
                    <Play className="w-4 h-4 mr-2" />
                    開始學習
                  </button>
                  <button className="btn-primary">
                    繼續課程
                  </button>
                  <button className="btn-primary">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    完成測驗
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">次要動作按鈕</h3>
                <div className="flex flex-wrap gap-4">
                  <button className="btn-secondary">
                    返回課程
                  </button>
                  <button className="btn-secondary">
                    查看詳情
                  </button>
                  <button className="btn-secondary">
                    <Bookmark className="w-4 h-4 mr-2" />
                    收藏課程
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">突出動作按鈕</h3>
                <div className="flex flex-wrap gap-4">
                  <button className="btn-accent">
                    升級到專業版
                  </button>
                  <button className="btn-accent">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    開始挑戰
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Progress System */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-900 mb-8">進度條系統</h2>
          <div className="bg-white rounded-xl p-8 shadow-sm border">
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">學習進度</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">AI 商業自動化</span>
                      <span className="text-sm font-semibold text-gray-900">75%</span>
                    </div>
                    <div className="progress-bar progress-bar-large">
                      <div className="progress-bar-fill" style={{width: '75%'}}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">課程完成度</span>
                      <span className="text-sm font-semibold text-gray-900">60%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-bar-fill" style={{width: '60%'}}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">技能掌握</span>
                      <span className="text-sm font-semibold text-gray-900">85%</span>
                    </div>
                    <div className="progress-bar progress-bar-small">
                      <div className="progress-bar-fill" style={{width: '85%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Card System */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-900 mb-8">卡片系統</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Course Card */}
            <div className="course-card">
              <div className="course-card-header">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                  <span className="badge-primary">熱門課程</span>
                </div>
                <Clock className="w-4 h-4 text-gray-400" />
              </div>
              <h3 className="course-card-title">AI 商業自動化實戰</h3>
              <p className="course-card-description">
                學習如何運用 AI 工具來自動化您的商業流程，提升效率並節省成本。
              </p>
              <div className="course-card-footer">
                <span className="text-sm text-gray-500">9個單元</span>
                <button className="btn-primary text-sm px-4 py-2">
                  開始學習
                </button>
              </div>
            </div>

            {/* Unit Card - Completed */}
            <div className="unit-card unit-card-completed">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-semibold text-gray-900">單元 1</h4>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-gray-600 mb-4">什麼是AI商業自動化？</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-600 font-medium">已完成</span>
                <span className="text-sm text-gray-500">20分鐘</span>
              </div>
            </div>

            {/* Unit Card - Current */}
            <div className="unit-card unit-card-current">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-semibold text-gray-900">單元 2</h4>
                <Play className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-gray-600 mb-4">為什麼現在必須導入？</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-600 font-medium">進行中</span>
                <span className="text-sm text-gray-500">25分鐘</span>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Progress */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-900 mb-8">技能進度展示</h2>
          <div className="skills-radar-container">
            <h3 className="skills-radar-title">核心技能掌握度</h3>
            <div className="space-y-4">
              <div className="skill-item">
                <span className="skill-name">自動化工具使用</span>
                <div className="skill-progress">
                  <div className="progress-bar">
                    <div className="progress-bar-fill" style={{width: '90%'}}></div>
                  </div>
                </div>
                <span className="skill-percentage">90%</span>
              </div>
              <div className="skill-item">
                <span className="skill-name">AI 集成應用</span>
                <div className="skill-progress">
                  <div className="progress-bar">
                    <div className="progress-bar-fill" style={{width: '75%'}}></div>
                  </div>
                </div>
                <span className="skill-percentage">75%</span>
              </div>
              <div className="skill-item">
                <span className="skill-name">流程優化設計</span>
                <div className="skill-progress">
                  <div className="progress-bar">
                    <div className="progress-bar-fill" style={{width: '85%'}}></div>
                  </div>
                </div>
                <span className="skill-percentage">85%</span>
              </div>
              <div className="skill-item">
                <span className="skill-name">ROI 效益評估</span>
                <div className="skill-progress">
                  <div className="progress-bar">
                    <div className="progress-bar-fill" style={{width: '60%'}}></div>
                  </div>
                </div>
                <span className="skill-percentage">60%</span>
              </div>
            </div>
          </div>
        </section>

        {/* Achievement Badges */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-900 mb-8">成就徽章系統</h2>
          <div className="bg-white rounded-xl p-8 shadow-sm border">
            <div className="flex flex-wrap gap-4">
              <div className="achievement-badge-gold">
                <Award className="w-4 h-4 mr-2" />
                課程完成者
              </div>
              <div className="achievement-badge-silver">
                <Target className="w-4 h-4 mr-2" />
                快速學習者
              </div>
              <div className="achievement-badge-bronze">
                <TrendingUp className="w-4 h-4 mr-2" />
                持續進步
              </div>
              <div className="learning-streak">
                <Zap className="learning-streak-icon" />
                <span className="learning-streak-text">連續學習 7 天</span>
              </div>
            </div>
          </div>
        </section>

        {/* Typography Scale */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-900 mb-8">字體層級系統</h2>
          <div className="bg-white rounded-xl p-8 shadow-sm border">
            <div className="space-y-6">
              <h1>H1 主標題 - AI FORMULA 課程平台</h1>
              <h2>H2 副標題 - 全面提升您的自動化技能</h2>
              <h3>H3 章節標題 - 學習核心概念</h3>
              <h4>H4 小標題 - 實際應用案例</h4>
              <p>正文內容 - 這是標準的段落文字，用於解釋課程內容和提供詳細說明。字體大小和行距經過精心調整，確保最佳的閱讀體驗。</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-gray-600">
            🎨 AI FORMULA 統一設計系統 | 提升用戶體驗，保持品牌一致性
          </p>
        </div>

      </div>
    </div>
  );
};

export default DesignSystemDemo; 