import React, { useEffect } from 'react';
import { SiteData, DEFAULT_SEO_CONFIG } from '../data/defaultSiteData';
import { Product, Article, Region } from '../types';
import { buildPageMetadata, generateStructuredDataGraph } from '../utils/seoHelper';

interface SeoHeadProps {
  pageId: string;
  siteData: SiteData;
  activeItem?: {
    type: 'product' | 'article' | 'region';
    data: Product | Article | Region;
  };
}

export const SeoHead: React.FC<SeoHeadProps> = ({ pageId, siteData, activeItem }) => {
  useEffect(() => {
    const meta = buildPageMetadata(pageId, siteData, activeItem);
    const seo = siteData.seo || DEFAULT_SEO_CONFIG;

    // 1. Update Document Title
    document.title = meta.title;

    // Helper to set or create meta tag
    const setMetaTag = (attrName: 'name' | 'property', attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper to set or create link tag
    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // 2. Standard Meta Tags
    setMetaTag('name', 'description', meta.description);
    setMetaTag('name', 'keywords', meta.keywords);
    setMetaTag('name', 'robots', meta.robots);
    setMetaTag('name', 'author', meta.author);
    setMetaTag('name', 'publisher', meta.publisher);
    setMetaTag('name', 'theme-color', seo.themeColor || '#2D4B39');

    // 3. Canonical Link
    setLinkTag('canonical', meta.canonical);

    // 4. OpenGraph Tags
    setMetaTag('property', 'og:title', meta.title);
    setMetaTag('property', 'og:description', meta.description);
    setMetaTag('property', 'og:url', meta.canonical);
    setMetaTag('property', 'og:image', meta.ogImage);
    setMetaTag('property', 'og:type', meta.ogType);
    setMetaTag('property', 'og:site_name', 'VSA LAB - Vườn Tinh Dầu');
    setMetaTag('property', 'og:locale', seo.locale || 'vi_VN');

    // 5. Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', meta.title);
    setMetaTag('name', 'twitter:description', meta.description);
    setMetaTag('name', 'twitter:image', meta.ogImage);
    if (seo.twitterHandle) {
      setMetaTag('name', 'twitter:site', seo.twitterHandle);
    }

    // 6. Verification codes if provided by admin
    if (seo.googleSearchConsoleCode) {
      setMetaTag('name', 'google-site-verification', seo.googleSearchConsoleCode);
    }
    if (seo.bingVerificationCode) {
      setMetaTag('name', 'msvalidate.01', seo.bingVerificationCode);
    }

    // 7. Inject / Update Schema.org JSON-LD Graph
    const jsonLdGraph = generateStructuredDataGraph(meta, siteData, activeItem);
    let scriptElement = document.getElementById('vsalab-schema-graph') as HTMLScriptElement | null;
    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.id = 'vsalab-schema-graph';
      scriptElement.type = 'application/ld+json';
      document.head.appendChild(scriptElement);
    }
    scriptElement.textContent = JSON.stringify(jsonLdGraph, null, 2);

    // 8. Google Analytics 4 integration if ID provided
    if (seo.googleAnalyticsId && typeof window !== 'undefined') {
      const gaId = seo.googleAnalyticsId;
      if (!document.getElementById('vsalab-ga4-script')) {
        const gaScript = document.createElement('script');
        gaScript.id = 'vsalab-ga4-script';
        gaScript.async = true;
        gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
        document.head.appendChild(gaScript);

        const inlineGa = document.createElement('script');
        inlineGa.id = 'vsalab-ga4-inline';
        inlineGa.textContent = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { send_page_view: false });
        `;
        document.head.appendChild(inlineGa);
      }
      // Track page view on dynamic navigation
      if ((window as any).gtag) {
        (window as any).gtag('event', 'page_view', {
          page_title: meta.title,
          page_location: meta.canonical,
        });
      }
    }

    // 9. Google Tag Manager integration if GTM ID provided
    if (seo.googleTagManagerId && typeof window !== 'undefined') {
      const gtmId = seo.googleTagManagerId;
      if (!document.getElementById('vsalab-gtm-script')) {
        const gtmScript = document.createElement('script');
        gtmScript.id = 'vsalab-gtm-script';
        gtmScript.textContent = `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmId}');
        `;
        document.head.appendChild(gtmScript);
      }
    }
  }, [pageId, siteData, activeItem]);

  return null;
};
