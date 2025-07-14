// 網站地圖生成器
export interface SitemapUrl {
  url: string;
  lastModified: Date;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export class SitemapGenerator {
  private baseUrl: string;
  private urls: SitemapUrl[] = [];

  constructor(baseUrl: string = 'https://ai-formula.com') {
    this.baseUrl = baseUrl;
  }

  // 添加靜態頁面
  addStaticPages() {
    const staticPages = [
      { path: '/', priority: 1.0, changeFreq: 'weekly' },
      { path: '/courses', priority: 0.9, changeFreq: 'weekly' },
      { path: '/blog', priority: 0.9, changeFreq: 'daily' },
      { path: '/about', priority: 0.7, changeFreq: 'monthly' },
    ];

    staticPages.forEach(page => {
      this.urls.push({
        url: `${this.baseUrl}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFreq as any,
        priority: page.priority
      });
    });
  }

  // 添加課程頁面
  addCoursePaths(courses: Array<{slug: string; updatedAt?: Date}>) {
    courses.forEach(course => {
      this.urls.push({
        url: `${this.baseUrl}/courses/${course.slug}`,
        lastModified: course.updatedAt || new Date(),
        changeFrequency: 'weekly',
        priority: 0.8
      });
    });
  }

  // 添加網誌文章
  addBlogPosts(posts: Array<{slug: string; updatedAt?: Date}>) {
    posts.forEach(post => {
      this.urls.push({
        url: `${this.baseUrl}/blog/${post.slug}`,
        lastModified: post.updatedAt || new Date(),
        changeFrequency: 'monthly',
        priority: 0.6
      });
    });
  }

  // 生成XML格式的sitemap
  generateXML(): string {
    const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n';
    const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    const urlsetClose = '</urlset>';

    const urlEntries = this.urls.map(url => {
      return `  <url>
    <loc>${url.url}</loc>
    <lastmod>${url.lastModified.toISOString().split('T')[0]}</lastmod>
    <changefreq>${url.changeFrequency}</changefreq>
    <priority>${url.priority}</priority>
  </url>`;
    }).join('\n');

    return xmlHeader + urlsetOpen + urlEntries + '\n' + urlsetClose;
  }

  // 生成JSON格式的sitemap（用於開發）
  generateJSON(): string {
    return JSON.stringify(this.urls, null, 2);
  }

  // 清空URL列表
  clear() {
    this.urls = [];
  }

  // 獲取所有URL
  getUrls(): SitemapUrl[] {
    return this.urls;
  }
}

// 使用範例
export const createSitemap = async () => {
  const generator = new SitemapGenerator();
  
  // 添加靜態頁面
  generator.addStaticPages();
  
  // 這裡可以從數據庫或API獲取課程和文章數據
  // const courses = await fetchCourses();
  // const posts = await fetchBlogPosts();
  // generator.addCoursePaths(courses);
  // generator.addBlogPosts(posts);
  
  return generator.generateXML();
};

export default SitemapGenerator; 