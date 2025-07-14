import React, { useState, useEffect } from 'react';
import { SitemapUrl } from './seoTypes';
import { seoUtils } from './seoUtils';

interface SitemapGeneratorProps {
  baseUrl: string;
  pages: {
    url: string;
    lastmod?: string;
    priority?: number;
    changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  }[];
  autoGenerate?: boolean;
}

export const SitemapGenerator: React.FC<SitemapGeneratorProps> = ({
  baseUrl,
  pages,
  autoGenerate = true
}) => {
  const [sitemapXml, setSitemapXml] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSitemap = async () => {
    setIsGenerating(true);
    
    try {
      // Generate sitemap URLs
      const sitemapUrls: SitemapUrl[] = pages.map(page => ({
        loc: `${baseUrl}${page.url}`,
        lastmod: page.lastmod || new Date().toISOString().split('T')[0],
        changefreq: page.changefreq || 'weekly',
        priority: page.priority || 0.8
      }));

      // Generate XML
      const xml = generateSitemapXml(sitemapUrls);
      setSitemapXml(xml);
      
      // Save to public directory (in production, this would be server-side)
      if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
        // For client-side, we can trigger a download
        const blob = new Blob([xml], { type: 'application/xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'sitemap.xml';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error generating sitemap:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateSitemapXml = (urls: SitemapUrl[]): string => {
    const urlElements = urls.map(url => `
    <url>
      <loc>${url.loc}</loc>
      <lastmod>${url.lastmod}</lastmod>
      <changefreq>${url.changefreq}</changefreq>
      <priority>${url.priority}</priority>
    </url>`).join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urlElements}
</urlset>`;
  };

  const generateRobotsTxt = (): string => {
    return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Disallow admin and private areas
Disallow: /admin/
Disallow: /private/
Disallow: /api/
Disallow: /_next/
Disallow: /node_modules/

# Allow important directories
Allow: /assets/
Allow: /images/
Allow: /css/
Allow: /js/`;
  };

  const downloadRobotsTxt = () => {
    const content = generateRobotsTxt();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'robots.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (autoGenerate && pages.length > 0) {
      generateSitemap();
    }
  }, [pages, baseUrl, autoGenerate]);

  return (
    <div className="sitemap-generator p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">SEO Sitemap Generator</h2>
      
      <div className="mb-6">
        <p className="text-gray-600 mb-4">
          Generate XML sitemap and robots.txt for better search engine crawling and indexing.
        </p>
        
        <div className="stats grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="stat bg-blue-50 p-4 rounded-lg">
            <div className="stat-title text-sm text-gray-600">Total Pages</div>
            <div className="stat-value text-2xl font-bold text-blue-600">{pages.length}</div>
          </div>
          <div className="stat bg-green-50 p-4 rounded-lg">
            <div className="stat-title text-sm text-gray-600">Base URL</div>
            <div className="stat-value text-sm font-medium text-green-600">{baseUrl}</div>
          </div>
          <div className="stat bg-purple-50 p-4 rounded-lg">
            <div className="stat-title text-sm text-gray-600">Last Generated</div>
            <div className="stat-value text-sm font-medium text-purple-600">
              {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      <div className="actions flex flex-wrap gap-4 mb-6">
        <button
          onClick={generateSitemap}
          disabled={isGenerating}
          className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg disabled:opacity-50"
        >
          {isGenerating ? 'Generating...' : 'Generate Sitemap'}
        </button>
        
        <button
          onClick={downloadRobotsTxt}
          className="btn btn-secondary bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg"
        >
          Download robots.txt
        </button>
      </div>

      {sitemapXml && (
        <div className="preview">
          <h3 className="text-lg font-semibold mb-2">Generated Sitemap Preview</h3>
          <div className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm text-gray-800 whitespace-pre-wrap">
              {sitemapXml.substring(0, 1000)}
              {sitemapXml.length > 1000 && '...'}
            </pre>
          </div>
        </div>
      )}

      <div className="page-list mt-6">
        <h3 className="text-lg font-semibold mb-3">Pages in Sitemap</h3>
        <div className="space-y-2">
          {pages.map((page, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="font-medium">{page.url}</div>
                <div className="text-sm text-gray-600">
                  Priority: {page.priority || 0.8} | 
                  Changefreq: {page.changefreq || 'weekly'} | 
                  Last Modified: {page.lastmod || 'Today'}
                </div>
              </div>
              <div className="text-sm text-blue-600 hover:text-blue-800">
                <a href={`${baseUrl}${page.url}`} target="_blank" rel="noopener noreferrer">
                  Visit ??
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SitemapGenerator; 
