const fs = require('fs');
const path = require('path');

// Read the current file
const filePath = path.join(__dirname, 'src/data/perplexity-complete-course-data.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Define English transcripts for chapters 3-6
const remainingEnglishTranscripts = {
  // Chapter 3 - Advanced Search Techniques
  '3.1': `In the AI era, "asking good questions" has become a core skill. Perplexity's strength lies not only in its search capabilities but also in its ability to understand and respond to complex natural language queries.

**Fundamentals of Effective Questioning:**

1. **Be Specific**: Instead of "AI news," ask "What are the latest developments in AI safety research in 2024?"
2. **Provide Context**: Include relevant background information to help AI understand your perspective
3. **Use Natural Language**: Write questions as you would ask a colleague, not as keyword searches
4. **Request Specific Formats**: Ask for comparisons, lists, explanations, or analyses as needed

**Advanced Query Techniques:**

- **Multi-part Questions**: "What is machine learning, how does it differ from deep learning, and what are practical applications?"
- **Comparative Queries**: "Compare the advantages and disadvantages of renewable vs nuclear energy"
- **Temporal Constraints**: "What have been the major cryptocurrency developments since 2023?"
- **Source-specific Requests**: "What do recent academic papers say about climate change mitigation?"

**Common Query Mistakes to Avoid:**

- Overly broad questions without context
- Keyword-style searches instead of natural language
- Asking multiple unrelated questions simultaneously
- Failing to specify the type of answer needed

Mastering question formulation is the foundation of effective Perplexity usage, enabling you to unlock the platform's full analytical potential.`,

  '3.2': `Focus mode is Perplexity's powerful feature that enables AI to optimise for specific domains and task types, providing more precise and professional responses.

**Four Focus Mode Categories:**

**1. Academic Focus:**
- Prioritises scholarly articles, research papers, and academic sources
- Ideal for literature reviews, research projects, and academic writing
- Provides formal, citation-rich responses suitable for academic work

**2. Writing Focus:**
- Emphasises style guides, writing resources, and creative inspiration
- Perfect for content creation, copywriting, and editorial assistance
- Balances creativity with factual accuracy

**3. Math Focus:**
- Concentrates on mathematical proofs, formulas, and quantitative analysis
- Essential for STEM research, problem-solving, and technical documentation
- Provides step-by-step solutions and mathematical reasoning

**4. Programming Focus:**
- Targets coding resources, documentation, and technical solutions
- Invaluable for software development, debugging, and learning new technologies
- Offers code examples, best practices, and implementation guidance

**Optimal Usage Strategies:**

- Select focus mode before asking questions for best results
- Switch modes based on different aspects of complex projects
- Combine focus modes for interdisciplinary research
- Use Academic focus for credibility, Programming for technical accuracy

Understanding and leveraging Focus modes transforms Perplexity from a general search tool into a specialised research assistant tailored to your specific domain needs.`,

  '3.3': `File upload functionality is Perplexity's revolutionary feature that extends AI understanding capabilities to various document formats, enabling deep analysis and questioning of existing materials.

**Supported File Types:**

1. **PDF Documents**: Research papers, reports, manuals, e-books
2. **Image Files**: Charts, diagrams, screenshots, photographs with text
3. **Text Documents**: Word files, presentations, spreadsheets

**Key Capabilities:**

**Document Analysis:**
- Extract key information and summarise main points
- Answer specific questions about document content
- Cross-reference information across multiple uploaded files
- Identify patterns and relationships within documents

**Visual Content Processing:**
- Read text from images and diagrams
- Interpret charts, graphs, and data visualisations
- Analyse infographics and complex visual information
- Extract data from screenshots and presentations

**Practical Applications:**

**Academic Research:**
- Analyse multiple research papers simultaneously
- Compare methodologies across different studies
- Extract relevant quotes and citations
- Summarise lengthy academic texts

**Business Intelligence:**
- Process financial reports and market analyses
- Extract insights from presentation materials
- Analyse competitor documentation
- Review contract terms and legal documents

**Personal Productivity:**
- Summarise meeting notes and documents
- Extract action items from lengthy reports
- Compare different versions of documents
- Translate and analyse foreign language materials

File upload transforms Perplexity from an information search tool into a comprehensive document intelligence platform.`,

  '3.4': `The Copilot suggestion system is Perplexity's intelligent assistant feature that not only answers your questions but also proactively suggests subsequent exploration directions, helping you discover potentially overlooked important perspectives.

**How Copilot Works:**

After providing an initial answer, Copilot analyses the topic comprehensively and suggests related questions that might interest you. These suggestions are generated using advanced AI that understands topic relationships and common research patterns.

**Types of Suggestions:**

**1. Deeper Exploration:**
- "What are the specific mechanisms behind this phenomenon?"
- "How has this evolved over the past decade?"
- "What are the latest research developments in this area?"

**2. Comparative Analysis:**
- "How does this compare to alternative approaches?"
- "What are the advantages and disadvantages?"
- "How do different experts view this topic?"

**3. Practical Applications:**
- "What are real-world applications of this concept?"
- "How can this be implemented in practice?"
- "What tools or resources are available for this?"

**4. Broader Context:**
- "What are the implications for related fields?"
- "How does this fit into larger trends?"
- "What future developments might we expect?"

**Benefits of Using Copilot:**

- **Discovery**: Uncover aspects you hadn't considered
- **Efficiency**: Guided research path saves time
- **Depth**: Systematic exploration of complex topics
- **Serendipity**: Unexpected connections and insights

Copilot transforms solitary research into a collaborative exploration experience with an AI research partner.`,

  '3.5': `Mastering advanced search techniques is essential for becoming a Perplexity expert user. These techniques enable precise control over search scope, yielding more relevant and higher-quality results.

**Time-Based Filtering:**

**Recent Information:**
- "latest developments in quantum computing"
- "2024 artificial intelligence breakthroughs"
- "recent studies on climate change mitigation"

**Historical Context:**
- "COVID-19 impact analysis from 2020-2022"
- "dot-com bubble analysis from 1995-2001"
- "renewable energy adoption trends over the past decade"

**Source Filtering Techniques:**

**Academic Sources:**
- "according to peer-reviewed research..."
- "what do academic studies show about..."
- "scientific consensus on..."

**News and Current Events:**
- "recent news reports about..."
- "breaking developments in..."
- "media coverage of..."

**Expert Opinions:**
- "what do industry experts say about..."
- "professional analysis of..."
- "thought leader perspectives on..."

**Language and Regional Settings:**

**Multi-language Research:**
- Specify language preferences for international perspectives
- Compare viewpoints across different cultural contexts
- Access region-specific information and sources

**Geographic Constraints:**
- "European perspective on data privacy"
- "Asian market analysis for renewable energy"
- "North American regulatory approaches to AI"

**Advanced Query Operators:**

- **Exclusion**: "renewable energy NOT solar"
- **Exact Phrases**: "machine learning applications"
- **Multiple Concepts**: "artificial intelligence AND healthcare AND ethics"

These techniques transform Perplexity into a precision research instrument capable of delivering exactly the information you need.`,

  // Chapter 4 - Knowledge Management
  '4.1': `"Library" is Perplexity AI's personalised knowledge centre for every registered user - not merely a history list, but a comprehensive, fully-featured central hub for storing, organising, and retrieving all research activities.

**Core Library Functions:**

**1. Search History Management:**
- Automatically saves all your searches and conversations
- Enables quick reference to previous research sessions
- Provides context continuity across multiple sessions
- Supports search within your own history

**2. Organised Collection System:**
- Group related searches into thematic collections
- Tag searches with custom labels for easy retrieval
- Create folders for different projects or topics
- Export collections for external use

**3. Advanced Retrieval:**
- Full-text search across all your previous queries and answers
- Filter by date, topic, or source type
- Quick access to frequently referenced information
- Bookmark particularly valuable searches

**Strategic Library Usage:**

**Academic Research:**
- Maintain separate collections for different courses or papers
- Track source progression throughout research projects
- Build comprehensive literature review databases
- Export citations and references

**Professional Development:**
- Organise industry research by topic areas
- Track competitor analysis over time
- Build knowledge bases for client projects
- Maintain expert resource libraries

**Personal Learning:**
- Create learning paths for new skills
- Track progress on complex topics
- Build personal reference collections
- Maintain hobby-related research

Library transforms Perplexity from a query tool into a comprehensive personal knowledge management system.`,

  '4.2': `Perplexity's knowledge organisation functionality has undergone significant evolution, upgrading from initial "Collections" to the more powerful and flexible "Spaces." Understanding this evolution helps grasp Perplexity's deep thinking in knowledge management.

**Evolution from Collections to Spaces:**

**Collections (Legacy System):**
- Simple grouping of related searches
- Basic organisation and tagging
- Limited collaboration features
- Static content management

**Spaces (Current System):**
- Dynamic, collaborative research environments
- Advanced project management capabilities
- Custom AI instructions and context
- Real-time collaboration and sharing

**Key Advantages of Spaces:**

**1. Contextual Intelligence:**
- Each Space maintains its own context and focus
- AI understands project-specific requirements
- Consistent terminology and perspective across searches
- Domain-specific optimisation

**2. Collaborative Features:**
- Team access and permission management
- Real-time collaboration on research projects
- Shared knowledge bases and resources
- Comment and annotation systems

**3. Advanced Organisation:**
- Hierarchical structure for complex projects
- Cross-referencing between related Spaces
- Template systems for recurring project types
- Integration with external tools and workflows

**Migration Strategy:**

For users transitioning from Collections:
- Evaluate existing Collections for Space conversion
- Reorganise content around project themes
- Establish collaboration protocols
- Leverage new contextual features

Spaces represent Perplexity's evolution into a comprehensive research collaboration platform, moving beyond individual search into team-based knowledge creation.`,

  '4.3': `Spaces are Perplexity's core tool for deep research and knowledge organisation. Mastering their creation and management methods can dramatically improve research efficiency and quality.

**Creating Effective Spaces:**

**1. Space Setup:**
- Choose descriptive, project-specific names
- Write clear purpose statements and objectives
- Establish scope boundaries and focus areas
- Configure appropriate access permissions

**2. Custom Instructions:**
- Define domain-specific terminology and context
- Establish preferred source types and formats
- Set quality standards and citation requirements
- Specify output formats and structures

**3. Collaboration Configuration:**
- Invite relevant team members and stakeholders
- Assign roles and permission levels
- Establish communication protocols
- Set up review and approval workflows

**Advanced Management Techniques:**

**Content Organisation:**
- Create logical folder structures
- Use consistent tagging and categorisation
- Implement version control for evolving projects
- Maintain clean, organised information architecture

**Workflow Optimisation:**
- Establish research protocols and methodologies
- Create templates for common query types
- Implement quality assurance processes
- Set up automated reporting and summaries

**Integration Strategies:**
- Connect with external research tools
- Sync with document management systems
- Integrate with presentation and reporting platforms
- Establish backup and archival procedures

**Best Practices:**

- Regular Space maintenance and cleanup
- Consistent naming conventions
- Clear documentation of Space purpose and scope
- Regular team training and updates

Spaces transform individual research into organised, collaborative knowledge creation environments.`,

  '4.4': `Pages functionality is Perplexity ecosystem's content creation and sharing tool, allowing users to transform research accumulated in Spaces into structured, shareable, beautiful reports. This feature upgrades Perplexity from a pure search tool to a complete knowledge output platform.

**Pages Core Capabilities:**

**1. Research Synthesis:**
- Transform Space contents into coherent narratives
- Combine multiple search results into unified reports
- Maintain source citations and links
- Create executive summaries and detailed analyses

**2. Professional Formatting:**
- Multiple template options for different report types
- Automatic formatting and styling
- Image and chart integration
- Interactive elements and hyperlinks

**3. Sharing and Collaboration:**
- Public and private sharing options
- Collaboration features for team editing
- Version control and change tracking
- Export options for various formats

**Content Creation Workflow:**

**Research Phase:**
- Conduct comprehensive research in designated Spaces
- Organise findings thematically
- Identify key insights and patterns
- Collect supporting evidence and citations

**Synthesis Phase:**
- Outline report structure and flow
- Transform raw research into narrative form
- Integrate visual elements and supporting materials
- Ensure logical progression and coherence

**Publication Phase:**
- Apply professional formatting and styling
- Review and edit for clarity and accuracy
- Configure sharing settings and permissions
- Distribute to intended audiences

**Use Cases:**

**Academic Applications:**
- Literature reviews and research summaries
- Project reports and case studies
- Conference presentations and papers
- Grant proposals and research plans

**Business Applications:**
- Market research reports
- Competitive analysis documents
- Strategic planning materials
- Client presentations and proposals

Pages completes the research-to-publication workflow within the Perplexity platform.`,

  // Continue with remaining chapters (5 and 6)...
  '5.1': `Choosing whether to upgrade to Perplexity Pro is an important decision many heavy users face. This section provides in-depth analysis of Pro version's complete feature set to help evaluate its investment return value.

**Comprehensive Pro Feature Analysis:**

**Core Search Enhancements:**
- Unlimited Pro searches (vs 5 per day free)
- Access to latest AI models (GPT-4, Claude-3, Gemini)
- Priority processing and faster response times
- Enhanced accuracy and depth in responses

**Advanced File Capabilities:**
- Unlimited file uploads with larger size limits
- Support for additional file formats
- Batch processing capabilities
- Advanced document analysis features

**Professional Tools:**
- API access for custom integrations
- Advanced export and sharing options
- Team collaboration features
- Custom branding for business users

**ROI Calculation Framework:**

**Time Value Analysis:**
- Calculate time savings from unlimited searches
- Estimate productivity gains from faster processing
- Assess value of premium AI model access
- Factor in reduced research time and effort

**Professional Impact:**
- Enhanced credibility through unlimited access
- Improved decision-making quality
- Competitive advantage from advanced features
- Client service improvements

**Cost-Benefit Scenarios:**

**Heavy Users (>20 searches/day):** Pro essential for productivity
**Professionals (consulting, research):** ROI typically achieved within first month
**Teams (collaborative research):** Shared value multiplies individual benefits
**Casual Users (<5 searches/day):** Free version often sufficient

**Decision Framework:**
Consider upgrading if you regularly hit free tier limits, require premium AI models, need unlimited file processing, or use Perplexity for professional purposes.

Pro version transforms Perplexity into a professional-grade research platform suitable for intensive knowledge work.`,

  '5.2': `Pro Search is Perplexity Pro version's core functionality, representing cutting-edge AI search technology application. Understanding its working principles and advantages helps maximise this powerful tool's potential.

**Pro Search Advanced Capabilities:**

**Enhanced Model Access:**
- GPT-4 for complex reasoning and analysis
- Claude-3 for nuanced understanding and creative tasks
- Gemini for multimodal processing and integration
- Multiple model comparison for comprehensive insights

**Deeper Query Processing:**
- More sophisticated natural language understanding
- Enhanced context retention across longer conversations
- Improved handling of complex, multi-part questions
- Better disambiguation of ambiguous queries

**Superior Source Integration:**
- Access to premium databases and academic resources
- Real-time processing of breaking news and developments
- Enhanced fact-checking and verification capabilities
- Improved citation quality and relevance

**Performance Advantages:**

**Speed and Reliability:**
- Priority queue processing for faster responses
- Reduced latency during peak usage times
- Higher uptime and service availability
- Consistent performance regardless of demand

**Quality Improvements:**
- More comprehensive and accurate answers
- Better structured responses with clear organisation
- Enhanced critical analysis and evaluation
- Improved handling of controversial or complex topics

**Use Case Optimization:**

**Research Intensive Work:**
- Academic literature reviews and analysis
- Market research and competitive intelligence
- Legal research and case analysis
- Technical documentation and troubleshooting

**Professional Decision Making:**
- Strategic planning and analysis
- Risk assessment and evaluation
- Investment research and due diligence
- Policy analysis and recommendation

Pro Search elevates Perplexity from a capable search tool to a professional-grade research assistant suitable for mission-critical knowledge work.`,

  '5.3': `One of Perplexity Pro users' greatest advantages is the ability to choose different AI models for query processing. Each model has unique strengths and characteristics, and understanding strategic model selection can significantly enhance research effectiveness.

**Model Comparison and Strengths:**

**GPT-4:**
- **Strengths:** Complex reasoning, detailed analysis, creative problem-solving
- **Best For:** Strategic planning, complex explanations, creative writing
- **Limitations:** Slower processing, higher resource requirements

**Claude-3:**
- **Strengths:** Nuanced understanding, ethical reasoning, balanced perspectives  
- **Best For:** Sensitive topics, ethical analysis, comprehensive explanations
- **Limitations:** May be more conservative in responses

**Gemini:**
- **Strengths:** Multimodal processing, real-time information, technical accuracy
- **Best For:** Current events, technical queries, image analysis
- **Limitations:** Newer model with evolving capabilities

**Strategic Model Selection:**

**Query Type Optimization:**
- **Research Questions:** GPT-4 for depth, Gemini for currency
- **Creative Tasks:** GPT-4 for innovation, Claude for thoughtfulness
- **Technical Queries:** Gemini for accuracy, GPT-4 for explanation
- **Ethical Considerations:** Claude for balanced analysis

**Workflow Integration:**
- Start with Gemini for current information
- Switch to GPT-4 for detailed analysis
- Use Claude for balanced perspective
- Compare responses across models for comprehensive understanding

**Model Switching Strategies:**

**Sequential Analysis:**
1. Initial query with fastest model (Gemini)
2. Follow-up analysis with most appropriate model
3. Cross-validation with alternative model
4. Synthesis using preferred model for final output

**Parallel Comparison:**
- Ask same question to multiple models
- Compare response quality and perspective
- Identify consensus and differences
- Select best elements from each response

Understanding model strengths enables strategic AI collaboration, maximising the unique capabilities of each system for optimal research outcomes.`,

  '5.4': `Perplexity's API functionality enables developers and advanced users to integrate its powerful search and AI capabilities into their own applications and workflows. This integration can achieve true automated research and intelligent decision support.

**API Core Capabilities:**

**Search Integration:**
- Programmatic access to Perplexity's search functionality
- Batch processing for large-scale research projects
- Real-time query processing for dynamic applications
- Custom output formatting and filtering

**Automation Workflows:**
- Scheduled research updates and monitoring
- Automated report generation and distribution
- Integration with business intelligence platforms
- Custom alert systems for specified topics

**Development Integration:**
- RESTful API for easy application integration
- Multiple programming language support
- Comprehensive documentation and examples
- Rate limiting and usage analytics

**Practical Implementation Examples:**

**Business Intelligence:**
- Automated competitor monitoring and analysis
- Market trend tracking and reporting
- Customer sentiment analysis across sources
- Risk monitoring and alert systems

**Academic Research:**
- Automated literature review updates
- Research trend analysis and tracking
- Citation monitoring and analysis
- Collaborative research platform integration

**Content Creation:**
- Automated fact-checking for publications
- Research-backed content generation
- Source verification and citation management
- Multi-source content synthesis

**Implementation Strategy:**

**Planning Phase:**
- Define specific use cases and requirements
- Identify integration points with existing systems
- Plan authentication and security measures
- Design error handling and fallback procedures

**Development Phase:**
- Set up API credentials and access
- Implement core functionality with error handling
- Test thoroughly with representative data
- Optimise for performance and reliability

**Deployment Phase:**
- Monitor usage and performance metrics
- Implement logging and analytics
- Establish maintenance and update procedures
- Plan for scaling and expansion

API integration transforms Perplexity from a manual research tool into an automated intelligence platform.`,

  // Chapter 6 - Real-world Applications
  '6.1': `In academic research, Perplexity AI is revolutionarily changing how researchers acquire, analyse, and organise information. This section explores maximising Perplexity's powerful functionality in academic environments.

**Academic Research Workflow Integration:**

**Literature Review Process:**
- **Discovery Phase:** Use broad queries to identify key research areas and trends
- **Screening Phase:** Employ Focus mode Academic to filter scholarly sources
- **Analysis Phase:** Deep-dive into specific papers and methodologies
- **Synthesis Phase:** Use Spaces to organise findings thematically

**Citation Management:**
- Automatic source identification and citation formatting
- Cross-reference verification across multiple databases
- Impact factor and credibility assessment
- Integration with reference management systems

**Research Quality Assurance:**
- Source credibility evaluation and verification
- Methodology comparison across studies
- Data validation and fact-checking
- Peer review preparation and enhancement

**Advanced Academic Applications:**

**Systematic Reviews:**
- Comprehensive literature search across databases
- Methodology comparison and evaluation
- Data extraction and synthesis
- PRISMA-compliant reporting assistance

**Grant Writing:**
- Background research and literature foundation
- Funding landscape analysis and opportunities
- Competitive analysis and differentiation
- Budget justification and resource planning

**Collaborative Research:**
- Shared Spaces for research team coordination
- Version control for evolving research projects
- Multi-institutional collaboration support
- Knowledge sharing and transfer protocols

**Best Practices for Academic Use:**

**Verification Protocols:**
- Always verify critical information through primary sources
- Cross-check findings across multiple academic databases
- Maintain detailed citation trails and documentation
- Regular fact-checking and accuracy validation

**Ethical Considerations:**
- Proper attribution and citation practices
- Plagiarism prevention and originality verification
- Informed consent for collaborative research
- Data privacy and confidentiality protection

Perplexity transforms academic research from time-intensive literature hunting into efficient, comprehensive knowledge discovery.`,

  '6.2': `In rapidly changing business environments, timely and accurate information acquisition and analysis capabilities directly impact enterprise competitiveness and decision quality. Perplexity AI provides powerful market intelligence and analysis tools for business users.

**Market Research Applications:**

**Industry Analysis:**
- Market size and growth trend analysis
- Competitive landscape mapping and evaluation
- Regulatory environment monitoring and assessment
- Technology trend identification and impact analysis

**Customer Intelligence:**
- Consumer behaviour pattern analysis
- Demographics and psychographic profiling
- Brand perception and sentiment monitoring
- Purchase decision factor identification

**Competitive Intelligence:**
- Competitor strategy analysis and monitoring
- Product comparison and differentiation analysis
- Pricing strategy evaluation and benchmarking
- Market positioning and messaging analysis

**Strategic Business Applications:**

**Decision Support:**
- Investment opportunity evaluation and due diligence
- Risk assessment and mitigation planning
- Strategic partnership evaluation and planning
- Market entry strategy development and validation

**Operational Intelligence:**
- Supply chain monitoring and optimisation
- Vendor evaluation and comparison
- Regulatory compliance monitoring
- Crisis management and response planning

**Innovation and Development:**
- Technology scouting and evaluation
- Patent landscape analysis and freedom to operate
- Startup ecosystem monitoring and partnership opportunities
- Emerging trend identification and impact assessment

**Implementation Framework:**

**Information Architecture:**
- Establish clear research objectives and success metrics
- Design systematic monitoring and alert systems
- Create standardised reporting templates and formats
- Implement quality assurance and verification protocols

**Team Integration:**
- Train team members on effective query formulation
- Establish collaborative research workflows
- Create shared knowledge repositories and databases
- Implement regular review and update cycles

**ROI Measurement:**
- Track time savings from automated research
- Measure decision quality improvements
- Monitor competitive advantage gains
- Assess risk mitigation effectiveness

Perplexity transforms business research from reactive information gathering into proactive competitive intelligence.`,

  '6.3': `In today's AI tool-rich environment, single tools often cannot meet all needs. Learning to combine different AI tools, particularly Perplexity with ChatGPT collaboration, can create value far exceeding individual tools.

**Synergistic Tool Integration:**

**Perplexity + ChatGPT Workflow:**
- **Research Phase:** Use Perplexity for comprehensive, cited information gathering
- **Analysis Phase:** Transfer findings to ChatGPT for deep analysis and synthesis
- **Creation Phase:** Leverage ChatGPT's creative capabilities for content generation
- **Verification Phase:** Return to Perplexity for fact-checking and validation

**Complementary Strengths:**

**Perplexity Advantages:**
- Real-time information access and currency
- Comprehensive source citation and verification
- Academic and professional source prioritisation
- Fact-based, objective information delivery

**ChatGPT Advantages:**
- Creative content generation and ideation
- Complex reasoning and analytical thinking
- Conversational interface and interactivity
- Flexible output formatting and customisation

**Hybrid Workflow Examples:**

**Content Creation Process:**
1. **Research:** Perplexity for topic research and source gathering
2. **Outline:** ChatGPT for structure and creative organisation
3. **Writing:** ChatGPT for content creation and narrative development
4. **Fact-check:** Perplexity for accuracy verification and citation
5. **Refinement:** ChatGPT for editing and style improvement

**Strategic Analysis:**
1. **Data Gathering:** Perplexity for market research and competitive intelligence
2. **Pattern Recognition:** ChatGPT for trend analysis and insight synthesis
3. **Scenario Planning:** ChatGPT for strategic option development
4. **Validation:** Perplexity for assumption testing and verification

**Advanced Integration Techniques:**

**API-Based Automation:**
- Automated handoffs between platforms
- Seamless data transfer and formatting
- Quality assurance and error checking
- Workflow orchestration and management

**Knowledge Management:**
- Centralised repository for all AI interactions
- Version control and change tracking
- Team collaboration and sharing protocols
- Learning and improvement feedback loops

Hybrid AI workflows unlock unprecedented research and creation capabilities.`,

  '6.4': `We stand at the starting point of an information revolution. The rise of "Answer Engines" represents not just technological progress, but a fundamental transformation in how humans acquire and process knowledge. Understanding this trend is crucial for grasping future opportunities and challenges.

**Paradigm Shift Analysis:**

**From Search to Answers:**
- Traditional search: Query → Links → Manual synthesis
- Answer engines: Question → Direct, cited answers
- Transformation: Information location to knowledge synthesis
- Impact: Dramatic reduction in cognitive load and time investment

**Knowledge Accessibility Revolution:**
- Democratisation of expert-level information access
- Reduction of information literacy barriers
- Equalisation of research capabilities across skill levels
- Transformation of learning and education paradigms

**Future Technology Trajectory:**

**Enhanced Capabilities:**
- Multimodal integration (text, voice, video, images)
- Real-time fact verification and source validation
- Personalised knowledge recommendations
- Predictive information and trend analysis

**Emerging Applications:**
- Personal AI research assistants
- Real-time decision support systems
- Automated knowledge curation and synthesis
- Intelligent information filtering and prioritisation

**Societal Implications:**

**Positive Transformations:**
- Accelerated learning and skill development
- Enhanced decision-making quality across populations
- Reduced information inequality and digital divides
- Improved scientific and academic collaboration

**Challenges to Address:**
- Information authenticity and misinformation risks
- Over-dependence on AI-mediated knowledge
- Loss of deep research and critical thinking skills
- Privacy and intellectual property considerations

**Strategic Preparation:**

**Individual Adaptation:**
- Develop AI collaboration and prompt engineering skills
- Maintain critical thinking and verification abilities
- Build information literacy and source evaluation competencies
- Embrace lifelong learning and adaptation mindsets

**Organisational Evolution:**
- Integrate answer engines into knowledge workflows
- Develop AI governance and ethics frameworks
- Train teams on effective AI collaboration
- Establish quality assurance and verification protocols

The answer engine revolution represents humanity's next step toward augmented intelligence and enhanced knowledge capabilities.`
};

// Function to add English transcript to a specific lesson (same as before)
function addEnglishTranscript(content, lessonKey, englishTranscript) {
  const lines = content.split('\n');
  let inTargetLesson = false;
  let transcriptLineIndex = -1;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Look for the lesson title that matches our target (more specific patterns)
    if ((lessonKey === '3.1' && line.includes('基礎搜索：如何問出好問題')) ||
        (lessonKey === '3.2' && line.includes('Focus 模式深度解析')) ||
        (lessonKey === '3.3' && line.includes('上傳檔案功能')) ||
        (lessonKey === '3.4' && line.includes('Copilot 建議系統')) ||
        (lessonKey === '3.5' && line.includes('高級搜索技巧')) ||
        (lessonKey === '4.1' && line.includes('Library」入門')) ||
        (lessonKey === '4.2' && line.includes('Collections」到「Spaces')) ||
        (lessonKey === '4.3' && line.includes('建立與管理 Spaces')) ||
        (lessonKey === '4.4' && line.includes('Pages 功能')) ||
        (lessonKey === '5.1' && line.includes('Pro 訂閱方案詳解')) ||
        (lessonKey === '5.2' && line.includes('Pro Search：更深度')) ||
        (lessonKey === '5.3' && line.includes('AI 模型選擇')) ||
        (lessonKey === '5.4' && line.includes('API 整合與自動化')) ||
        (lessonKey === '6.1' && line.includes('學術研究實戰')) ||
        (lessonKey === '6.2' && line.includes('商業應用案例')) ||
        (lessonKey === '6.3' && line.includes('與其他 AI 工具的協同')) ||
        (lessonKey === '6.4' && line.includes('未來展望'))) {
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

// Apply English transcripts for remaining lessons
console.log('Adding English transcripts for chapters 3-6...');

Object.entries(remainingEnglishTranscripts).forEach(([lessonKey, englishTranscript]) => {
  console.log(`Adding transcript for lesson ${lessonKey}...`);
  content = addEnglishTranscript(content, lessonKey, englishTranscript);
});

// Write the updated content back to the file
fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Successfully added English transcripts for chapters 3-6');
console.log(`📊 Additional lessons with English transcripts: ${Object.keys(remainingEnglishTranscripts).length}`); 