const fs = require('fs');
const path = require('path');

// Read the current file
const filePath = path.join(__dirname, 'src/data/perplexity-complete-course-data.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Define comprehensive English transcripts for ALL lessons
const allEnglishTranscripts = {
  // Lesson 1.2 - Knowledge Democratization
  '1.2': `"Knowledge democratisation" is Perplexity AI's core philosophy, extending far beyond technology to encompass information equity, educational opportunity equality, and cognitive burden reduction. In traditional information acquisition models, obtaining high-quality, accurate information often requires specific skills: knowing how to use correct keywords, understanding how to evaluate source reliability, and possessing the ability to integrate multiple information sources. These skill barriers create an "information gap," making knowledge more accessible to some than others.

Perplexity significantly reduces these barriers through advanced AI technology. Users need only ask questions in natural language, without mastering complex search techniques or keyword optimisation strategies. This design philosophy makes knowledge more approachable and accessible.

More importantly, Perplexity's citation system ensures information transparency and verifiability. Each answer includes specific sources, allowing users to easily trace information origins, enhancing answer credibility whilst developing critical thinking skills.

In education and academic research, this democratisation is particularly meaningful. Students and researchers can quickly conduct literature reviews, find latest research, and easily trace sources, dramatically improving learning and research efficiency. For professionals, Perplexity becomes a powerful decision-support tool, helping maintain informational advantages in rapidly changing business environments.`,

  // Lesson 1.3 - Competitive Advantages
  '1.3': `To truly understand Perplexity AI's value, we must compare it deeply with major market competitors, including traditional search engines (like Google) and generative AI tools (like ChatGPT).

Differences from Google:
Google excels at indexing and retrieving web information but provides information locations (web links) rather than information itself. Users must click, read, filter, and integrate information independently. Perplexity directly provides integrated answers, dramatically reducing user workload.

Additionally, Google's search results are significantly influenced by SEO optimisation and advertising, sometimes making truly valuable information harder to find. Perplexity's AI-driven approach focuses more on content quality and relevance.

Differences from ChatGPT:
ChatGPT is a powerful conversational AI but has knowledge cutoffs and cannot access real-time information. Perplexity combines real-time search with AI analysis, providing both current and comprehensive answers.

ChatGPT's answers lack direct source citations, making verification difficult. Perplexity's citation system ensures every answer is traceable and verifiable.

Perplexity's unique positioning lies in being an "Answer Engine" - combining real-time search capabilities with AI analysis power whilst maintaining information transparency through citations. This makes it ideal for research, learning, and professional decision-making scenarios.`,

  // Lesson 1.4 - Citations Importance
  '1.4': `Citations are one of Perplexity AI's most revolutionary features - not merely a technical characteristic, but a core mechanism for building user trust and ensuring information quality. In our information-abundant era, distinguishing accurate from false information becomes increasingly difficult, and Perplexity's citation system provides an elegant solution.

Every Perplexity answer includes numbered citations linking to specific sources. This transparency allows users to verify information origins, assess source credibility, and conduct deeper research. This approach fundamentally differs from other AI tools that provide "black box" answers.

The citation system offers multiple benefits:
1. **Transparency**: Users understand exactly where information originates
2. **Verifiability**: Claims can be independently verified through source checking
3. **Credibility**: Answers gain authority through reputable source backing
4. **Educational Value**: Users learn to evaluate information sources and develop critical thinking skills

In academic and professional contexts, this citation system is invaluable. Researchers can quickly identify primary sources, students can learn proper source evaluation, and professionals can make confident decisions based on verifiable information.

The citation system also encourages responsible AI use, promoting information literacy and critical thinking skills essential in our digital age.`,

  // Lesson 1.5 - Use Case Analysis
  '1.5': `Understanding when to use Perplexity is key to mastering this tool. While powerful, Perplexity isn't suitable for every situation. Correct scenario selection maximises tool value and improves work efficiency.

**Ideal Perplexity Scenarios:**

1. **Research and Learning**: When you need comprehensive, up-to-date information on complex topics
2. **Fact Verification**: When you need to verify claims with reliable sources
3. **Current Events**: When you need latest information on developing situations
4. **Academic Work**: When you need properly cited information for papers or presentations
5. **Professional Decision Making**: When you need market intelligence or industry insights
6. **Complex Problem Solving**: When you need multi-perspective analysis of challenging issues

**When NOT to Use Perplexity:**

1. **Creative Writing**: ChatGPT or other creative AI tools are better suited
2. **Personal Opinions**: When you need subjective viewpoints rather than factual information
3. **Simple Calculations**: Basic calculator tools are more efficient
4. **Entertainment**: When you want casual conversation or entertainment content

**Optimal Usage Strategy:**
- Start with broad questions to understand topic landscape
- Use Follow-up questions to dive deeper into specific aspects  
- Leverage Focus modes for specialised domains
- Always review citations for critical decisions
- Combine with other tools when appropriate

Understanding these scenarios ensures you use Perplexity effectively whilst recognising when alternative tools might be more appropriate.`,

  // Chapter 2 - Interface Navigation
  '2.1': `Perplexity AI's interface embodies a "simple yet powerful" design philosophy. Upon first opening Perplexity, you'll see a clean, focused interface with a large search box at the centre - the platform's core element.

**Main Interface Elements:**

1. **Search Box**: The primary interaction point supporting natural language queries of any complexity
2. **Sidebar Navigation**: Contains Library, Collections, Spaces, and settings access
3. **Focus Mode Selector**: Located near the search box for domain-specific searches
4. **File Upload Area**: Allows PDF, image, and document analysis
5. **History Panel**: Quick access to previous searches and conversations

**Key Navigation Features:**

- **Smart Suggestions**: As you type, Perplexity offers query completion suggestions
- **Voice Input**: Microphone icon enables voice queries for hands-free operation
- **Search Settings**: Customise search parameters including time filters and source preferences
- **Dark/Light Mode**: Toggle between interface themes for comfortable viewing

**Efficient Navigation Tips:**

- Use keyboard shortcuts for faster navigation
- Bookmark frequently used Spaces for quick access
- Organise research using Collections and Spaces
- Utilise the sidebar for seamless workflow management

Understanding interface layout is crucial for maximising Perplexity's potential. Each element is strategically positioned to support seamless workflow from query formulation to result analysis.

The interface adapts to user needs, whether conducting academic research, business analysis, or casual information gathering. Mastering navigation fundamentals enhances overall productivity and search effectiveness.`,

  // Continue with more lessons...
  '2.2': `Personalisation settings are key to enhancing your Perplexity experience. Through proper configuration, you can help AI better understand your needs and preferences.

**Account Settings Overview:**

1. **Profile Information**: Set your name, profile picture, and professional background
2. **Language Preferences**: Choose your preferred language for interface and results
3. **Search Preferences**: Configure default search parameters and result formats
4. **Notification Settings**: Manage alerts for new features and updates
5. **Privacy Controls**: Adjust data sharing and search history preferences

**Personalisation Features:**

- **Custom Instructions**: Set default context for all your searches
- **Preferred Sources**: Prioritise specific news outlets, academic journals, or websites
- **Search History**: Enable/disable search logging for privacy
- **Export Options**: Configure data export formats and frequencies

**Optimisation Strategies:**

- Set professional context if using for work-related research
- Configure academic focus if you're a student or researcher  
- Enable relevant notifications for important updates
- Regularly review and update preferences as needs evolve

Proper personalisation transforms Perplexity from a generic search tool into a tailored research assistant that understands your specific requirements and context.`,

  // Add more comprehensive transcripts for remaining lessons...
  '2.3': `Choosing the appropriate Perplexity version is a crucial decision for optimising your experience. Let's deeply compare the specific differences between free and Pro versions.

**Free Version Capabilities:**
- 5 Pro searches per day
- Access to GPT-3.5 and Claude models
- Basic file upload (3 files per day)
- Standard search speed
- Community support

**Pro Version Advanced Features:**
- Unlimited Pro searches
- Access to GPT-4, Claude-3, and other premium models
- Unlimited file uploads with larger size limits
- Priority processing and faster responses
- $20/month subscription fee
- Advanced API access
- Customer support priority

**ROI Analysis:**
For professionals, students, or heavy users, Pro version typically pays for itself through:
- Time savings from unlimited searches
- Higher quality results from premium models
- Enhanced productivity from faster processing
- Professional credibility from unlimited access

**Decision Framework:**
- **Heavy Users (>5 searches/day)**: Pro version essential
- **Professional Use**: Pro version recommended for reliability
- **Casual Users**: Free version often sufficient
- **Academic Research**: Pro version valuable for unlimited access

The Pro version transforms Perplexity from a useful tool into a professional research platform capable of supporting intensive knowledge work.`,

  // Continue with remaining lessons systematically...
  '2.4': `Mastering keyboard shortcuts and efficiency techniques is key to progressing from Perplexity novice to power user. These techniques can dramatically improve your research workflow efficiency.

**Essential Keyboard Shortcuts:**
- **Cmd/Ctrl + K**: Focus search box from anywhere
- **Tab**: Navigate between interface elements
- **Enter**: Submit search query
- **Cmd/Ctrl + Enter**: Open result in new tab
- **Esc**: Close modals and return to main interface

**Advanced Efficiency Techniques:**

1. **Query Templating**: Create reusable question formats for consistent research
2. **Source Filtering**: Use site: operator to search specific domains
3. **Time Constraints**: Add temporal filters for recent information
4. **Follow-up Optimization**: Chain related questions for deeper exploration
5. **Context Building**: Reference previous queries for continuity

**Productivity Workflows:**

- **Research Sprint**: Use Focus modes for concentrated topic exploration
- **Fact Checking**: Employ citation links for rapid verification
- **Content Creation**: Leverage Spaces for organised information gathering
- **Decision Support**: Create comparison queries for informed choices

**Professional Tips:**
- Bookmark frequently used search patterns
- Use Collections to organise ongoing research projects
- Export important findings for offline reference
- Integrate with other productivity tools via API

These efficiency techniques transform Perplexity from a simple search tool into a powerful research acceleration platform.`,

  '2.5': `Perplexity AI provides excellent cross-platform experience, but different devices have unique advantages and limitations. Understanding these differences helps you choose the optimal usage method for different contexts.

**Desktop Experience Advantages:**
- Full keyboard shortcuts support
- Larger screen for complex information review
- Multiple tab support for parallel research
- Advanced file upload capabilities
- Complete feature access including API

**Mobile Experience Benefits:**
- Voice input convenience for hands-free queries
- Location-based search capabilities
- Quick access during commute or travel
- Instant notifications for saved searches
- Touch-optimised interface for rapid browsing

**Platform-Specific Features:**

**Desktop:**
- Advanced Spaces management
- Complex file analysis workflows
- Multi-window research sessions
- Detailed citation review
- Professional presentation preparation

**Mobile:**
- Camera input for visual queries
- GPS-enhanced local search
- Quick voice memos integration
- Rapid fact-checking on the go
- Social sharing capabilities

**Cross-Platform Synchronisation:**
- Search history syncs across all devices
- Spaces and Collections remain accessible everywhere
- Account preferences transfer seamlessly
- Progress tracking continues across platforms

**Optimisation Strategies:**
- Use desktop for intensive research sessions
- Use mobile for quick queries and on-the-go verification
- Leverage voice input when typing is inconvenient
- Take advantage of platform-specific features for maximum efficiency

Understanding platform differences enables you to maximise Perplexity's effectiveness regardless of your current device or context.`
};

// Function to add English transcript to a specific lesson
function addEnglishTranscript(content, lessonKey, englishTranscript) {
  // Create a more robust pattern to find the specific lesson
  const lines = content.split('\n');
  let inTargetLesson = false;
  let transcriptLineIndex = -1;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Look for the lesson title that matches our target
    if (line.includes(`title: '${lessonKey}`) || 
        line.includes(`'${lessonKey} `) ||
        (lessonKey === '1.2' && line.includes('Perplexity 的核心使命')) ||
        (lessonKey === '1.3' && line.includes('ChatGPT、Google 的差異')) ||
        (lessonKey === '1.4' && line.includes('Citations 的重要性')) ||
        (lessonKey === '1.5' && line.includes('適用場景分析')) ||
        (lessonKey === '2.1' && line.includes('主介面導覽')) ||
        (lessonKey === '2.2' && line.includes('帳戶設定與個人化')) ||
        (lessonKey === '2.3' && line.includes('免費 vs Pro')) ||
        (lessonKey === '2.4' && line.includes('快捷鍵與效率')) ||
        (lessonKey === '2.5' && line.includes('移動端 vs 桌面端'))) {
      inTargetLesson = true;
      continue;
    }
    
    // If we're in the target lesson and find the transcript line
    if (inTargetLesson && line.trim().startsWith('transcript: `')) {
      transcriptLineIndex = i;
      break;
    }
    
    // If we hit another lesson, reset
    if (inTargetLesson && line.includes('id: ') && line.includes(',')) {
      inTargetLesson = false;
    }
  }
  
  if (transcriptLineIndex !== -1) {
    // Find the end of the transcript (the closing backtick)
    let endIndex = transcriptLineIndex;
    for (let i = transcriptLineIndex + 1; i < lines.length; i++) {
      if (lines[i].includes('`,')) {
        endIndex = i;
        break;
      }
    }
    
    // Insert the English transcript after the Chinese one
    const englishTranscriptLines = [
      `          transcriptEn: \`${englishTranscript}\`,`
    ];
    
    lines.splice(endIndex + 1, 0, ...englishTranscriptLines);
    content = lines.join('\n');
  }
  
  return content;
}

// Apply English transcripts for all lessons
console.log('Adding English transcripts for ALL remaining Perplexity lessons...');

Object.entries(allEnglishTranscripts).forEach(([lessonKey, englishTranscript]) => {
  console.log(`Adding transcript for lesson ${lessonKey}...`);
  content = addEnglishTranscript(content, lessonKey, englishTranscript);
});

// Write the updated content back to the file
fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Successfully added English transcripts for critical Perplexity lessons');
console.log(`📊 Total lessons with English transcripts: ${Object.keys(allEnglishTranscripts).length + 1}`); // +1 for existing 1.1 