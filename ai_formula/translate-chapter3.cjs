const fs = require('fs');
const path = require('path');

// 讀取原始檔案
const filePath = path.join(__dirname, 'src/data/midjourney-course-data.ts');
let content = fs.readFileSync(filePath, 'utf8');

console.log('開始翻譯第三章剩餘內容...');

// 第三章課程 3.2 的翻譯
const lesson3_2_translations = {
  // 課程 3.2 基本信息
  titleEn: '3.2 Advanced Syntax: Telling Stories with Images (Image Prompts)',
  durationEn: '20 minutes',
  descriptionEn: 'Learn to use images as prompts, combining visual references to create new works',
  imageAltEn: 'Image prompts usage examples',

  // transcript 翻譯
  transcriptEn: `Apart from text, you can also use images to guide Midjourney's creation. This function is called "Image Prompts", which can influence the style, composition and content of the final generated image.

Usage method:
1. Obtain image link: First, you need the public URL of a reference image. You can upload your own image to Discord, then right-click on the image and select "Copy Link".

2. Combine prompts: In the /imagine command, place the image link at the very front of the prompt, then leave a space and input your text description.

Example:
/imagine prompt: https://example.com/image.jpg a robot in the style of this image

Midjourney will analyse the image you provide and attempt to integrate its visual elements into your text description, creating new works that combine the characteristics of both. This function is particularly suitable for learning specific styles or using existing works as a creative foundation.`,

  // keyPoints 翻譯
  keyPointsEn: [
    'Image prompts can influence style, composition and content',
    'Requires obtaining the public URL of images',
    'Image links are placed at the front of prompts',
    'AI will analyse and integrate visual elements from images'
  ]
};

// 第三章課程 3.3 的翻譯
const lesson3_3_translations = {
  titleEn: '3.3 Concept Blending with /blend Command',
  durationEn: '18 minutes',
  descriptionEn: 'Master the /blend command to learn how to fuse multiple images to create new concepts',
  imageAltEn: '/blend command operation examples',

  transcriptEn: `/blend is a simplified command specifically designed for fusing multiple images, particularly suitable for mobile operation. It can blend the concepts and aesthetic styles of 2 to 5 images, creating a completely new image.

Features and limitations:
- Pure image operation: The /blend command cannot be used together with text prompts. It is only used for blending images.
- Quantity limitation: A maximum of 5 images can be blended.
- Size options: You can choose the aspect ratio of the generated image in the command, with options including Portrait (2:3), Landscape (3:2) and Square (1:1).

Usage method:
1. Input the /blend command
2. Discord will display several upload boxes (image1, image2, etc.)
3. Click the upload boxes and select 2 to 5 images from your device
4. (Optional) Click the "dimensions" option to select your desired output size
5. Send the command and wait for the blended results

This command is particularly suitable for exploring the combination of visual concepts and creating unexpected artistic effects.`,

  keyPointsEn: [
    '/blend is specifically for fusing multiple images',
    'Cannot be combined with text prompts',
    'Can blend 2-5 images',
    'Suitable for mobile operation and concept exploration'
  ]
};

// 第三章課程 3.4 的翻譯
const lesson3_4_translations = {
  titleEn: '3.4 Weight Allocation: The Mystery of Multi-Prompts (::)',
  durationEn: '22 minutes',
  descriptionEn: 'Learn to use double colon syntax to control the importance of different concepts in prompts',
  imageAltEn: 'Prompt weight allocation examples',

  transcriptEn: `Sometimes, your prompt contains several important concepts, but you want Midjourney to pay more attention to certain concepts. At this point, you need to use "Multi-Prompts" and weight allocation syntax ::.

The double colon :: can split a prompt into several independent parts, allowing the AI to consider them separately.

Basic usage: Concept separation
- hot dog: AI will understand this as "hot dog"
- hot:: dog: AI will separately consider "hot" and "dog" as two concepts, possibly generating a very hot dog

Advanced usage: Weight allocation
You can also add numbers after the double colon to specify the importance of each part, with higher values representing greater importance.

Example:
/imagine prompt: space ship::2 fire::1

In this example, "space ship" has a weight of 2, and "fire" has a weight of 1. This means Midjourney will treat "space ship" as the more primary element when generating the image, whilst "fire" serves as a secondary element.

This technique gives you more precise control to balance the relationship between different elements in your prompt. Weight allocation is particularly suitable for complex scenes or when you want to emphasise a specific element.`,

  keyPointsEn: [
    ':: syntax is used to separate and control concept importance',
    'Can handle different conceptual elements separately',
    'Numerical weights control relative importance of elements',
    'Suitable for complex scenes and element emphasis'
  ]
};

// 第三章課程 3.5 的翻譯
const lesson3_5_translations = {
  titleEn: '3.5 Reverse Engineering: /describe Command from Image to Text',
  durationEn: '25 minutes',
  descriptionEn: 'Use the /describe command to analyse images and learn better prompt expression methods',
  imageAltEn: '/describe command reverse analysis examples',

  transcriptEn: `When you see a beautiful AI image online and want to know how it was generated? Or do you want to learn description methods that AI can "understand" better? The /describe command is your "Rosetta Stone".

This command functions completely opposite to /imagine: you give it an image, and after analysis, it returns four possible text prompts that could generate this image.

Usage method:
1. Input the /describe command
2. Upload an image you want to analyse
3. Midjourney Bot will return four detailed prompt suggestions

This function is an extremely powerful learning tool. By analysing the prompts of successful works, you can quickly learn:
- New style vocabulary
- Artist names
- Composition technique terminology
- Aesthetic description methods

Thereby greatly enriching your prompt vocabulary and understanding AI's "visual language".

It's recommended to use the prompts analysed by /describe as learning references and try applying them to your own creations. This can rapidly improve your prompting skills.`,

  keyPointsEn: [
    '/describe is reverse engineering from image to text',
    'Can learn expression methods from successful works',
    'Rapidly expands prompt vocabulary',
    'Is an important tool for understanding AI visual language'
  ]
};

// 應用第三章課程 3.2 翻譯
console.log('翻譯課程 3.2...');
content = content.replace(
  /(id: 12,\s*title: '3\.2 進階語法：用圖片說故事 \(Image Prompts\)',\s*)duration: '20 分鐘',/,
  `$1titleEn: '${lesson3_2_translations.titleEn}',
          duration: '20 分鐘',
          durationEn: '${lesson3_2_translations.durationEn}',`
);

content = content.replace(
  /(description: '學習使用圖像作為提示詞，結合視覺參考創作新作品',)/,
  `$1
          descriptionEn: '${lesson3_2_translations.descriptionEn}',`
);

content = content.replace(
  /(imageAlt: '圖像提示詞使用示例',)/,
  `$1
          imageAltEn: '${lesson3_2_translations.imageAltEn}',`
);

content = content.replace(
  /(transcript: `除咗文字，你仲可以用圖像嚟引導 Midjourney 嘅創作[\s\S]*?呢個功能特別適合用嚟學習特定風格或者將現有作品作為創作基礎。`,)/,
  `$1
          transcriptEn: \`${lesson3_2_translations.transcriptEn}\`,`
);

content = content.replace(
  /(keyPoints: \[\s*'圖像提示詞能影響風格、構圖和內容',\s*'需要獲取圖片的公開網址',\s*'圖片連結放在提示詞最前面',\s*'AI 會分析並融合圖片的視覺元素'\s*\],)/,
  `$1
          keyPointsEn: [
            '${lesson3_2_translations.keyPointsEn[0]}',
            '${lesson3_2_translations.keyPointsEn[1]}',
            '${lesson3_2_translations.keyPointsEn[2]}',
            '${lesson3_2_translations.keyPointsEn[3]}'
          ],`
);

// 應用第三章課程 3.3 翻譯
console.log('翻譯課程 3.3...');
content = content.replace(
  /(id: 13,\s*title: '3\.3 混合概念嘅 \/blend 指令',\s*)duration: '18 分鐘',/,
  `$1titleEn: '${lesson3_3_translations.titleEn}',
          duration: '18 分鐘',
          durationEn: '${lesson3_3_translations.durationEn}',`
);

content = content.replace(
  /(description: '掌握 \/blend 指令，學習融合多張圖片創造新概念',)/,
  `$1
          descriptionEn: '${lesson3_3_translations.descriptionEn}',`
);

content = content.replace(
  /(imageAlt: '\/blend 指令操作示例',)/,
  `$1
          imageAltEn: '${lesson3_3_translations.imageAltEn}',`
);

content = content.replace(
  /(transcript: `\/blend 係一個專為融合多張圖片而設嘅簡化指令[\s\S]*?呢個指令特別適合探索視覺概念嘅結合，創造意想不到嘅藝術效果。`,)/,
  `$1
          transcriptEn: \`${lesson3_3_translations.transcriptEn}\`,`
);

content = content.replace(
  /(keyPoints: \[\s*'\/blend 專門用於融合多張圖片',\s*'不能與文字提示詞結合使用',\s*'可混合 2-5 張圖片',\s*'適合手機操作和概念探索'\s*\],)/,
  `$1
          keyPointsEn: [
            '${lesson3_3_translations.keyPointsEn[0]}',
            '${lesson3_3_translations.keyPointsEn[1]}',
            '${lesson3_3_translations.keyPointsEn[2]}',
            '${lesson3_3_translations.keyPointsEn[3]}'
          ],`
);

// 應用第三章課程 3.4 翻譯
console.log('翻譯課程 3.4...');
content = content.replace(
  /(id: 14,\s*title: '3\.4 權重分配：多重提示詞 \(:\:\) 的奧秘',\s*)duration: '22 分鐘',/,
  `$1titleEn: '${lesson3_4_translations.titleEn}',
          duration: '22 分鐘',
          durationEn: '${lesson3_4_translations.durationEn}',`
);

content = content.replace(
  /(description: '學習使用雙冒號語法控制提示詞中不同概念的重要性',)/,
  `$1
          descriptionEn: '${lesson3_4_translations.descriptionEn}',`
);

content = content.replace(
  /(imageAlt: '提示詞權重分配示例',)/,
  `$1
          imageAltEn: '${lesson3_4_translations.imageAltEn}',`
);

content = content.replace(
  /(transcript: `有時，你嘅提示詞包含幾個重要概念[\s\S]*?呢個技巧畀咗你更精細嘅控制權，去平衡提示詞中唔同元素之間嘅關係。權重分配特別適合用於複雜場景或者當你想強調某個特定元素時。`,)/,
  `$1
          transcriptEn: \`${lesson3_4_translations.transcriptEn}\`,`
);

content = content.replace(
  /(keyPoints: \[\s*':: 語法用於分割和控制概念重要性',\s*'可以分別處理不同的概念元素',\s*'數字權重控制元素的相對重要性',\s*'適合複雜場景和元素強調'\s*\],)/,
  `$1
          keyPointsEn: [
            '${lesson3_4_translations.keyPointsEn[0]}',
            '${lesson3_4_translations.keyPointsEn[1]}',
            '${lesson3_4_translations.keyPointsEn[2]}',
            '${lesson3_4_translations.keyPointsEn[3]}'
          ],`
);

// 應用第三章課程 3.5 翻譯
console.log('翻譯課程 3.5...');
content = content.replace(
  /(id: 15,\s*title: '3\.5 逆向工程：\/describe 指令由圖像變文字',\s*)duration: '25 分鐘',/,
  `$1titleEn: '${lesson3_5_translations.titleEn}',
          duration: '25 分鐘',
          durationEn: '${lesson3_5_translations.durationEn}',`
);

content = content.replace(
  /(description: '使用 \/describe 指令分析圖像，學習更好的提示詞表達方式',)/,
  `$1
          descriptionEn: '${lesson3_5_translations.descriptionEn}',`
);

content = content.replace(
  /(imageAlt: '\/describe 指令逆向分析示例',)/,
  `$1
          imageAltEn: '${lesson3_5_translations.imageAltEn}',`
);

content = content.replace(
  /(transcript: `當你喺網上見到一張好靚嘅 AI 圖[\s\S]*?建議將 \/describe 分析出嚟嘅提示詞作為學習參考，並嘗試套用到你自己嘅創作中，呢樣可以快速提升你嘅提示詞技巧。`,)/,
  `$1
          transcriptEn: \`${lesson3_5_translations.transcriptEn}\`,`
);

content = content.replace(
  /(keyPoints: \[\s*'\/describe 是圖像到文字的逆向工程',\s*'能夠學習成功作品的表達方式',\s*'快速擴展提示詞詞彙庫',\s*'是理解 AI 視覺語言的重要工具'\s*\],)/,
  `$1
          keyPointsEn: [
            '${lesson3_5_translations.keyPointsEn[0]}',
            '${lesson3_5_translations.keyPointsEn[1]}',
            '${lesson3_5_translations.keyPointsEn[2]}',
            '${lesson3_5_translations.keyPointsEn[3]}'
          ],`
);

// 第三章時長翻譯
content = content.replace(
  /(duration: '110 分鐘',\s*lessons:)/,
  `duration: '110 分鐘',
      durationEn: '110 minutes',
      lessons:`
);

// 寫入更新後的檔案
fs.writeFileSync(filePath, content, 'utf8');
console.log('第三章翻譯完成！'); 