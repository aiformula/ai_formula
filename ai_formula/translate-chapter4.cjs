const fs = require('fs');
const path = require('path');

// 讀取原始檔案
const filePath = path.join(__dirname, 'src/data/midjourney-course-data.ts');
let content = fs.readFileSync(filePath, 'utf8');

console.log('開始翻譯第四章內容...');

// 第四章課程 4.1 的翻譯
const lesson4_1_translations = {
  titleEn: '4.1 Changing Canvas: Aspect Ratio (--ar)',
  durationEn: '18 minutes',
  descriptionEn: 'Learn to use the --ar parameter to control image aspect ratios for different usage requirements',
  imageAltEn: 'Aspect ratio parameter usage examples',
  
  transcriptEn: `By default, Midjourney generates images in a 1:1 square format. However, different purposes require different canvas sizes. The --aspect parameter, or its abbreviation --ar, is used to set the aspect ratio of images.

Usage method:
Add --ar <width>:<height> at the end of your prompt.

Common aspect ratio examples:
- --ar 1:1: Square, default value, suitable for social media avatars
- --ar 16:9: Widescreen, standard high-definition television and YouTube video ratio, suitable for cover images or computer wallpapers
- --ar 9:16: Portrait widescreen, suitable for mobile full-screen content, such as Instagram Stories or mobile wallpapers
- --ar 3:2: Classic camera ratio, suitable for photography-style works
- --ar 2:3: Common portrait poster or book cover ratio

Complete example:
/imagine prompt: a beautiful castle on a mountain --ar 16:9

Choosing the appropriate aspect ratio is an important factor for creative success, as it directly affects composition and visual effects. For example, landscape images are suitable for 16:9 or 3:2, whilst portrait works are suitable for 2:3 or 4:5.`,
  
  keyPointsEn: [
    '--ar parameter controls image aspect ratio',
    'Different ratios suit different purposes',
    '16:9 is suitable for landscapes and cover images',
    'Ratio choice affects compositional effects'
  ]
};

// 第四章課程 4.2 的翻譯
const lesson4_2_translations = {
  titleEn: '4.2 Artistic Style Intensity: Stylization (--stylize)',
  durationEn: '20 minutes',
  descriptionEn: 'Master the --stylize parameter to control the strength of Midjourney\'s built-in artistic style',
  imageAltEn: 'Stylization parameter effect examples',
  
  transcriptEn: `Midjourney has a set of trained default aesthetic styles that lean towards artistic, vibrant colours, and beautiful compositions. The --stylize parameter, or its abbreviation --s, is used to control the application strength of this "Midjourney style".

Parameter range: 0-1000
- Default value: 100
- Lower values (0-50): More literal interpretation of prompts, less artistic processing
- Higher values (500-1000): More artistic style application, enhanced visual appeal

Usage examples:

Low stylization value (Low Stylize Value): e.g., --s 50
Result: More realistic, closer to literal prompt interpretation, suitable for concept art or technical illustrations requiring accuracy.

High stylization value (High Stylize Value): e.g., --s 750
Result: More artistic processing, enhanced colours and composition, suitable for creative artwork and visual presentation.

Complete example:
/imagine prompt: a simple wooden chair --s 25 (realistic style)
/imagine prompt: a simple wooden chair --s 750 (artistic style)

It's recommended to adjust stylization values according to creative goals: use low values for concept art, high values for artistic works.`,
  
  keyPointsEn: [
    '--stylize controls Midjourney\'s artistic style strength',
    'Range 0-1000, default 100',
    'Low values for realistic, high values for artistic',
    'Choose based on creative purpose'
  ]
};

// 第四章課程 4.3 的翻譯
const lesson4_3_translations = {
  titleEn: '4.3 Controlling Chaos and Weirdness: --chaos and --weird',
  durationEn: '22 minutes',
  descriptionEn: 'Learn to use --chaos and --weird parameters to control image variation and creative unpredictability',
  imageAltEn: 'Chaos and weird parameter effect demonstrations',
  
  transcriptEn: `These two parameters are both used to increase the "unexpectedness" of images, but they work in different ways.

--chaos Parameter (--c):
Controls the variation between the four initial images generated. Higher values mean greater differences between the four images.

Range: 0-100
--c 0 (default): The four generated sketches will be more similar with unified style
--c 50: Moderate variation, good balance between consistency and diversity
--c 100: Maximum variation, the four images may have completely different styles and compositions

--weird Parameter (--w):
Introduces unconventional and surreal elements, making images more "strange" and artistic.

Range: 0-3000
--w 0 (default): Normal generation without weird effects
--w 1000: Moderate weirdness, adds some unconventional elements
--w 3000: Maximum weirdness, may produce very surreal and abstract results

Usage examples:
/imagine prompt: a cat in a garden --c 75
/imagine prompt: a cat in a garden --w 1500
/imagine prompt: a cat in a garden --c 50 --w 1000

These parameters are particularly suitable for creative exploration and breaking conventional thinking patterns.`,
  
  keyPointsEn: [
    '--chaos controls variation between generated images',
    '--weird adds unconventional and surreal elements',
    'Higher values increase unpredictability',
    'Suitable for creative exploration and experimentation'
  ]
};

// 第四章課程 4.4 的翻譯
const lesson4_4_translations = {
  titleEn: '4.4 Exclusion Method: Negative Prompts (--no)',
  durationEn: '20 minutes',
  descriptionEn: 'Master the --no parameter to exclude unwanted elements from generated images',
  imageAltEn: 'Negative prompt parameter usage examples',
  
  transcriptEn: `Sometimes, you don't want to add something, but rather exclude something. The --no parameter is your exclusion tool.

Basic usage:
Add --no followed by the elements you want to exclude at the end of your prompt.

Examples:
/imagine prompt: a beautiful garden --no people
/imagine prompt: a city street --no cars, traffic
/imagine prompt: a portrait of a woman --no glasses, hat

Important notes:
1. Exclusion effectiveness: --no doesn't guarantee 100% exclusion, but significantly reduces the probability
2. Multiple exclusions: You can exclude multiple elements by separating them with commas
3. Common exclusions: people, text, logos, specific colours, objects, etc.

Practical applications:
- Architectural photography: --no people, cars
- Product photography: --no background, shadows
- Character design: --no clothing, accessories
- Food photography: --no utensils, plates

Advanced tip:
Combine with other parameters for better control:
/imagine prompt: a minimalist room --no clutter, decorations --s 25 --ar 16:9

The --no parameter is particularly useful when you have a clear vision but want to avoid specific elements that might interfere with your creative intent.`,
  
  keyPointsEn: [
    '--no parameter excludes unwanted elements',
    'Significantly reduces probability of excluded items',
    'Can exclude multiple elements with commas',
    'Useful for clean, focused compositions'
  ]
};

// 應用第四章課程 4.1 翻譯
console.log('翻譯課程 4.1...');
content = content.replace(
  /(id: 16,\s*title: '4\.1 改變畫布：長寬比 \(--ar\)',\s*)duration: '18 分鐘',/,
  `$1titleEn: '${lesson4_1_translations.titleEn}',
          duration: '18 分鐘',
          durationEn: '${lesson4_1_translations.durationEn}',`
);

content = content.replace(
  /(description: '學習使用 --ar 參數控制圖像的長寬比，適應不同用途需求',)/,
  `$1
          descriptionEn: '${lesson4_1_translations.descriptionEn}',`
);

content = content.replace(
  /(imageAlt: '長寬比參數使用示例',)/,
  `$1
          imageAltEn: '${lesson4_1_translations.imageAltEn}',`
);

content = content.replace(
  /(transcript: `預設情況下，Midjourney 生成嘅圖像係 1:1 嘅正方形[\s\S]*?選擇合適嘅長寬比係創作成功嘅重要因素，佢直接影響構圖同視覺效果。例如，風景圖適合用 16:9 或 3:2，而人像作品則適合用 2:3 或 4:5。`,)/,
  `$1
          transcriptEn: \`${lesson4_1_translations.transcriptEn}\`,`
);

content = content.replace(
  /(keyPoints: \[\s*'--ar 參數控制圖像的長寬比',\s*'不同比例適合不同用途',\s*'16:9 適合風景和封面圖',\s*'選擇比例會影響構圖效果'\s*\],)/,
  `$1
          keyPointsEn: [
            '${lesson4_1_translations.keyPointsEn[0]}',
            '${lesson4_1_translations.keyPointsEn[1]}',
            '${lesson4_1_translations.keyPointsEn[2]}',
            '${lesson4_1_translations.keyPointsEn[3]}'
          ],`
);

// 添加第四章時長翻譯
content = content.replace(
  /(duration: '95 分鐘',\s*lessons:)/,
  `duration: '95 分鐘',
      durationEn: '95 minutes',
      lessons:`
);

// 寫入更新後的檔案
fs.writeFileSync(filePath, content, 'utf8');
console.log('第四章課程 4.1 翻譯完成！'); 