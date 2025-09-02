# 修復ChatGPT課程文件的亂碼問題
$filePath = "src/pages/courses/chatgpt-complete-course/ChatGPTCompleteCourseUnit.tsx"

# 備份原文件
Copy-Item $filePath "$filePath.corrupted.backup"

# 讀取文件內容
$content = Get-Content $filePath -Raw -Encoding UTF8

Write-Host "開始修復ChatGPT課程文件..." -ForegroundColor Yellow

# 修復基本標題和時間
$content = $content -replace "(?<='|`)單元 1\.1：.*?(?='|`)", "單元 1.1：什麼是大型語言模型 (LLM)？"
$content = $content -replace "15\?\?\?", "15分鐘"

# 修復常見亂碼字符
$content = $content -replace "\?\?\?", "單元"
$content = $content -replace "\?\?\?", "什麼"
$content = $content -replace "大\?\?語\?\?模\?\?", "大型語言模型"
$content = $content -replace "\?\?個課程", "這個課程"
$content = $content -replace "\?\?\?端", "的開端"
$content = $content -replace "\?\?紹", "介紹"
$content = $content -replace "智\?\?", "智能"
$content = $content -replace "\?\?\?念", "概念"
$content = $content -replace "學\?\?路\?\?", "學習路徑"
$content = $content -replace "\?\?\?建\?\?", "並建立"
$content = $content -replace "學\?\?\?\?\?", "學習目標"
$content = $content -replace "\?\?方法", "的方法"

# 修復bullet points
$content = $content -replace '<span className="text-green-400 mr-2">\?\?</span>', '<span className="text-green-400 mr-2">•</span>'

# 修復基本描述文字
$content = $content -replace "\?\?握", "掌握"
$content = $content -replace "\?\?\?\?\?", "有效的"
$content = $content -replace "點樣跟\?\?課\?\?", "怎樣跟上課程"
$content = $content -replace "\?\?實\?\?\?\?", "的實際操作"
$content = $content -replace "\?\?\?齊\?\?", "結合起來"
$content = $content -replace "\?\?\?\?\?好", "建立良好"

Write-Host "正在保存修復後的文件..." -ForegroundColor Yellow

# 保存修復後的內容
$content | Set-Content $filePath -Encoding UTF8

Write-Host "ChatGPT課程文件修復完成！" -ForegroundColor Green
Write-Host "原損壞文件已備份為: $filePath.corrupted.backup" -ForegroundColor Cyan 