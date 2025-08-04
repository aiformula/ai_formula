const fs = require('fs');
const path = require('path');

// Read the current file
const filePath = path.join(__dirname, 'src/data/perplexity-complete-course-data.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Define English transcripts for key lessons (summaries for practicality)
const englishTranscripts = {
  '1.1': `Perplexity AI positions itself as an "Answer Engine," going beyond traditional search engines by providing direct, comprehensive answers with cited sources rather than just web links.

Traditional search engines follow this workflow: user query → web page results → user clicks multiple links, reads various sources, and manually integrates information. This process is often time-consuming and inefficient.

Perplexity revolutionises this approach: user question → Perplexity searches, analyses, and integrates multiple sources → provides structured, cited comprehensive answers. This enables users to obtain high-quality, verifiable information within seconds.

Perplexity's core mission is "Democratizing Access to Knowledge," ensuring users of all technical backgrounds can easily access accurate information. By combining advanced language models with real-time web search, Perplexity makes knowledge more accessible.

In practice, Perplexity excels at complex queries requiring multi-source integration. For example, asking "What are 2024's most important AI breakthroughs?" results in Perplexity searching news, academic papers, and reports to provide a structured answer with specific citations.`,

  '1.2': `Knowledge democratisation is Perplexity AI's core philosophy, extending beyond technology to encompass information equality, educational opportunity access, and cognitive burden reduction.

Traditional information access often requires specific skills: knowing correct keywords, evaluating source reliability, and integrating multiple information sources. These skill barriers create an "information gap."

Perplexity significantly reduces these barriers through advanced AI technology. Users need only ask questions in natural language, without mastering complex search techniques or keyword optimisation strategies.

The citation system ensures information transparency and verifiability. Each answer includes specific sources, allowing users to easily trace information origins, enhancing answer credibility and developing critical thinking skills.

In education and academic research, this democratisation is particularly meaningful, enabling rapid literature reviews and efficient learning while maintaining academic rigor.`,

  '2.1': `The Perplexity interface is designed for intuitive navigation and efficient information discovery. The main search box serves as the primary entry point, supporting natural language queries.

The sidebar contains essential navigation elements including Library, Collections, and Spaces for organising research. The feature areas provide access to Focus modes, file upload capabilities, and advanced search options.

Understanding interface layout is crucial for maximising Perplexity's potential. Each element is strategically positioned to support seamless workflow from query formulation to result analysis.

The interface adapts to user needs, whether conducting academic research, business analysis, or casual information gathering. Mastering navigation fundamentals enhances overall productivity and search effectiveness.`
};

const englishKeyPoints = {
  '1.1': [
    'Perplexity AI positions itself as an "Answer Engine," providing comprehensive answers rather than web link lists',
    'Revolutionarily changes information acquisition: from "search→browse→integrate" to "ask→get answer"',
    'Core mission is democratising knowledge access for all users to obtain high-quality information easily',
    'Excels at complex queries requiring multi-source integration with structured, cited answers'
  ],
  '1.2': [
    'Knowledge democratisation eliminates information gaps, enabling equal access to high-quality information',
    'Reduces skill barriers for information access through natural language querying',
    'Citation system ensures transparency and verifiability whilst developing critical thinking',
    'Particularly valuable in education, academic research, and professional decision-making'
  ],
  '2.1': [
    'Master main interface navigation: search box, sidebar, and feature areas',
    'Understand Library, Collections, and Spaces for research organisation',
    'Learn Focus modes and advanced search capabilities for targeted results',
    'Optimise workflow efficiency through strategic interface utilisation'
  ]
};

// Function to add English content to specific lessons
function addEnglishContent(content, lessonId, transcript, keyPoints) {
  // Find the lesson and add transcriptEn
  const transcriptPattern = new RegExp(
    `(\\s+transcript: \`[^]*?\`,)`,
    'g'
  );
  
  content = content.replace(transcriptPattern, (match) => {
    if (match.includes(`id: ${lessonId.split('.')[1]},`)) {
      return `${match}\n          transcriptEn: \`${transcript}\`,`;
    }
    return match;
  });
  
  // Find the lesson and add keyPointsEn
  const keyPointsPattern = new RegExp(
    `(\\s+keyPoints: \\[[^\\]]*\\],)`,
    'g'
  );
  
  content = content.replace(keyPointsPattern, (match) => {
    const keyPointsStr = keyPoints.map(point => `'${point}'`).join(',\n            ');
    return `${match}\n          keyPointsEn: [\n            ${keyPointsStr}\n          ],`;
  });
  
  return content;
}

// Apply English content for key lessons
console.log('Adding English transcripts and key points for essential lessons...');

Object.entries(englishTranscripts).forEach(([lessonId, transcript]) => {
  const keyPoints = englishKeyPoints[lessonId];
  if (keyPoints) {
    content = addEnglishContent(content, lessonId, transcript, keyPoints);
  }
});

// Write the updated content back to the file
fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Successfully added English transcripts for key lessons'); 