// Midjourney Course Quiz Update Script
// This script contains all the updated quiz data for the 7 chapters

const midjourneyQuizUpdates = {
  chapter1: {
    quiz: {
      title: '第一章測驗：Midjourney 基礎概念與準備',
      titleEn: 'Chapter 1 Quiz: Midjourney Basic Concepts and Preparation',
      description: '測試您對 Midjourney 基礎概念和準備工作的理解',
      descriptionEn: 'Test your understanding of Midjourney basic concepts and preparation',
      timeLimit: 15,
      passingScore: 80,
      questions: [
        {
          id: 1,
          question: 'Midjourney 的主要目的是什麼？',
          questionEn: 'What is the main purpose of Midjourney?',
          options: [
            '創建文本到圖像的人工智能生成器',
            '生成文本描述',
            '創建動畫視頻',
            '開發自駕技術'
          ],
          optionsEn: [
            'Create text-to-image artificial intelligence generator',
            'Generate text descriptions',
            'Create animated videos',
            'Develop autonomous driving technology'
          ],
          correctAnswer: 0,
          explanation: 'Midjourney 是一個頂尖的「文本到圖像」（text-to-image）人工智能生成器，專門將文字描述轉化為高質素的圖像。',
          explanationEn: 'Midjourney is a leading "text-to-image" artificial intelligence generator that specialises in transforming text descriptions into high-quality images.'
        },
        {
          id: 2,
          question: '使用 Midjourney，AI 主要扮演什麼角色？',
          questionEn: 'When using Midjourney, what role does AI primarily play?',
          options: [
            '完全自主創作',
            '基於用戶指示生成圖像',
            '僅限於改變顏色和光線',
            '幫助創建音樂'
          ],
          optionsEn: [
            'Completely autonomous creation',
            'Generate images based on user instructions',
            'Limited to changing colours and lighting only',
            'Help create music'
          ],
          correctAnswer: 1,
          explanation: 'AI 主要根據用戶提供的文字提示詞（Prompt）來生成圖像，扮演協作夥伴的角色。',
          explanationEn: 'AI primarily generates images based on text prompts provided by users, playing the role of a collaborative partner.'
        },
        {
          id: 3,
          question: '在使用 Midjourney 創作時，最初需要哪個平台來進行操作？',
          questionEn: 'When creating with Midjourney, which platform is initially needed for operation?',
          options: [
            '官方網站',
            'Discord',
            'Zoom',
            '微信'
          ],
          optionsEn: [
            'Official website',
            'Discord',
            'Zoom',
            'WeChat'
          ],
          correctAnswer: 1,
          explanation: 'Discord 是 Midjourney 最初和最重要的操作平台，雖然現在也有官方網站，但 Discord 仍是核心平台。',
          explanationEn: 'Discord is the original and most important operational platform for Midjourney, and whilst there is now an official website, Discord remains the core platform.'
        },
        {
          id: 4,
          question: 'Midjourney 的提示詞結構包括哪些要素？',
          questionEn: 'What elements does Midjourney\'s prompt structure include?',
          options: [
            '主體、媒介、光線、環境和風格',
            '只有圖像大小',
            '顏色和背景',
            '動畫效果'
          ],
          optionsEn: [
            'Subject, medium, lighting, environment and style',
            'Only image size',
            'Colour and background',
            'Animation effects'
          ],
          correctAnswer: 0,
          explanation: '有效的提示詞結構包括主體（Subject）、媒介（Medium）、光線（Lighting）、環境（Environment）和風格（Style）等核心元素。',
          explanationEn: 'Effective prompt structure includes core elements such as Subject, Medium, Lighting, Environment and Style.'
        },
        {
          id: 5,
          question: '在創作過程中，為了達到最佳創作體驗，最理想的是在哪裡進行創作？',
          questionEn: 'For the best creative experience during the creation process, where is it ideal to create?',
          options: [
            '公開社群頻道',
            '私人 Discord 伺服器',
            '輸入框',
            '沒有任何偏好，任何地方都可以'
          ],
          optionsEn: [
            'Public community channels',
            'Private Discord server',
            'Input box',
            'No preference, anywhere is fine'
          ],
          correctAnswer: 1,
          explanation: '私人 Discord 伺服器提供安靜、專注的創作環境，避免公共頻道的混亂和干擾，能顯著改善學習體驗。',
          explanationEn: 'Private Discord servers provide a quiet, focused creative environment, avoiding the chaos and distractions of public channels, which can significantly improve the learning experience.'
        },
        {
          id: 6,
          question: 'Midjourney 的免費試用是否仍然提供？',
          questionEn: 'Does Midjourney still offer free trials?',
          options: [
            '提供',
            '不提供'
          ],
          optionsEn: [
            'Yes',
            'No'
          ],
          correctAnswer: 1,
          explanation: 'Midjourney 目前已經不再提供常規的免費試用，除了在極少數的推廣活動期間。',
          explanationEn: 'Midjourney no longer offers regular free trials, except during very rare promotional periods.'
        },
        {
          id: 7,
          question: 'Midjourney 的網站界面有什麼顯著特點？',
          questionEn: 'What are the notable features of Midjourney\'s website interface?',
          options: [
            '它完全依賴 Discord',
            '它提供了更加用戶友好和直觀的操作界面',
            '它僅限於用戶查看和下載作品',
            '它只支持基礎功能，不支持參數設置'
          ],
          optionsEn: [
            'It relies completely on Discord',
            'It provides a more user-friendly and intuitive interface',
            'It is limited to viewing and downloading works only',
            'It only supports basic functions, not parameter settings'
          ],
          correctAnswer: 1,
          explanation: 'Midjourney 網站提供了比 Discord 更加直觀和用戶友好的體驗，整合了各種參數設定和作品整理工具。',
          explanationEn: 'The Midjourney website provides a more intuitive and user-friendly experience than Discord, integrating various parameter settings and artwork organisation tools.'
        }
      ]
    }
  },

  chapter2: {
    quiz: {
      title: '第二章測驗：首次接觸：你的第一張 AI 圖像',
      titleEn: 'Chapter 2 Quiz: First Encounter: Your First AI Image',
      description: '測試您對 Midjourney 基本操作流程的掌握',
      descriptionEn: 'Test your mastery of Midjourney basic operational procedures',
      timeLimit: 12,
      passingScore: 80,
      questions: [
        {
          id: 1,
          question: '在開始使用 Midjourney 時，使用者的主要操作命令是什麼？',
          questionEn: 'When starting to use Midjourney, what is the user\'s main operating command?',
          options: [
            '/draw',
            '/imagine',
            '/create',
            '/paint'
          ],
          optionsEn: [
            '/draw',
            '/imagine',
            '/create',
            '/paint'
          ],
          correctAnswer: 1,
          explanation: '/imagine 是 Midjourney 的核心指令，用於啟動圖像生成過程。',
          explanationEn: '/imagine is Midjourney\'s core command, used to initiate the image generation process.'
        },
        {
          id: 2,
          question: '使用 /imagine 指令時，用戶需要提供什麼？',
          questionEn: 'When using the /imagine command, what do users need to provide?',
          options: [
            '圖像樣式',
            '音樂描述',
            '文字提示詞',
            '圖像連結'
          ],
          optionsEn: [
            'Image style',
            'Music description',
            'Text prompts',
            'Image links'
          ],
          correctAnswer: 2,
          explanation: '用戶需要在 /imagine 指令後提供詳細的文字提示詞（Prompt）來描述想要生成的圖像。',
          explanationEn: 'Users need to provide detailed text prompts after the /imagine command to describe the image they want to generate.'
        },
        {
          id: 3,
          question: '在 Midjourney 中，生成的圖像通常以什麼形式呈現？',
          questionEn: 'In Midjourney, in what form are generated images typically presented?',
          options: [
            '單張圖像',
            '2x2 圖像網格',
            '動畫短片',
            '文字描述'
          ],
          optionsEn: [
            'Single image',
            '2x2 image grid',
            'Animated short films',
            'Text descriptions'
          ],
          correctAnswer: 1,
          explanation: 'Midjourney 會生成一個 2x2 的圖像網格，包含四個不同的變化版本供用戶選擇。',
          explanationEn: 'Midjourney generates a 2x2 image grid containing four different variations for users to choose from.'
        },
        {
          id: 4,
          question: '使用者在 Midjourney 創作時最關鍵的角色是什麼？',
          questionEn: 'What is the most critical role of users when creating with Midjourney?',
          options: [
            '主導圖像生成的編輯',
            '提供文字描述的導演或概念藝術家',
            '編寫代碼的程式員',
            '圖像後製編輯師'
          ],
          optionsEn: [
            'Editor directing image generation',
            'Director or concept artist providing text descriptions',
            'Programmer writing code',
            'Image post-production editor'
          ],
          correctAnswer: 1,
          explanation: '用戶扮演導演或概念藝術家的角色，用語言指導 AI 畫家創作，這是一種人機協作的創作模式。',
          explanationEn: 'Users play the role of director or concept artist, using language to guide AI painters in creation, which is a human-machine collaborative creative model.'
        },
        {
          id: 5,
          question: '提供簡單的提示詞，例如 "a cat"，會產生什麼結果？',
          questionEn: 'What results would simple prompts like "a cat" produce?',
          options: [
            '隨機的草圖',
            '精確的圖像',
            '帶有豐富背景的圖像',
            '空白畫布'
          ],
          optionsEn: [
            'Random sketches',
            'Precise images',
            'Images with rich backgrounds',
            'Blank canvas'
          ],
          correctAnswer: 0,
          explanation: '簡單的提示詞會產生較為隨機和基礎的結果，缺乏具體的風格和細節指導。',
          explanationEn: 'Simple prompts produce relatively random and basic results, lacking specific style and detail guidance.'
        },
        {
          id: 6,
          question: '在 Midjourney 中，當圖像生成完成後，用戶會看到什麼？',
          questionEn: 'In Midjourney, what do users see when image generation is complete?',
          options: [
            '生成的單張圖像',
            '隨機結果的列表',
            '2x2 圖像網格，顯示四個不同的草圖',
            '文字描述'
          ],
          optionsEn: [
            'A single generated image',
            'A list of random results',
            '2x2 image grid showing four different drafts',
            'Text descriptions'
          ],
          correctAnswer: 2,
          explanation: '生成完成後會顯示包含四個不同變化版本的 2x2 圖像網格，讓用戶選擇喜歡的版本進行進一步處理。',
          explanationEn: 'Upon completion, a 2x2 image grid containing four different variations is displayed, allowing users to select their preferred version for further processing.'
        },
        {
          id: 7,
          question: '初學者如何提升他們使用 Midjourney 的創作經驗？',
          questionEn: 'How can beginners improve their Midjourney creative experience?',
          options: [
            '使用預設的參數',
            '深入探索不同的參數和指令',
            '只使用單一的提示詞',
            '盡量避免使用 Discord'
          ],
          optionsEn: [
            'Use default parameters',
            'Explore different parameters and commands in depth',
            'Use only single prompts',
            'Avoid using Discord as much as possible'
          ],
          correctAnswer: 1,
          explanation: '初學者應該積極探索不同的參數和指令，通過實驗和學習來提升創作技巧和效果。',
          explanationEn: 'Beginners should actively explore different parameters and commands, improving their creative skills and effects through experimentation and learning.'
        }
      ]
    }
  },

  chapter3: {
    quiz: {
      title: '第三章測驗：提示詞工程學：與 AI 溝通的藝術',
      titleEn: 'Chapter 3 Quiz: Prompt Engineering: The Art of Communicating with AI',
      description: '測試您對提示詞構建和進階語法的掌握',
      descriptionEn: 'Test your mastery of prompt construction and advanced syntax',
      timeLimit: 15,
      passingScore: 80,
      questions: [
        {
          id: 1,
          question: '在 Midjourney 中，提示詞的結構包括哪些要素？',
          questionEn: 'In Midjourney, what elements does the prompt structure include?',
          options: [
            '顏色和圖像樣式',
            '主體、媒介、光線、環境和風格',
            '提示語和背景',
            '只有物體形狀和顏色'
          ],
          optionsEn: [
            'Colour and image style',
            'Subject, medium, lighting, environment and style',
            'Prompts and background',
            'Only object shapes and colours'
          ],
          correctAnswer: 1,
          explanation: '有效的提示詞結構包括主體（Subject）、媒介（Medium）、光線（Lighting）、環境（Environment）和風格（Style）等核心元素。',
          explanationEn: 'Effective prompt structure includes core elements such as Subject, Medium, Lighting, Environment and Style.'
        },
        {
          id: 2,
          question: '若想強調某些提示詞的重要性，應使用哪種語法？',
          questionEn: 'To emphasise the importance of certain prompts, which syntax should be used?',
          options: [
            '引號',
            '多重提示詞 (Multi-Prompts) 和權重分配 (::)',
            '圖像連結',
            '圓括號'
          ],
          optionsEn: [
            'Quotation marks',
            'Multi-Prompts and weight allocation (::)',
            'Image links',
            'Parentheses'
          ],
          correctAnswer: 1,
          explanation: '使用多重提示詞語法和權重分配符號（::）可以控制不同元素在生成圖像中的重要程度。',
          explanationEn: 'Using multi-prompt syntax and weight allocation symbols (::) can control the importance of different elements in generated images.'
        },
        {
          id: 3,
          question: '在撰寫提示詞時，應包括哪些關鍵元素？',
          questionEn: 'When writing prompts, what key elements should be included?',
          options: [
            '圖像的顏色和尺寸',
            '角色、環境、光線及構圖',
            '圖像的風格和音效',
            '描述的情感和背景故事'
          ],
          optionsEn: [
            'Image colour and size',
            'Characters, environment, lighting and composition',
            'Image style and sound effects',
            'Descriptive emotions and background story'
          ],
          correctAnswer: 1,
          explanation: '有效的提示詞應該包括角色（主體）、環境、光線和構圖等關鍵元素，以獲得更精確的生成結果。',
          explanationEn: 'Effective prompts should include key elements such as characters (subjects), environment, lighting and composition to achieve more precise generation results.'
        },
        {
          id: 4,
          question: '在撰寫 Midjourney 提示詞時，最重要的是什麼？',
          questionEn: 'When writing Midjourney prompts, what is most important?',
          options: [
            '文字簡單明瞭',
            '提供詳細的圖像描述',
            '讓 AI 自由創作',
            '只使用單一形容詞'
          ],
          optionsEn: [
            'Simple and clear text',
            'Provide detailed image descriptions',
            'Let AI create freely',
            'Use only single adjectives'
          ],
          correctAnswer: 1,
          explanation: '提供詳細和具體的圖像描述是獲得高質量生成結果的關鍵，模糊的提示詞會產生隨機的結果。',
          explanationEn: 'Providing detailed and specific image descriptions is key to achieving high-quality generation results, whilst vague prompts will produce random results.'
        },
        {
          id: 5,
          question: '使用 /blend 指令時，可以混合多少張圖片？',
          questionEn: 'When using the /blend command, how many images can be mixed?',
          options: [
            '1 張',
            '2-5 張',
            '6-10 張',
            '1-3 張'
          ],
          optionsEn: [
            '1 image',
            '2-5 images',
            '6-10 images',
            '1-3 images'
          ],
          correctAnswer: 1,
          explanation: '/blend 指令允許混合 2 到 5 張圖片，創造出融合不同圖像特徵的新作品。',
          explanationEn: 'The /blend command allows mixing 2 to 5 images, creating new works that combine features from different images.'
        },
        {
          id: 6,
          question: '在使用提示詞時，如何加入圖片以改變圖像風格？',
          questionEn: 'When using prompts, how can images be added to change image style?',
          options: [
            '在提示詞中加入圖片的 URL',
            '上傳圖片至 Midjourney',
            '使用文字描述來替代圖片',
            '不可以加入圖片'
          ],
          optionsEn: [
            'Add image URLs to prompts',
            'Upload images to Midjourney',
            'Use text descriptions to replace images',
            'Cannot add images'
          ],
          correctAnswer: 0,
          explanation: '可以在提示詞中直接加入圖片的 URL 連結，讓 AI 參考該圖片的風格或元素進行創作。',
          explanationEn: 'You can directly add image URL links to prompts, allowing AI to reference the style or elements of that image for creation.'
        },
        {
          id: 7,
          question: '在 /imagine 中使用多重提示詞（Multi-Prompts）時，應用於兩個不同元素的效果是什麼？',
          questionEn: 'When using Multi-Prompts in /imagine applied to two different elements, what is the effect?',
          options: [
            '一個元素會被完全忽略',
            '兩個元素會被平等對待',
            '可以設定每個元素的權重，影響圖像生成',
            '隨機選擇一個元素進行生成'
          ],
          optionsEn: [
            'One element will be completely ignored',
            'Both elements will be treated equally',
            'You can set the weight of each element, affecting image generation',
            'Randomly select one element for generation'
          ],
          correctAnswer: 2,
          explanation: '多重提示詞允許為不同元素設定權重（如 element1::2 element2::1），控制它們在最終圖像中的影響程度。',
          explanationEn: 'Multi-prompts allow setting weights for different elements (e.g., element1::2 element2::1), controlling their influence in the final image.'
        }
      ]
    }
  },

  chapter4: {
    quiz: {
      title: '第四章測驗：參數的力量：精準控制圖像生成',
      titleEn: 'Chapter 4 Quiz: The Power of Parameters: Precision in Image Generation',
      description: '測試您對 Midjourney 各種參數的理解和應用',
      descriptionEn: 'Test your understanding and application of various Midjourney parameters',
      timeLimit: 12,
      passingScore: 80,
      questions: [
        {
          id: 1,
          question: '--ar 參數是用來設定什麼？',
          questionEn: 'What is the --ar parameter used to set?',
          options: [
            '圖像的顏色',
            '圖像的大小',
            '圖像的長寬比',
            '圖像的風格'
          ],
          optionsEn: [
            'Image colour',
            'Image size',
            'Image aspect ratio',
            'Image style'
          ],
          correctAnswer: 2,
          explanation: '--ar 參數用於設定圖像的長寬比（Aspect Ratio），如 --ar 16:9 表示寬螢幕比例。',
          explanationEn: 'The --ar parameter is used to set the aspect ratio of images, e.g., --ar 16:9 represents widescreen ratio.'
        },
        {
          id: 2,
          question: '若希望生成的圖像顯示更大範圍的內容，應使用什麼參數？',
          questionEn: 'To generate images that show a wider range of content, which parameter should be used?',
          options: [
            '--ar 1:1',
            '--ar 16:9',
            '--ar 9:16',
            '--ar 3:2'
          ],
          optionsEn: [
            '--ar 1:1',
            '--ar 16:9',
            '--ar 9:16',
            '--ar 3:2'
          ],
          correctAnswer: 1,
          explanation: '--ar 16:9 是寬螢幕比例，能顯示更大的水平範圍，適合風景或廣角場景。',
          explanationEn: '--ar 16:9 is a widescreen ratio that can display a wider horizontal range, suitable for landscapes or wide-angle scenes.'
        },
        {
          id: 3,
          question: '--stylize 參數用來控制什麼？',
          questionEn: 'What does the --stylize parameter control?',
          options: [
            '圖像的風格強度',
            '圖像的分辨率',
            '圖像的速度',
            '圖像的顏色飽和度'
          ],
          optionsEn: [
            'Image style intensity',
            'Image resolution',
            'Image speed',
            'Image colour saturation'
          ],
          correctAnswer: 0,
          explanation: '--stylize 參數控制 Midjourney 應用其預設美學風格的強度，數值範圍從 0 到 1000。',
          explanationEn: 'The --stylize parameter controls the intensity of Midjourney\'s default aesthetic style application, with values ranging from 0 to 1000.'
        },
        {
          id: 4,
          question: '若希望圖像顯得更具藝術感，應使用何種 --stylize 數值？',
          questionEn: 'To make images appear more artistic, what --stylize value should be used?',
          options: [
            '0-100',
            '100-500',
            '500-1000',
            '1000-2000'
          ],
          optionsEn: [
            '0-100',
            '100-500',
            '500-1000',
            '1000-2000'
          ],
          correctAnswer: 2,
          explanation: '較高的 --stylize 數值（500-1000）會讓圖像更具藝術感和風格化效果。',
          explanationEn: 'Higher --stylize values (500-1000) will make images more artistic and stylised.'
        },
        {
          id: 5,
          question: '在 --chaos 參數中，數值越高會怎樣影響圖像？',
          questionEn: 'In the --chaos parameter, how do higher values affect images?',
          options: [
            '圖像的構圖更加一致',
            '圖像風格變得更加一致',
            '圖像生成的多樣性增加',
            '圖像生成速度減慢'
          ],
          optionsEn: [
            'Image composition becomes more consistent',
            'Image style becomes more consistent',
            'Image generation diversity increases',
            'Image generation speed slows down'
          ],
          correctAnswer: 2,
          explanation: '--chaos 參數控制生成結果的變化程度，數值越高，四個初始圖像之間的差異越大。',
          explanationEn: 'The --chaos parameter controls the degree of variation in generation results; higher values create greater differences between the four initial images.'
        },
        {
          id: 6,
          question: '若想創造一個非常奇異的圖像，應使用什麼參數？',
          questionEn: 'To create a very bizarre image, what parameter should be used?',
          options: [
            '--weird 0',
            '--weird 1000',
            '--weird 500',
            '--weird 200'
          ],
          optionsEn: [
            '--weird 0',
            '--weird 1000',
            '--weird 500',
            '--weird 200'
          ],
          correctAnswer: 1,
          explanation: '--weird 參數的最高值 1000 會產生最奇異和非傳統的圖像效果。',
          explanationEn: 'The maximum value of 1000 for the --weird parameter produces the most bizarre and unconventional image effects.'
        },
        {
          id: 7,
          question: '若不希望圖像包含某些元素，可以使用哪個參數？',
          questionEn: 'To prevent images from containing certain elements, which parameter can be used?',
          options: [
            '--no',
            '--exclude',
            '--avoid',
            '--omit'
          ],
          optionsEn: [
            '--no',
            '--exclude',
            '--avoid',
            '--omit'
          ],
          correctAnswer: 0,
          explanation: '--no 參數用於排除特定元素，例如 --no cats 會避免在圖像中出現貓。',
          explanationEn: 'The --no parameter is used to exclude specific elements, e.g., --no cats will avoid cats appearing in images.'
        }
      ]
    }
  },

  chapter5: {
    quiz: {
      title: '第五章測驗：進階編輯與後製：完善你的作品',
      titleEn: 'Chapter 5 Quiz: Advanced Editing and Post-Processing: Refining Your Artwork',
      description: '測試您對進階編輯功能的掌握',
      descriptionEn: 'Test your mastery of advanced editing features',
      timeLimit: 15,
      passingScore: 80,
      questions: [
        {
          id: 1,
          question: '在 Midjourney 中，如何進行細微的圖像修改？',
          questionEn: 'In Midjourney, how do you make subtle image modifications?',
          options: [
            '使用 Vary Region 功能',
            '使用 Vary Strong 功能',
            '使用 Reroll 功能',
            '重新生成整個圖像'
          ],
          optionsEn: [
            'Use Vary Region function',
            'Use Vary Strong function',
            'Use Reroll function',
            'Regenerate the entire image'
          ],
          correctAnswer: 0,
          explanation: 'Vary Region 功能允許精確修改圖像的特定區域，而不影響整體構圖。',
          explanationEn: 'The Vary Region function allows precise modification of specific areas of an image without affecting the overall composition.'
        },
        {
          id: 2,
          question: '若要改變圖像的構圖，應選擇哪個功能？',
          questionEn: 'To change the composition of an image, which function should be chosen?',
          options: [
            'Vary Region',
            'Upscale',
            'Vary Strong',
            'Zoom Out'
          ],
          optionsEn: [
            'Vary Region',
            'Upscale',
            'Vary Strong',
            'Zoom Out'
          ],
          correctAnswer: 2,
          explanation: 'Vary Strong 功能會對圖像進行較大幅度的變更，包括構圖的改變。',
          explanationEn: 'The Vary Strong function makes significant changes to images, including composition alterations.'
        },
        {
          id: 3,
          question: '當你希望重新生成圖像的某個區域而不改動其他部分時，應使用哪個功能？',
          questionEn: 'When you want to regenerate a specific area of an image without changing other parts, which function should be used?',
          options: [
            'Vary Region',
            'Vary Strong',
            'Reroll',
            'Upscale'
          ],
          optionsEn: [
            'Vary Region',
            'Vary Strong',
            'Reroll',
            'Upscale'
          ],
          correctAnswer: 0,
          explanation: 'Vary Region 是專門用於重新生成圖像特定區域的功能，保持其他部分不變。',
          explanationEn: 'Vary Region is specifically designed to regenerate specific areas of an image whilst keeping other parts unchanged.'
        },
        {
          id: 4,
          question: '使用 Upscale 功能時，會對圖像做什麼處理？',
          questionEn: 'When using the Upscale function, what processing is done to the image?',
          options: [
            '降低圖像質量',
            '提高圖像的解析度',
            '改變圖像的風格',
            '增加圖像的對比度'
          ],
          optionsEn: [
            'Reduce image quality',
            'Increase image resolution',
            'Change image style',
            'Increase image contrast'
          ],
          correctAnswer: 1,
          explanation: 'Upscale 功能會提高選定圖像的解析度，讓圖像變得更清晰和更大尺寸。',
          explanationEn: 'The Upscale function increases the resolution of selected images, making them clearer and larger in size.'
        },
        {
          id: 5,
          question: '使用 Pan 和 Zoom Out 功能時，圖像會如何變化？',
          questionEn: 'When using Pan and Zoom Out functions, how do images change?',
          options: [
            '圖像將被縮小',
            '圖像將進行色彩變化',
            '圖像的範圍會增大，顯示更多內容',
            '圖像會完全重置'
          ],
          optionsEn: [
            'Images will be reduced in size',
            'Images will undergo colour changes',
            'Image scope will increase, showing more content',
            'Images will be completely reset'
          ],
          correctAnswer: 2,
          explanation: 'Pan 和 Zoom Out 功能會擴展圖像的視野範圍，在現有圖像周圍生成更多內容。',
          explanationEn: 'Pan and Zoom Out functions expand the field of view of images, generating more content around existing images.'
        }
      ]
    }
  },

  chapter6: {
    quiz: {
      title: '第六章測驗：進階編輯與後製：完善你的作品',
      titleEn: 'Chapter 6 Quiz: Advanced Editing and Post-Processing: Refining Your Artwork',
      description: '測試您對進階編輯技巧的深入理解',
      descriptionEn: 'Test your in-depth understanding of advanced editing techniques',
      timeLimit: 15,
      passingScore: 80,
      questions: [
        {
          id: 1,
          question: '在 Midjourney 中，如何精細調整圖像的一部分而不改動整體？',
          questionEn: 'In Midjourney, how do you make fine adjustments to part of an image without changing the whole?',
          options: [
            '使用 Vary Region 功能',
            '使用 Vary Strong 功能',
            '使用 Upscale 功能',
            '使用 Reroll 功能'
          ],
          optionsEn: [
            'Use Vary Region function',
            'Use Vary Strong function',
            'Use Upscale function',
            'Use Reroll function'
          ],
          correctAnswer: 0,
          explanation: 'Vary Region 功能是精細調整圖像特定部分的最佳工具，可以選擇性地修改特定區域。',
          explanationEn: 'The Vary Region function is the best tool for fine-tuning specific parts of an image, allowing selective modification of particular areas.'
        },
        {
          id: 2,
          question: '當你想進行較大範圍的變更，應使用哪個功能？',
          questionEn: 'When you want to make larger-scale changes, which function should be used?',
          options: [
            'Vary Subtle',
            'Vary Strong',
            'Vary Region',
            'Zoom Out'
          ],
          optionsEn: [
            'Vary Subtle',
            'Vary Strong',
            'Vary Region',
            'Zoom Out'
          ],
          correctAnswer: 1,
          explanation: 'Vary Strong 功能會對圖像進行較大幅度的變更，適用於需要顯著改變的情況。',
          explanationEn: 'The Vary Strong function makes significant changes to images, suitable for situations requiring substantial alterations.'
        },
        {
          id: 3,
          question: 'Vary Region 主要的優勢是什麼？',
          questionEn: 'What is the main advantage of Vary Region?',
          options: [
            '重新生成整張圖像',
            '精確修改圖像的特定區域',
            '完全改變圖像的風格',
            '降低圖像的解析度'
          ],
          optionsEn: [
            'Regenerate the entire image',
            'Precisely modify specific areas of the image',
            'Completely change the image style',
            'Reduce image resolution'
          ],
          correctAnswer: 1,
          explanation: 'Vary Region 的主要優勢是能夠精確修改圖像的特定區域，同時保持其他部分不變。',
          explanationEn: 'The main advantage of Vary Region is its ability to precisely modify specific areas of an image whilst keeping other parts unchanged.'
        },
        {
          id: 4,
          question: '若想將圖像的解析度提高，應使用哪個功能？',
          questionEn: 'To increase image resolution, which function should be used?',
          options: [
            'Vary Strong',
            'Upscale',
            'Reroll',
            'Vary Region'
          ],
          optionsEn: [
            'Vary Strong',
            'Upscale',
            'Reroll',
            'Vary Region'
          ],
          correctAnswer: 1,
          explanation: 'Upscale 功能專門用於提高圖像的解析度，讓圖像變得更清晰和更大。',
          explanationEn: 'The Upscale function is specifically designed to increase image resolution, making images clearer and larger.'
        },
        {
          id: 5,
          question: '在圖像的背景或周圍擴展畫布時，使用哪個功能？',
          questionEn: 'When expanding the canvas around the background or surroundings of an image, which function is used?',
          options: [
            'Zoom In',
            'Zoom Out',
            'Pan',
            'Vary Region'
          ],
          optionsEn: [
            'Zoom In',
            'Zoom Out',
            'Pan',
            'Vary Region'
          ],
          correctAnswer: 2,
          explanation: 'Pan 功能用於在圖像的各個方向擴展畫布，生成周圍的新內容。',
          explanationEn: 'The Pan function is used to expand the canvas in various directions around an image, generating new surrounding content.'
        },
        {
          id: 6,
          question: '若希望創建一個較為怪異和奇異的圖像，應使用哪個參數？',
          questionEn: 'To create a rather bizarre and strange image, which parameter should be used?',
          options: [
            '--stylize',
            '--chaos',
            '--weird',
            '--ar'
          ],
          optionsEn: [
            '--stylize',
            '--chaos',
            '--weird',
            '--ar'
          ],
          correctAnswer: 2,
          explanation: '--weird 參數專門用於創建奇異和非傳統的圖像效果，數值越高效果越明顯。',
          explanationEn: 'The --weird parameter is specifically designed to create bizarre and unconventional image effects, with higher values producing more pronounced results.'
        },
        {
          id: 7,
          question: '當想讓 Midjourney 在圖像的某一部分進行微調時，應該使用哪個選項？',
          questionEn: 'When wanting Midjourney to make fine adjustments to a specific part of an image, which option should be used?',
          options: [
            'Vary Region',
            'Vary Strong',
            'Vary Subtle',
            'Upscale'
          ],
          optionsEn: [
            'Vary Region',
            'Vary Strong',
            'Vary Subtle',
            'Upscale'
          ],
          correctAnswer: 0,
          explanation: 'Vary Region 是專門用於對圖像特定部分進行微調的功能，提供最精確的區域控制。',
          explanationEn: 'Vary Region is specifically designed for fine-tuning specific parts of images, providing the most precise regional control.'
        }
      ]
    }
  },

  chapter7: {
    quiz: {
      title: '第七章測驗：工作流程與資源管理',
      titleEn: 'Chapter 7 Quiz: Workflow and Resource Management',
      description: '測試您對 Midjourney 工作流程和資源管理的掌握',
      descriptionEn: 'Test your mastery of Midjourney workflow and resource management',
      timeLimit: 15,
      passingScore: 80,
      questions: [
        {
          id: 1,
          question: '在 Midjourney 中，如何查詢帳戶的 GPU 使用狀況？',
          questionEn: 'In Midjourney, how do you query account GPU usage status?',
          options: [
            '使用 /info 指令',
            '在設置中查看',
            '在 Discord 頻道中查詢',
            '直接向 Midjourney 支持請求'
          ],
          optionsEn: [
            'Use /info command',
            'Check in settings',
            'Query in Discord channels',
            'Request directly from Midjourney support'
          ],
          correctAnswer: 0,
          explanation: '/info 指令是查詢帳戶狀態、GPU 使用情況和訂閱資訊的主要方式。',
          explanationEn: 'The /info command is the primary way to query account status, GPU usage, and subscription information.'
        },
        {
          id: 2,
          question: '當使用者在 Fast Mode 和 Relax Mode 之間切換時，兩者的主要區別是什麼？',
          questionEn: 'When users switch between Fast Mode and Relax Mode, what is the main difference?',
          options: [
            'Fast Mode 提供無限制的生成時間',
            'Relax Mode 不消耗 GPU 時間，但速度較慢',
            'Relax Mode 提供更多的生成選項',
            'Fast Mode 只能用於圖像風格設定'
          ],
          optionsEn: [
            'Fast Mode provides unlimited generation time',
            'Relax Mode doesn\'t consume GPU time but is slower',
            'Relax Mode provides more generation options',
            'Fast Mode can only be used for image style settings'
          ],
          correctAnswer: 1,
          explanation: 'Relax Mode 不消耗付費的 Fast GPU 時間，但生成速度較慢，適合非急需的創作。',
          explanationEn: 'Relax Mode doesn\'t consume paid Fast GPU time but has slower generation speeds, suitable for non-urgent creations.'
        },
        {
          id: 3,
          question: '要查看剩餘的 GPU 時間和帳戶狀態，應該使用哪個指令？',
          questionEn: 'To view remaining GPU time and account status, which command should be used?',
          options: [
            '/status',
            '/check',
            '/info',
            '/account'
          ],
          optionsEn: [
            '/status',
            '/check',
            '/info',
            '/account'
          ],
          correctAnswer: 2,
          explanation: '/info 指令提供完整的帳戶資訊，包括剩餘 GPU 時間、訂閱狀態和使用統計。',
          explanationEn: 'The /info command provides complete account information, including remaining GPU time, subscription status, and usage statistics.'
        },
        {
          id: 4,
          question: '若想快速生成多張圖像，應使用哪個選項來提升效率？',
          questionEn: 'To quickly generate multiple images, which option should be used to improve efficiency?',
          options: [
            'Zoom Out',
            'Batch Actions',
            'Vary Region',
            'Upscale'
          ],
          optionsEn: [
            'Zoom Out',
            'Batch Actions',
            'Vary Region',
            'Upscale'
          ],
          correctAnswer: 1,
          explanation: 'Batch Actions 功能允許對多張圖像同時進行操作，大幅提升工作效率。',
          explanationEn: 'Batch Actions functionality allows simultaneous operations on multiple images, significantly improving work efficiency.'
        },
        {
          id: 5,
          question: '在 Midjourney 網站的圖庫中，如何更高效地組織和管理作品？',
          questionEn: 'In Midjourney website\'s gallery, how can artworks be organised and managed more efficiently?',
          options: [
            '使用資料夾功能（Folders）',
            '用顏色標籤來標註圖像',
            '按照生成時間進行排序',
            '直接刪除不需要的圖像'
          ],
          optionsEn: [
            'Use folder functionality (Folders)',
            'Use colour labels to tag images',
            'Sort by generation time',
            'Directly delete unwanted images'
          ],
          correctAnswer: 0,
          explanation: '資料夾功能是組織和管理大量作品的最有效方式，可以按專案或主題分類。',
          explanationEn: 'Folder functionality is the most effective way to organise and manage large amounts of artwork, allowing categorisation by project or theme.'
        },
        {
          id: 6,
          question: '若想同時管理大量的圖像並進行批量處理，應該使用哪個功能？',
          questionEn: 'To simultaneously manage large numbers of images and perform batch processing, which function should be used?',
          options: [
            'Reroll',
            'Batch Actions',
            'Upscale',
            'Vary Region'
          ],
          optionsEn: [
            'Reroll',
            'Batch Actions',
            'Upscale',
            'Vary Region'
          ],
          correctAnswer: 1,
          explanation: 'Batch Actions 是專門設計用於大量圖像的批量處理功能，可以同時執行多種操作。',
          explanationEn: 'Batch Actions is specifically designed for batch processing of large numbers of images, allowing multiple operations to be performed simultaneously.'
        },
        {
          id: 7,
          question: '若要查看或整理過去的創作，哪個功能會最有幫助？',
          questionEn: 'To view or organise past creations, which function would be most helpful?',
          options: [
            'Search and Filter',
            'Download All',
            'Add to Favorites',
            'Personalized Style'
          ],
          optionsEn: [
            'Search and Filter',
            'Download All',
            'Add to Favourites',
            'Personalised Style'
          ],
          correctAnswer: 0,
          explanation: 'Search and Filter 功能提供強大的搜索和篩選能力，幫助快速找到和整理過去的創作。',
          explanationEn: 'Search and Filter functionality provides powerful search and filtering capabilities, helping to quickly find and organise past creations.'
        }
      ]
    }
  }
};

console.log('Quiz data prepared for all 7 chapters');
console.log('Total questions:', Object.values(midjourneyQuizUpdates).reduce((total, chapter) => total + chapter.quiz.questions.length, 0));

module.exports = midjourneyQuizUpdates; 