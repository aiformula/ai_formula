/**
 * Automated UK English Translation Script for ChatGPT Course Data
 * This script adds comprehensive UK English translations to all course content
 */

const fs = require('fs');
const path = require('path');

// Course module translations
const moduleTranslations = {
  1: {
    titleEn: "Chapter 1: Deconstructing ChatGPT — Deep Dive into Core Technology",
    descriptionEn: "This chapter aims to establish a solid theoretical foundation for learners, not only explaining what ChatGPT 'is', but also exploring in depth 'why' it is so powerful."
  },
  2: {
    titleEn: "Chapter 2: Initial Exploration — Account Setup and Interface Navigation",
    descriptionEn: "Starting with the most practical operations, guiding learners through the complete process from account registration to familiarising themselves with all ChatGPT interface elements."
  },
  3: {
    titleEn: "Chapter 3: Mastering Communication — The Art of Effective Prompting",
    descriptionEn: "Master the core skills of communicating with AI, learning how to write clear, precise, and effective prompts to obtain high-quality responses."
  },
  4: {
    titleEn: "Chapter 4: Advanced Applications — Professional Techniques and Custom GPTs",
    descriptionEn: "Explore advanced ChatGPT features, including custom GPT creation, plugin usage, and professional application scenarios."
  },
  5: {
    titleEn: "Chapter 5: Practical Automation — Workflow Integration and Business Applications",
    descriptionEn: "Learn how to integrate ChatGPT into actual work scenarios, building efficient AI-assisted workflows to enhance productivity."
  },
  6: {
    titleEn: "Chapter 6: Responsible Usage — Limitations, Ethics and Future Developments",
    descriptionEn: "Understand AI limitations, learn responsible usage practices, and explore future developments in artificial intelligence."
  }
};

// Lesson translations for Chapter 1
const chapter1Lessons = {
  1: {
    titleEn: "1.1 What is a Large Language Model (LLM)?",
    descriptionEn: "Gain an in-depth understanding of the core concepts, working principles, and technical characteristics of large language models, laying a solid foundation for subsequent learning.",
    durationEn: "15 minutes",
    imageAltEn: "Large Language Model Concept Illustration",
    transcriptEn: `A Large Language Model (LLM) is a cutting-edge artificial intelligence (AI) programme that has been trained on massive text datasets, thus learning to understand, generate, summarise, translate human language, and execute other complex text-related tasks. Fundamentally, an LLM is a deep learning model that doesn't truly "think" in the human sense, but rather predicts the most likely next word in a text sequence based on extremely complex probability calculations.

The term "large" manifests primarily in two dimensions: firstly, the scale of training datasets, which often originate from extensive internet text, such as the Common Crawl database containing billions of web pages and Wikipedia with tens of millions of pages; secondly, the complexity of the model itself, namely the number of "parameters" it contains—these parameters can be viewed as internal variables adjusted during the learning process, numbering in the hundreds of billions or even more.

The most significant difference between LLMs and traditional AI lies in their remarkable versatility and flexibility. Traditional machine learning models are typically designed for single, specific tasks, such as sentiment analysis or spam filtering. However, an LLM can leverage its extensive "knowledge" to perform various disparate tasks, from answering general knowledge questions and writing professional copy to generating computer code—all accomplished by the same foundational model.

In the hierarchy of artificial intelligence technology, LLMs sit at the pinnacle of the pyramid. They are built upon the foundation of machine learning, represent a branch of deep learning, and utilise neural networks as their computational architecture. As a highly specialised subset of generative AI, LLMs focus on understanding, predicting, and generating human-like text.`,
    keyPointsEn: [
      "LLMs are deep learning models trained on massive text data, predicting the next word through probability calculations",
      "\"Large\" manifests in training data scale (such as Common Crawl, Wikipedia) and model parameter count (reaching hundreds of billions)",
      "LLMs possess remarkable versatility, with one model capable of executing multiple different tasks, unlike traditional AI that performs single tasks",
      "LLMs sit at the pinnacle of AI technology, representing a highly specialised subset of generative AI"
    ]
  },
  2: {
    titleEn: "1.2 Transformer Architecture: Neural Networks and Self-Attention Mechanism",
    descriptionEn: "Explore the foundational neural networks for LLM construction and the revolutionary core innovation of Transformer architecture: the self-attention mechanism.",
    durationEn: "18 minutes",
    transcriptEn: `The building blocks of LLMs are artificial neural networks, computational models that mimic the way neurons in biological brains interconnect and transmit signals. They consist of multiple layers of nodes, including input layers, output layers, and one or more "hidden layers" situated between them.

However, the true technological breakthrough that enabled LLMs to achieve qualitative leaps in capability was the Transformer architecture, proposed in 2017. Before Transformer emerged, mainstream sequence processing models (such as Recurrent Neural Networks, RNNs) had to process text sequentially, word by word, which severely limited training speed and the ability to handle long texts. The Transformer architecture introduced parallel processing mechanisms, enabling simultaneous analysis of entire input sequences, thus leveraging the powerful parallel computing capabilities of modern GPUs and dramatically reducing training time.

The core of the Transformer architecture is its innovative "Self-Attention Mechanism." This mechanism enables the model, when processing a particular word in a sequence, to weigh the importance of all other words in the input text to that word, assigning different "attention" weights. This allows the model to capture complex, long-distance dependencies between words, thereby achieving deeper contextual understanding. For example, in the sentence "The cat chased the mouse because it was hungry," the self-attention mechanism helps the model accurately link the pronoun "it" with the subject "cat" rather than "mouse."

To enable neural networks to process language, LLMs employ "Word Embeddings" technology to represent words. Traditional machine learning methods might use isolated numbers to represent each word, unable to express semantic relationships between words. Word embeddings map each word to a high-dimensional vector space. In this space, words with similar meanings or usage (such as "king" and "queen," or "walk" and "run") are positioned closer together in vector distance. This representation method enables the model to capture subtle semantic and syntactic relationships between words, establishing a mathematical foundation for understanding complex language.

This paradigm shift from sequential to parallel processing is the fundamental reason for the sudden acceleration in AI development in recent years. It made training ultra-large-scale models with hundreds of billions of parameters on massive datasets possible, ultimately giving birth to the powerful ChatGPT.`,
    keyPointsEn: [
      "Neural Networks: Computational models mimicking brain neurons",
      "Transformer Architecture: Revolutionary deep learning architecture from 2017",
      "Self-Attention Mechanism: Core technology for capturing long-distance dependencies in text",
      "Parallel Processing: Dramatically improved training efficiency compared to RNNs"
    ]
  },
  3: {
    titleEn: "1.3 The Meaning of GPT: Generative, Pre-trained, Transformer",
    descriptionEn: "In-depth analysis of the meaning of GPT's three key terms, understanding its architecture, training methods, and core functions.",
    durationEn: "16 minutes",
    transcriptEn: `ChatGPT's core technology can be precisely explained through its full name GPT (Generative Pre-trained Transformer). These three words reveal its architecture, training methodology, and core functionality.

Transformer: This specifies its underlying technical architecture—the Transformer model based on self-attention mechanisms, as detailed in the previous section.

Pre-trained: This represents the first and most crucial stage of GPT model training. During this phase, the model undergoes so-called "unsupervised learning," processing massive amounts of unlabelled text data from the internet, books, articles, and other sources. Its core learning task is remarkably simple: given the context of a text passage, predict the next most likely word or character to appear. Through repeating this process across trillions of sentences, the model not only learns grammatical rules and vocabulary knowledge but also internalises vast amounts of world knowledge, semantic relationships, and even preliminary reasoning patterns. This stage establishes a broad knowledge foundation for the model.

Generative: This word describes the model's most fundamental capability—creating (generating) entirely new, original content. This contrasts with another class of AI called "Discriminative Models." Discriminative models (such as BERT for text classification) primarily perform classification or judgement tasks, such as determining whether an email is spam. Generative models, however, can create from scratch, generating new sentences, paragraphs, code, and even images and music.

After completing large-scale "pre-training," models typically enter a second training phase—"Fine-tuning." During this stage, developers use much smaller but task-specific labelled datasets to further train the model. More importantly, OpenAI introduced "Reinforcement Learning from Human Feedback" (RLHF) technology. In this process, human trainers rate and rank different model responses, and the model adjusts its behaviour based on this feedback to make its outputs more aligned with human expectations, such as following instructions more accurately and reducing harmful or biased content.`,
    keyPointsEn: [
      "Transformer: Underlying technical architecture based on self-attention mechanisms",
      "Pre-trained: Unsupervised learning through massive unlabelled text data",
      "Generative: Capability to create entirely new original content, distinct from discriminative models",
      "RLHF: Reinforcement Learning from Human Feedback, making model outputs more aligned with human expectations"
    ]
  },
  4: {
    titleEn: "1.4 From GPT-1 to GPT-4o: The Evolution Journey of Models",
    descriptionEn: "Trace the development history of the GPT model series, understanding the technological breakthroughs and capability improvements of each generation.",
    durationEn: "20 minutes",
    transcriptEn: `The development trajectory of GPT models clearly demonstrates OpenAI's technological evolution path, with each generation achieving significant leaps in scale and capability. This path is not merely a natural extension of technology but also reflects OpenAI's productisation strategy: first building a knowledgeable "brain," then teaching it to "understand instructions," and finally endowing it with "senses" for multidimensional interaction with the world.

GPT-1 (2018): As the pioneer, GPT-1 was the first to successfully apply Transformer architecture to generative pre-training tasks. With 117 million parameters, it achieved excellent results on numerous natural language processing benchmarks of its time, validating the feasibility of this technological approach.

GPT-2 (2019): Parameter scale and training data volume increased dramatically, demonstrating surprising "zero-shot learning" capabilities. This meant it could complete new tasks based solely on instructions without any specific task examples, showing stronger generalisation abilities.

GPT-3 (2020): This was a milestone model with 175 billion parameters. Its most significant breakthrough was powerful "few-shot learning" capability—requiring only a few examples in the prompt to quickly grasp new task patterns and apply them broadly.

InstructGPT (2022): Rather than being the next-generation model, this represented a directional shift. OpenAI discovered that merely "knowledgeable" models weren't always "useful" or "safe." InstructGPT focused on introducing RLHF training methods, aimed at solving AI "alignment" problems—making model behaviour and outputs more consistent with human intentions and values. This dramatically improved the model's ability to follow user instructions, laying crucial groundwork for ChatGPT's birth.

GPT-4 (2023): GPT-4 not only achieved qualitative improvements in language understanding, logical reasoning, and accuracy compared to GPT-3.5, but more importantly, it became a "multimodal" model. It gained the ability to process information beyond text for the first time, capable of receiving and understanding image inputs, such as explaining chart contents or describing photo scenes.

GPT-4o (2024): The "o" stands for "omni" (universal), marking another major breakthrough in multimodal interaction. GPT-4o is the first model to natively integrate text, audio, and visual processing capabilities within a single neural network model. This enables near-instantaneous, extremely natural real-time voice conversations whilst simultaneously understanding users' speech and visual information captured by cameras, dramatically bridging the gap between AI interaction and natural human communication.`,
    keyPointsEn: [
      "GPT-1 (2018): Pioneer with 117 million parameters, validating the Transformer approach",
      "GPT-2 (2019): Demonstrated zero-shot learning capabilities with increased scale",
      "GPT-3 (2020): Milestone model with 175 billion parameters and powerful few-shot learning",
      "InstructGPT (2022): Introduced RLHF for better instruction following and safety",
      "GPT-4 (2023): First multimodal model capable of processing text and images",
      "GPT-4o (2024): Omni-model with native integration of text, audio, and visual processing"
    ]
  },
  5: {
    titleEn: "1.5 OpenAI: The Organisation Behind the Revolution",
    descriptionEn: "Understand OpenAI's founding background, development history, key figures, and its transformation from research organisation to global AI leader.",
    durationEn: "14 minutes",
    transcriptEn: `ChatGPT's emergence propelled its parent organisation, OpenAI, from a respected name in artificial intelligence research to a global technology focal point and household brand.

Founding and Initial Purpose (2015): OpenAI was founded in 2015 by a group of technology visionaries, including Sam Altman, Elon Musk, Greg Brockman, and Ilya Sutskever. Initially formed as a non-profit research laboratory, it embraced a grand mission: ensuring that Artificial General Intelligence (AGI) development would safely and responsibly benefit all humanity, rather than being monopolised by a few giants or posing threats to humanity.

Transformation and Strategic Partnership with Microsoft: As research deepened, OpenAI realised that training top-tier large language models required enormous computational resources and financial investment—far beyond what a non-profit organisation could bear. To address this challenge, OpenAI restructured in 2019, establishing a "capped-profit" company called OpenAI LP. This unique structure aimed to balance pursuing scientific mission with attracting commercial investment. That same year, Microsoft made an initial $1 billion investment in OpenAI, followed by additional billions in subsequent years, becoming its most important strategic partner and providing the necessary Azure cloud computing resources.

Key Figures: The company's leading figure is co-founder and CEO Sam Altman. Before helming OpenAI, Altman was renowned for his experience as president of the famous startup incubator Y Combinator, successfully nurturing numerous well-known companies including Airbnb and Reddit. Through his influence in the technology sector and exceptional leadership, he led OpenAI's transformation from a research institution to an AI giant valued at hundreds of billions of dollars. Another notable founder, Elon Musk, left OpenAI's board in 2018 due to concerns about the company's development direction and safety issues, subsequently founding his own AI company, xAI.

ChatGPT's Breakthrough Moment (2022): Although OpenAI had previously released multiple versions of GPT models and enjoyed high regard in academic and developer communities, what truly broke through boundaries and sparked global attention was ChatGPT, released in November 2022. Its extremely user-friendly conversational interface and powerful capabilities quickly attracted hundreds of millions of users, igniting a global generative AI boom and prompting tech giants like Google and Meta to accelerate their own competing products.`,
    keyPointsEn: [
      "2015 Founding: Non-profit research laboratory dedicated to safe AGI development",
      "Strategic Transformation: 2019 restructuring to capped-profit company with Microsoft investment",
      "Key Figures: Sam Altman's leadership, Elon Musk's early involvement then departure",
      "ChatGPT Explosion: 2022 release sparked global generative AI boom"
    ]
  }
};

// Function to apply translations
function applyTranslations() {
  console.log('🚀 Starting automated UK English translation for ChatGPT course data...');
  
  const filePath = path.join(__dirname, 'src/data/chatgpt-complete-course-data.ts');
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add module translations
    Object.entries(moduleTranslations).forEach(([id, translations]) => {
      // Add titleEn for modules
      const titleRegex = new RegExp(`(id: ${id},\\s*title: "[^"]*",?)`, 'g');
      content = content.replace(titleRegex, `$1\n    titleEn: "${translations.titleEn}",`);
      
      // Add descriptionEn for modules
      const descRegex = new RegExp(`(title: "[^"]*",\\s*titleEn: "[^"]*",\\s*description: "[^"]*",?)`, 'g');
      content = content.replace(descRegex, `$1\n    descriptionEn: "${translations.descriptionEn}",`);
    });
    
    // Add lesson translations for Chapter 1
    Object.entries(chapter1Lessons).forEach(([lessonId, translations]) => {
      // Add lesson titleEn
      const lessonTitleRegex = new RegExp(`(id: ${lessonId},\\s*title: "[^"]*",?)`, 'g');
      content = content.replace(lessonTitleRegex, `$1\n        titleEn: "${translations.titleEn}",`);
      
      // Add durationEn
      const durationRegex = new RegExp(`(duration: "[^"]*",?)`, 'g');
      content = content.replace(durationRegex, `$1\n        durationEn: "${translations.durationEn}",`);
      
      // Add descriptionEn
      const descRegex = new RegExp(`(description: "[^"]*",?)`, 'g');
      content = content.replace(descRegex, `$1\n        descriptionEn: "${translations.descriptionEn}",`);
      
      if (translations.imageAltEn) {
        const imageAltRegex = new RegExp(`(imageAlt: "[^"]*",?)`, 'g');
        content = content.replace(imageAltRegex, `$1\n        imageAltEn: "${translations.imageAltEn}",`);
      }
    });
    
    // Write the updated content back
    fs.writeFileSync(filePath, content, 'utf8');
    
    console.log('✅ Translation completed successfully!');
    console.log('📊 Applied translations for:');
    console.log(`   - ${Object.keys(moduleTranslations).length} course modules`);
    console.log(`   - ${Object.keys(chapter1Lessons).length} Chapter 1 lessons`);
    
  } catch (error) {
    console.error('❌ Error during translation:', error.message);
  }
}

// Run the translation
if (require.main === module) {
  applyTranslations();
}

module.exports = { applyTranslations, moduleTranslations, chapter1Lessons }; 