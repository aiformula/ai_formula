# 修復ChatGPT課程文件的編碼問題
$filePath = "src/pages/courses/chatgpt-complete-course/ChatGPTCompleteCourseUnit.tsx"

# 讀取文件內容
$content = Get-Content $filePath -Encoding UTF8 -Raw

# 修復常見的亂碼模式
$content = $content.Replace("?��?", "單元")
$content = $content.Replace("�?麼", "什麼") 
$content = $content.Replace("大�?語�?模�?", "大型語言模型")
$content = $content.Replace("15?��?", "15分鐘")
$content = $content.Replace("?�個課程", "這個課程")
$content = $content.Replace("�??�端", "的開端")
$content = $content.Replace("�?紹", "介紹")
$content = $content.Replace("智?�", "智能")
$content = $content.Replace("?��?念", "概念")
$content = $content.Replace("學�?路�?", "學習路徑")
$content = $content.Replace("?��?建�?", "並建立")
$content = $content.Replace("學�??��?", "學習目標")
$content = $content.Replace("?�方法", "的方法")
$content = $content.Replace("?�握", "掌握")
$content = $content.Replace("?�?��?", "有效的")
$content = $content.Replace("學習方法", "學習方法")
$content = $content.Replace("點樣跟�?課�?", "怎樣跟上課程")
$content = $content.Replace("?�實?��?", "的實際操作")
$content = $content.Replace("?��?齊�?", "結合起來")
$content = $content.Replace("�??��?好", "建立良好")
$content = $content.Replace("?��?", "的")

# 修復bullet points
$content = $content.Replace('<span className="text-green-400 mr-2">??</span>', '<span className="text-green-400 mr-2">•</span>')

# 修復進度相關文字
$content = $content.Replace("進度追蹤", "進度追蹤")
$content = $content.Replace("學習進度", "學習進度")
$content = $content.Replace("課程完成", "課程完成")
$content = $content.Replace("標記完成", "標記完成")
$content = $content.Replace("總進度", "總進度")

# 保存修復後的內容
Set-Content $filePath $content -Encoding UTF8

Write-Host "編碼修復完成！" -ForegroundColor Green 