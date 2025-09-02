import React, { useMemo } from 'react';
import { ContentRendererProps } from '../../types/courseTypes';

// Content sanitization and parsing utilities
const sanitizeContent = (content: string): string => {
  // Remove any potential script tags and dangerous attributes
  return content
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/javascript:/gi, '');
};

const parseMarkdownToHTML = (content: string): string => {
  return content
    // Headers
    .replace(/^#### (.+)$/gm, '<h4 class="text-lg font-semibold ai-text-success mt-6 mb-3">$1</h4>')
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold ai-text-info mt-8 mb-4">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold ai-text-primary mt-10 mb-5 border-b-2 ai-border-primary pb-2">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold ai-text-primary mt-12 mb-6 text-center border-b-3 ai-border-primary pb-3">$1</h1>')
    
    // Bold text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold ai-text-accent">$1</strong>')
    
    // Code blocks
    .replace(/```([\s\S]*?)```/g, '<pre class="ai-bg-dark border border-gray-600 rounded-lg p-4 my-4 overflow-x-auto"><code class="ai-text-success text-sm font-mono whitespace-pre-wrap">$1</code></pre>')
    
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="ai-bg-dark-medium ai-text-primary px-2 py-1 rounded text-sm font-mono">$1</code>')
    
    // List items
    .replace(/^- (.+)$/gm, '<li class="ml-4 mb-2 text-gray-200">??$1</li>')
    
    // Line breaks
    .replace(/\n/g, '<br>');
};

// Enhanced content renderer with proper styling
const ContentRenderer: React.FC<ContentRendererProps> = ({ 
  content, 
  language, 
  partNumber,
  onImageError,
  onVideoError 
}) => {
  const processedContent = useMemo(() => {
    const sanitized = sanitizeContent(content);
    const parsed = parseMarkdownToHTML(sanitized);
    return parsed;
  }, [content]);

  // Apply enhanced styling for Part 4 (Midjourney keywords)
  const contentClass = useMemo(() => {
    const baseClass = "prose prose-invert max-w-none";
    
    if (partNumber === 4) {
      return `${baseClass} midjourney-enhanced-content`;
    }
    
    return baseClass;
  }, [partNumber]);

  return (
    <div className={contentClass}>
      <div 
        className="leading-relaxed text-gray-200"
        dangerouslySetInnerHTML={{ __html: processedContent }}
      />
      
      {/* Add enhanced styling for Part 4 */}
      {partNumber === 4 && (
        <style dangerouslySetInnerHTML={{
          __html: `
            .midjourney-enhanced-content h1 {
              font-size: 2.5rem !important;
              color: var(--ai-formula-primary) !important;
              margin-top: 2rem !important;
              margin-bottom: 1.5rem !important;
              border-bottom: 3px solid var(--ai-formula-primary) !important;
              padding-bottom: 0.75rem !important;
              text-align: center !important;
            }
            .midjourney-enhanced-content h2 {
              font-size: 2.25rem !important;
              color: var(--ai-formula-primary) !important;
              margin-top: 2.5rem !important;
              margin-bottom: 1.25rem !important;
              border-bottom: 2px solid var(--ai-formula-primary) !important;
              padding-bottom: 0.5rem !important;
            }
            .midjourney-enhanced-content h3 {
              font-size: 1.75rem !important;
              color: var(--ai-formula-info) !important;
              margin-top: 2rem !important;
              margin-bottom: 1rem !important;
              font-weight: 700 !important;
            }
            .midjourney-enhanced-content h4 {
              font-size: 1.35rem !important;
              color: var(--ai-formula-success) !important;
              margin-top: 1.5rem !important;
              margin-bottom: 0.75rem !important;
              font-weight: 600 !important;
            }
            .midjourney-enhanced-content pre {
              background-color: var(--ai-formula-dark) !important;
              border: 2px solid var(--ai-formula-dark-medium) !important;
              border-radius: 0.75rem !important;
              padding: 1.5rem !important;
              margin: 1.5rem 0 !important;
              overflow-x: auto !important;
              white-space: pre-wrap !important;
              word-wrap: break-word !important;
              max-width: 100% !important;
            }
            .midjourney-enhanced-content pre code {
              background-color: transparent !important;
              padding: 0 !important;
              color: var(--ai-formula-success) !important;
              border: none !important;
              white-space: pre-wrap !important;
              word-wrap: break-word !important;
              font-size: 0.9rem !important;
              line-height: 1.5 !important;
            }
            .midjourney-enhanced-content p {
              font-size: 1.05rem !important;
              line-height: 1.6 !important;
              margin-bottom: 1rem !important;
            }
          `
        }} />
      )}
    </div>
  );
};

export default React.memo(ContentRenderer); 
