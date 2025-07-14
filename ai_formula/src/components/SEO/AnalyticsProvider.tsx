import React, { useEffect, useContext, createContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SEOMetrics } from './seoTypes';

interface AnalyticsConfig {
  googleAnalyticsId?: string;
  facebookPixelId?: string;
  googleTagManagerId?: string;
  hotjarId?: string;
  enableConsent?: boolean;
  enableDebug?: boolean;
}

interface AnalyticsContextType {
  trackEvent: (eventName: string, parameters?: Record<string, any>) => void;
  trackPageView: (path: string, title?: string) => void;
  trackConversion: (conversionId: string, value?: number) => void;
  setUserProperties: (properties: Record<string, any>) => void;
  metrics: SEOMetrics;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

interface AnalyticsProviderProps {
  children: React.ReactNode;
  config: AnalyticsConfig;
}

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children, config }) => {
  const location = useLocation();
  const [metrics, setMetrics] = useState<SEOMetrics>({
    pageViews: 0,
    bounceRate: 0,
    avgSessionDuration: 0,
    conversionsRate: 0
  });

  useEffect(() => {
    // Initialize Google Analytics
    if (config.googleAnalyticsId) {
      initGoogleAnalytics(config.googleAnalyticsId);
    }

    // Initialize Google Tag Manager
    if (config.googleTagManagerId) {
      initGoogleTagManager(config.googleTagManagerId);
    }

    // Initialize Facebook Pixel
    if (config.facebookPixelId) {
      initFacebookPixel(config.facebookPixelId);
    }

    // Initialize Hotjar
    if (config.hotjarId) {
      initHotjar(config.hotjarId);
    }

    // Setup consent management
    if (config.enableConsent) {
      setupConsentManagement();
    }
  }, [config]);

  // Track page views on route change
  useEffect(() => {
    trackPageView(location.pathname + location.search, document.title);
  }, [location]);

  const initGoogleAnalytics = (gaId: string) => {
    // Google Analytics 4
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script);

    // Initialize gtag
    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) {
      (window as any).dataLayer.push(args);
    }
    (window as any).gtag = gtag;

    gtag('js', new Date());
    gtag('config', gaId, {
      page_title: document.title,
      page_location: window.location.href,
      debug_mode: config.enableDebug
    });

    if (config.enableDebug) {
      console.log('Google Analytics initialized:', gaId);
    }
  };

  const initGoogleTagManager = (gtmId: string) => {
    // Google Tag Manager
    const script = document.createElement('script');
    script.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${gtmId}');
    `;
    document.head.appendChild(script);

    // Add noscript tag to body
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
    document.body.appendChild(noscript);

    if (config.enableDebug) {
      console.log('Google Tag Manager initialized:', gtmId);
    }
  };

  const initFacebookPixel = (pixelId: string) => {
    // Facebook Pixel
    const script = document.createElement('script');
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${pixelId}');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(script);

    // Add noscript tag
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1" />`;
    document.body.appendChild(noscript);

    if (config.enableDebug) {
      console.log('Facebook Pixel initialized:', pixelId);
    }
  };

  const initHotjar = (hjid: string) => {
    // Hotjar
    const script = document.createElement('script');
    script.innerHTML = `
      (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:${hjid},hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    `;
    document.head.appendChild(script);

    if (config.enableDebug) {
      console.log('Hotjar initialized:', hjid);
    }
  };

  const setupConsentManagement = () => {
    // Basic consent management
    const hasConsent = localStorage.getItem('analytics-consent') === 'true';
    
    if (!hasConsent) {
      showConsentBanner();
    }
  };

  const showConsentBanner = () => {
    const banner = document.createElement('div');
    banner.className = 'fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50';
    banner.innerHTML = `
      <div class="max-w-4xl mx-auto flex items-center justify-between">
        <p class="text-sm">We use cookies to analyze website traffic and optimize your experience. By accepting our use of cookies, your data will be aggregated with all other user data.</p>
        <div class="flex gap-2">
          <button id="consent-accept" class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm">Accept</button>
          <button id="consent-decline" class="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-sm">Decline</button>
        </div>
      </div>
    `;
    document.body.appendChild(banner);

    // Handle consent actions
    document.getElementById('consent-accept')?.addEventListener('click', () => {
      localStorage.setItem('analytics-consent', 'true');
      banner.remove();
      // Reinitialize analytics with consent
      if (config.googleAnalyticsId) {
        (window as any).gtag('consent', 'update', {
          analytics_storage: 'granted'
        });
      }
    });

    document.getElementById('consent-decline')?.addEventListener('click', () => {
      localStorage.setItem('analytics-consent', 'false');
      banner.remove();
    });
  };

  const trackEvent = (eventName: string, parameters: Record<string, any> = {}) => {
    // Google Analytics
    if (config.googleAnalyticsId && (window as any).gtag) {
      (window as any).gtag('event', eventName, parameters);
    }

    // Facebook Pixel
    if (config.facebookPixelId && (window as any).fbq) {
      (window as any).fbq('track', eventName, parameters);
    }

    // Google Tag Manager
    if (config.googleTagManagerId && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: eventName,
        ...parameters
      });
    }

    if (config.enableDebug) {
      console.log('Event tracked:', eventName, parameters);
    }
  };

  const trackPageView = (path: string, title?: string) => {
    // Google Analytics
    if (config.googleAnalyticsId && (window as any).gtag) {
      (window as any).gtag('config', config.googleAnalyticsId, {
        page_path: path,
        page_title: title || document.title
      });
    }

    // Facebook Pixel
    if (config.facebookPixelId && (window as any).fbq) {
      (window as any).fbq('track', 'PageView');
    }

    // Update metrics
    setMetrics(prev => ({
      ...prev,
      pageViews: prev.pageViews + 1
    }));

    if (config.enableDebug) {
      console.log('Page view tracked:', path, title);
    }
  };

  const trackConversion = (conversionId: string, value?: number) => {
    const conversionData = {
      conversion_id: conversionId,
      ...(value && { value, currency: 'HKD' })
    };

    trackEvent('conversion', conversionData);

    // Update conversion rate
    setMetrics(prev => ({
      ...prev,
      conversionsRate: prev.conversionsRate + 1
    }));
  };

  const setUserProperties = (properties: Record<string, any>) => {
    // Google Analytics
    if (config.googleAnalyticsId && (window as any).gtag) {
      (window as any).gtag('config', config.googleAnalyticsId, {
        user_properties: properties
      });
    }

    // Facebook Pixel
    if (config.facebookPixelId && (window as any).fbq) {
      (window as any).fbq('set', properties);
    }

    if (config.enableDebug) {
      console.log('User properties set:', properties);
    }
  };

  const value: AnalyticsContextType = {
    trackEvent,
    trackPageView,
    trackConversion,
    setUserProperties,
    metrics
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = (): AnalyticsContextType => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};

// Higher-order component for tracking page views
export const withAnalytics = <P extends object>(
  Component: React.ComponentType<P>,
  eventName?: string
) => {
  return (props: P) => {
    const { trackEvent } = useAnalytics();
    
    useEffect(() => {
      if (eventName) {
        trackEvent(eventName, { component: Component.name });
      }
    }, []);

    return <Component {...props} />;
  };
};

// Analytics hooks
export const usePageView = (path: string, title?: string) => {
  const { trackPageView } = useAnalytics();
  
  useEffect(() => {
    trackPageView(path, title);
  }, [path, title]);
};

export const useEvent = (eventName: string, parameters?: Record<string, any>) => {
  const { trackEvent } = useAnalytics();
  
  return () => trackEvent(eventName, parameters);
};

export default AnalyticsProvider; 
