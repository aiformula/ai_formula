import React from 'react';
import { Helmet } from 'react-helmet-async';
import { BlogPost } from '@/types/blogTypes';

interface BlogTemplateProps {
  post: BlogPost;
  children: React.ReactNode;
}

export const BlogTemplate: React.FC<BlogTemplateProps> = ({ post, children }) => {
  return (
    <>
      {/* SEO優化 */}
      <Helmet>
        <title>{post.title} | AI Formula Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={post.tags?.join(', ')} />
        <meta name="author" content={post.author} />
        <meta property="article:published_time" content={post.publishedAt} />
        <meta property="article:modified_time" content={post.updatedAt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.featuredImage} />
        <meta property="og:url" content={`https://ai-formula.com/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        <link rel="canonical" href={`https://ai-formula.com/blog/${post.slug}`} />
        
        {/* 結構化數據 */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "image": post.featuredImage,
            "author": {
              "@type": "Person",
              "name": post.author
            },
            "publisher": {
              "@type": "Organization",
              "name": "AI Formula",
              "logo": {
                "@type": "ImageObject",
                "url": "https://ai-formula.com/logo.png"
              }
            },
            "datePublished": post.publishedAt,
            "dateModified": post.updatedAt,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://ai-formula.com/blog/${post.slug}`
            }
          })}
        </script>
      </Helmet>

      {/* 文章標準結構 */}
      <article className="blog-template">
        {/* 麵包屑導航 */}
        <nav className="breadcrumb" aria-label="breadcrumb">
          <ol className="breadcrumb-list">
            <li><a href="/">首頁</a></li>
            <li><a href="/blog">網誌</a></li>
            <li aria-current="page">{post.title}</li>
          </ol>
        </nav>

        {/* 文章標題區域 */}
        <header className="blog-header">
          <h1 className="blog-title">{post.title}</h1>
          <div className="blog-meta">
            <span className="blog-author">作者：{post.author}</span>
            <time className="blog-date" dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString('zh-HK')}
            </time>
            <span className="blog-reading-time">{post.readingTime} 分鐘閱讀</span>
          </div>
          <div className="blog-tags">
            {post.tags?.map(tag => (
              <span key={tag} className="blog-tag">{tag}</span>
            ))}
          </div>
        </header>

        {/* 特色圖片 */}
        {post.featuredImage && (
          <figure className="blog-featured-image">
            <img src={post.featuredImage} alt={post.title} />
          </figure>
        )}

        {/* 文章內容 */}
        <main className="blog-content">
          {children}
        </main>

        {/* 文章底部 */}
        <footer className="blog-footer">
          <div className="blog-share">
            <h3>分享文章</h3>
            {/* 社交分享按鈕 */}
          </div>
          
          <div className="blog-related">
            <h3>相關文章</h3>
            {/* 相關文章推薦 */}
          </div>
        </footer>
      </article>
    </>
  );
};

export default BlogTemplate; 