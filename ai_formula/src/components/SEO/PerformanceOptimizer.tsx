import React, { useEffect, useState } from 'react';
import { PerformanceMetrics } from './seoTypes';

interface PerformanceOptimizerProps {
  children: React.ReactNode;
  enableLazyLoading?: boolean;
  enableImageOptimization?: boolean;
  enableResourcePreloading?: boolean;
  onMetricsUpdate?: (metrics: PerformanceMetrics) => void;
}

export const PerformanceOptimizer: React.FC<PerformanceOptimizerProps> = ({
  children,
  enableLazyLoading = true,
  enableImageOptimization = true,
  enableResourcePreloading = true,
  onMetricsUpdate
}) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: 0,
    lcp: 0,
    fid: 0,
    cls: 0,
    ttfb: 0
  });

  useEffect(() => {
    // Initialize performance optimizations
    if (enableLazyLoading) {
      initLazyLoading();
    }
    
    if (enableImageOptimization) {
      initImageOptimization();
    }
    
    if (enableResourcePreloading) {
      initResourcePreloading();
    }

    // Measure performance metrics
    measurePerformanceMetrics();
    
    // Set up performance observer
    setupPerformanceObserver();
  }, [enableLazyLoading, enableImageOptimization, enableResourcePreloading]);

  const initLazyLoading = () => {
    // Lazy loading for images
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = img.dataset.src || '';
            img.classList.add('fade-in');
            imageObserver.unobserve(img);
          }
        });
      });

      lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Lazy loading for iframes
    const lazyIframes = document.querySelectorAll('iframe[data-src]');
    
    if ('IntersectionObserver' in window) {
      const iframeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const iframe = entry.target as HTMLIFrameElement;
            iframe.src = iframe.dataset.src || '';
            iframeObserver.unobserve(iframe);
          }
        });
      });

      lazyIframes.forEach(iframe => iframeObserver.observe(iframe));
    }
  };

  const initImageOptimization = () => {
    // Convert images to WebP format if supported
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
      if (img.src && !img.src.includes('webp')) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (ctx && canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0) {
          // Browser supports WebP
          img.src = img.src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        }
      }
    });

    // Add responsive image attributes
    images.forEach(img => {
      if (!img.loading) {
        img.loading = 'lazy';
      }
      
      if (!img.decoding) {
        img.decoding = 'async';
      }
    });
  };

  const initResourcePreloading = () => {
    // Preload critical resources
    const criticalResources = [
      { href: '/assets/css/critical.css', as: 'style' },
      { href: '/assets/fonts/main.woff2', as: 'font', type: 'font/woff2' },
      { href: '/assets/js/main.js', as: 'script' }
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      if (resource.type) {
        link.type = resource.type;
      }
      if (resource.as === 'font') {
        link.crossOrigin = 'anonymous';
      }
      document.head.appendChild(link);
    });

    // Preconnect to external domains
    const preconnectDomains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://www.google-analytics.com',
      'https://www.googletagmanager.com'
    ];

    preconnectDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  };

  const measurePerformanceMetrics = () => {
    // Measure Core Web Vitals
    if ('PerformanceObserver' in window) {
      // First Contentful Paint (FCP)
      const fcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
        if (fcpEntry) {
          setMetrics(prev => ({ ...prev, fcp: fcpEntry.startTime }));
        }
      });
      
      fcpObserver.observe({ entryTypes: ['paint'] });

      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }));
      });
      
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach(entry => {
          setMetrics(prev => ({ ...prev, fid: entry.processingStart - entry.startTime }));
        });
      });
      
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift (CLS)
      const clsObserver = new PerformanceObserver((entryList) => {
        let clsValue = 0;
        entryList.getEntries().forEach(entry => {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        });
        setMetrics(prev => ({ ...prev, cls: clsValue }));
      });
      
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    }

    // Time to First Byte (TTFB)
    if (performance.timing) {
      const ttfb = performance.timing.responseStart - performance.timing.navigationStart;
      setMetrics(prev => ({ ...prev, ttfb }));
    }
  };

  const setupPerformanceObserver = () => {
    // Monitor resource loading
    if ('PerformanceObserver' in window) {
      const resourceObserver = new PerformanceObserver((entryList) => {
        entryList.getEntries().forEach(entry => {
          // Log slow resources
          if (entry.duration > 1000) {
            console.warn('Slow resource detected:', entry.name, entry.duration);
          }
        });
      });
      
      resourceObserver.observe({ entryTypes: ['resource'] });
    }
  };

  useEffect(() => {
    if (onMetricsUpdate) {
      onMetricsUpdate(metrics);
    }
  }, [metrics, onMetricsUpdate]);

  // Optimize critical rendering path
  useEffect(() => {
    // Remove unused CSS
    const unusedStyles = document.querySelectorAll('style[data-emotion], style[data-styled]');
    unusedStyles.forEach(style => {
      if (style.innerHTML.length === 0) {
        style.remove();
      }
    });

    // Optimize font loading
    const fontLinks = document.querySelectorAll('link[rel="stylesheet"][href*="fonts"]');
    fontLinks.forEach(link => {
      if (!link.hasAttribute('media')) {
        link.setAttribute('media', 'print');
        link.setAttribute('onload', "this.media='all'");
      }
    });
  }, []);

  return (
    <div className="performance-optimized">
      {children}
      
      {/* Performance metrics display (only in development) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-black bg-opacity-80 text-white p-4 rounded-lg text-xs z-50">
          <h4 className="font-bold mb-2">Performance Metrics</h4>
          <div className="space-y-1">
            <div>FCP: {metrics.fcp.toFixed(2)}ms</div>
            <div>LCP: {metrics.lcp.toFixed(2)}ms</div>
            <div>FID: {metrics.fid.toFixed(2)}ms</div>
            <div>CLS: {metrics.cls.toFixed(4)}</div>
            <div>TTFB: {metrics.ttfb.toFixed(2)}ms</div>
          </div>
        </div>
      )}
    </div>
  );
};

// Utility functions for performance optimization
export const performanceUtils = {
  // Prefetch resource
  prefetchResource: (url: string) => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
  },

  // Preload critical resource
  preloadResource: (url: string, type: string) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    link.as = type;
    document.head.appendChild(link);
  },

  // Defer non-critical JavaScript
  deferScript: (src: string) => {
    const script = document.createElement('script');
    script.src = src;
    script.defer = true;
    document.body.appendChild(script);
  },

  // Lazy load component
  lazyLoadComponent: (componentFactory: () => Promise<any>) => {
    return React.lazy(componentFactory);
  },

  // Optimize images
  optimizeImage: (src: string, width?: number, height?: number) => {
    const params = new URLSearchParams();
    if (width) params.append('w', width.toString());
    if (height) params.append('h', height.toString());
    params.append('q', '80');
    params.append('f', 'webp');
    
    return `${src}?${params.toString()}`;
  },

  // Critical CSS inline
  inlineCriticalCSS: (css: string) => {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  },

  // Service Worker registration
  registerServiceWorker: async () => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered:', registration);
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    }
  }
};

export default PerformanceOptimizer; 