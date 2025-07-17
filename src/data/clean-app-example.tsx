// 🧹 清理後的 App.tsx 範例
// 移除以下舊的引用：

// ❌ 需要刪除的舊引用：
// import AIBusinessAutomationOutline from '@/pages/courses/AIBusinessAutomationOutline';
// import AIBusinessAutomationLearning from '@/pages/courses/AIBusinessAutomationLearning';
// import AIBusinessAutomationTheme from '@/pages/courses/AIBusinessAutomationTheme';
// import AIBusinessAutomationUnit from '@/pages/courses/AIBusinessAutomationUnit';
// import AIBusinessAutomationQuiz from '@/pages/courses/AIBusinessAutomationQuiz';

// 以及對應的路由配置也需要移除：
// <Route path="/courses/ai-business-automation" element={<AIBusinessAutomationOutline />} />
// <Route path="/courses/ai-business-automation/learning/:courseId" element={<AIBusinessAutomationLearning />} />
// <Route path="/courses/ai-business-automation/theme/:themeId" element={<AIBusinessAutomationTheme />} />
// <Route path="/courses/ai-business-automation/theme/:themeId/unit/:unitId" element={<AIBusinessAutomationUnit />} />
// <Route path="/courses/ai-business-automation/quiz/:quizId" element={<AIBusinessAutomationQuiz />} />

// ✅ 新的引用應該是：
// import AIBusinessAutomationCoursePage from '@/pages/courses/ai-business-automation/index';

// ✅ 新的路由配置：
// <Route path="/courses/ai-business-automation" element={<AIBusinessAutomationCoursePage />} />

// 這樣就完成了從舊的多檔案系統到新的單一統一組件系統的遷移！ 