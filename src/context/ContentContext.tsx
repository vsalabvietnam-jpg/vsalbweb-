import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { Product, Region, ProcessStep, Article } from '../types';
import { SiteSeoData, PageSeoConfig } from '../types/seo';
import {
  DEFAULT_SITE_DATA,
  SiteData,
  SiteTexts,
} from '../data/defaultSiteData';
import { getArticleRealtimeDate } from '../utils/dateHelper';

export type { SiteData, SiteTexts };
export { DEFAULT_SITE_DATA };

const STORAGE_KEY = 'vsalab_site_content_v1';
const STORAGE_VER_KEY = 'vsalab_site_content_version';
const AUTH_STORAGE_KEY = 'vsalab_admin_authenticated';

export type SyncStatus = 'synced' | 'syncing' | 'offline' | 'error';

interface ContentContextType {
  siteData: SiteData;
  isAdmin: boolean;
  isCmsOpen: boolean;
  activeCmsTab: string;
  isLoginModalOpen: boolean;
  syncStatus: SyncStatus;
  lastSyncedTime: string | null;
  login: (user: string, pass: string) => { success: boolean; message?: string };
  logout: () => void;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  openCms: (tab?: string) => void;
  closeCms: () => void;
  updateSiteData: (updater: (prev: SiteData) => SiteData) => void;
  updateTextSection: <K extends keyof SiteTexts>(
    section: K,
    data: Partial<SiteTexts[K]>
  ) => void;
  updateProduct: (product: Product) => void;
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateRegion: (region: Region) => void;
  updateProcessStep: (step: ProcessStep) => void;
  updateArticle: (article: Article) => void;
  updateSeoConfig: (seoData: Partial<SiteSeoData>) => void;
  updatePageSeo: (pageId: string, pageSeo: Partial<PageSeoConfig>) => void;
  pingIndexNow: () => Promise<boolean>;
  saveAllNow: () => Promise<boolean>;
  resetToDefault: () => Promise<void>;
  exportDataJson: () => string;
  importDataJson: (jsonString: string) => boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // 1. Initial State from localStorage (instant rendering cache) or fallback
  const [siteData, setSiteData] = useState<SiteData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Combine saved articles with new default articles, filtering removed ones
        const savedArticlesList = (parsed.articles || DEFAULT_SITE_DATA.articles)
          .filter((a: Article) => a && a.id !== 'moi-mien-dat-mot-su-menh');
        const savedIds = new Set(savedArticlesList.map((a: Article) => a.id));
        const mergedArticles = [
          ...savedArticlesList,
          ...DEFAULT_SITE_DATA.articles.filter((da) => !savedIds.has(da.id))
        ].map((a: Article) => {
          const defaultArt = DEFAULT_SITE_DATA.articles.find((da) => da.id === a.id);
          return {
            ...a,
            gallery: defaultArt?.gallery || a.gallery,
            date: getArticleRealtimeDate(a.id, a.date),
          };
        });
        const updatedRegions = (parsed.regions || DEFAULT_SITE_DATA.regions).map((r: Region) => {
          if (r.id === 'ninh-binh') {
            const defNb = DEFAULT_SITE_DATA.regions.find((dr) => dr.id === 'ninh-binh');
            if (defNb) return { ...r, ...defNb };
          }
          return r;
        });
        return {
          texts: { ...DEFAULT_SITE_DATA.texts, ...(parsed.texts || {}) },
          products: parsed.products?.length ? parsed.products : DEFAULT_SITE_DATA.products,
          regions: updatedRegions.length ? updatedRegions : DEFAULT_SITE_DATA.regions,
          processSteps: parsed.processSteps?.length
            ? parsed.processSteps
            : DEFAULT_SITE_DATA.processSteps,
          articles: mergedArticles.length ? mergedArticles : DEFAULT_SITE_DATA.articles,
          seo: parsed.seo || DEFAULT_SITE_DATA.seo,
        };
      }
    } catch (e) {
      console.error('Error loading saved site data from localStorage:', e);
    }
    return DEFAULT_SITE_DATA;
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCmsOpen, setIsCmsOpen] = useState(false);
  const [activeCmsTab, setActiveCmsTab] = useState<string>('hero');

  // Real-time synchronization states
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('synced');
  const [lastSyncedTime, setLastSyncedTime] = useState<string | null>(() => {
    return new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  });

  // Tracking current version to prevent loopback overwrites
  const currentVersionRef = useRef<number>(
    (() => {
      try {
        const savedVer = localStorage.getItem(STORAGE_VER_KEY);
        return savedVer ? parseInt(savedVer, 10) : 0;
      } catch {
        return 0;
      }
    })()
  );

  const siteDataRef = useRef<SiteData>(siteData);
  useEffect(() => {
    siteDataRef.current = siteData;
  }, [siteData]);

  // Persist to local storage helper
  const persistLocally = (data: SiteData, ver?: number) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      if (ver) {
        localStorage.setItem(STORAGE_VER_KEY, ver.toString());
        currentVersionRef.current = ver;
      }
    } catch (e) {
      console.error('Error persisting site data to localStorage:', e);
    }
  };

  // Push updates to server with debounce
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const pushToServer = useCallback(async (dataToSync: SiteData) => {
    setSyncStatus('syncing');
    try {
      const res = await fetch('/api/site-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: dataToSync }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }

      const resJson = await res.json();
      if (resJson.success) {
        if (resJson.version) {
          currentVersionRef.current = resJson.version;
          localStorage.setItem(STORAGE_VER_KEY, resJson.version.toString());
        }
        setSyncStatus('synced');
        setLastSyncedTime(new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      } else {
        setSyncStatus('error');
      }
    } catch (err) {
      console.warn('Network sync notice: Server could not be reached, local changes kept.', err);
      setSyncStatus('offline');
    }
  }, []);

  const triggerDebouncedSync = useCallback((nextData: SiteData) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      pushToServer(nextData);
    }, 400);
  }, [pushToServer]);

  // Core updater function
  const updateSiteData = useCallback((updater: (prev: SiteData) => SiteData) => {
    setSiteData((prev) => {
      const next = updater(prev);
      persistLocally(next);
      triggerDebouncedSync(next);
      return next;
    });
  }, [triggerDebouncedSync]);

  const updateTextSection = useCallback(<K extends keyof SiteTexts>(
    section: K,
    data: Partial<SiteTexts[K]>
  ) => {
    updateSiteData((prev) => ({
      ...prev,
      texts: {
        ...prev.texts,
        [section]: {
          ...prev.texts[section],
          ...data,
        },
      },
    }));
  }, [updateSiteData]);

  const updateProduct = useCallback((product: Product) => {
    updateSiteData((prev) => ({
      ...prev,
      products: prev.products.map((p) => (p.id === product.id ? product : p)),
    }));
  }, [updateSiteData]);

  const addProduct = useCallback((product: Product) => {
    updateSiteData((prev) => ({
      ...prev,
      products: [product, ...prev.products],
    }));
  }, [updateSiteData]);

  const deleteProduct = useCallback((id: string) => {
    updateSiteData((prev) => ({
      ...prev,
      products: prev.products.filter((p) => p.id !== id),
    }));
  }, [updateSiteData]);

  const updateRegion = useCallback((region: Region) => {
    updateSiteData((prev) => ({
      ...prev,
      regions: prev.regions.map((r) => (r.id === region.id ? region : r)),
    }));
  }, [updateSiteData]);

  const updateProcessStep = useCallback((step: ProcessStep) => {
    updateSiteData((prev) => ({
      ...prev,
      processSteps: prev.processSteps.map((s) =>
        s.number === step.number ? step : s
      ),
    }));
  }, [updateSiteData]);

  const updateArticle = useCallback((article: Article) => {
    updateSiteData((prev) => ({
      ...prev,
      articles: prev.articles.map((a) => (a.id === article.id ? article : a)),
    }));
  }, [updateSiteData]);

  const updateSeoConfig = useCallback((seoData: Partial<SiteSeoData>) => {
    updateSiteData((prev) => ({
      ...prev,
      seo: {
        ...(prev.seo || (DEFAULT_SITE_DATA.seo as SiteSeoData)),
        ...seoData,
      },
    }));
  }, [updateSiteData]);

  const updatePageSeo = useCallback((pageId: string, pageSeo: Partial<PageSeoConfig>) => {
    updateSiteData((prev) => {
      const currentSeo = prev.seo || (DEFAULT_SITE_DATA.seo as SiteSeoData);
      const currentPages = currentSeo.pages || {};
      const existingPage = currentPages[pageId] || {};
      return {
        ...prev,
        seo: {
          ...currentSeo,
          pages: {
            ...currentPages,
            [pageId]: {
              ...existingPage,
              ...pageSeo,
            },
          },
        },
      };
    });
  }, [updateSiteData]);

  const pingIndexNow = useCallback(async (): Promise<boolean> => {
    try {
      const res = await fetch('/api/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          urls: [
            'https://vsalab.vn/',
            'https://vsalab.vn/#ve-chung-toi',
            'https://vsalab.vn/#ve-vsa-lab',
            'https://vsalab.vn/#tay-giang',
            'https://vsalab.vn/#quang-ngai',
            'https://vsalab.vn/#quang-binh',
            'https://vsalab.vn/#quy-trinh-san-xuat',
            'https://vsalab.vn/#tin-tuc-tay-giang',
            'https://vsalab.vn/#5-loi-ich-tinh-dau',
            'https://vsalab.vn/#cong-nghe-chiet-xuat',
          ],
        }),
      });
      const data = await res.json();
      return !!data.success;
    } catch (e) {
      console.error('Error pinging IndexNow:', e);
      return false;
    }
  }, []);

  // Immediate Save Button
  const saveAllNow = useCallback(async (): Promise<boolean> => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    persistLocally(siteDataRef.current);
    setSyncStatus('syncing');
    try {
      const res = await fetch('/api/site-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: siteDataRef.current }),
      });
      const resJson = await res.json();
      if (resJson.success) {
        if (resJson.version) {
          currentVersionRef.current = resJson.version;
          localStorage.setItem(STORAGE_VER_KEY, resJson.version.toString());
        }
        setSyncStatus('synced');
        setLastSyncedTime(new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        return true;
      }
      setSyncStatus('error');
      return false;
    } catch (e) {
      console.error('Error saving data to server:', e);
      setSyncStatus('offline');
      return false;
    }
  }, []);

  const resetToDefault = useCallback(async () => {
    try {
      await fetch('/api/site-data/reset', { method: 'POST' });
    } catch {
      // Local fallback
    }
    setSiteData(DEFAULT_SITE_DATA);
    persistLocally(DEFAULT_SITE_DATA, Date.now());
    setSyncStatus('synced');
    setLastSyncedTime(new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
  }, []);

  const exportDataJson = useCallback(() => {
    return JSON.stringify(siteDataRef.current, null, 2);
  }, []);

  const importDataJson = useCallback((jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && typeof parsed === 'object') {
        const merged: SiteData = {
          texts: { ...DEFAULT_SITE_DATA.texts, ...(parsed.texts || {}) },
          products: parsed.products?.length ? parsed.products : DEFAULT_SITE_DATA.products,
          regions: parsed.regions?.length ? parsed.regions : DEFAULT_SITE_DATA.regions,
          processSteps: parsed.processSteps?.length
            ? parsed.processSteps
            : DEFAULT_SITE_DATA.processSteps,
          articles: parsed.articles?.length ? parsed.articles : DEFAULT_SITE_DATA.articles,
        };
        setSiteData(merged);
        persistLocally(merged);
        pushToServer(merged);
        return true;
      }
    } catch (e) {
      console.error('Invalid JSON imported:', e);
    }
    return false;
  }, [pushToServer]);

  // -------------------------------------------------------------
  // REAL-TIME SYNC ENGINE (SSE + Background Polling for Mobile)
  // -------------------------------------------------------------
  useEffect(() => {
    let eventSource: EventSource | null = null;
    let isMounted = true;

    // Helper: fetch latest from server
    const fetchLatestFromServer = async () => {
      try {
        const res = await fetch('/api/site-data');
        if (!res.ok) return;
        const json = await res.json();
        if (json.success && json.data) {
          if (!isMounted) return;
          // Only update if server version is newer or differing
          if (json.version && json.version !== currentVersionRef.current) {
            currentVersionRef.current = json.version;
            localStorage.setItem(STORAGE_VER_KEY, json.version.toString());
            setSiteData(json.data);
            persistLocally(json.data, json.version);
            setSyncStatus('synced');
            setLastSyncedTime(new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
          }
        }
      } catch (err) {
        console.warn('Initial server fetch notice:', err);
      }
    };

    // 1. Initial fetch on mount
    fetchLatestFromServer();

    // 2. Setup Server-Sent Events (SSE) stream
    const setupSSE = () => {
      try {
        eventSource = new EventSource('/api/site-data/stream');

        eventSource.addEventListener('handshake', (e: MessageEvent) => {
          try {
            const data = JSON.parse(e.data);
            if (data && data.version && data.version > (currentVersionRef.current || 0)) {
              currentVersionRef.current = data.version;
              setSiteData(data.data);
              persistLocally(data.data, data.version);
              setSyncStatus('synced');
            }
          } catch (err) {
            console.error('SSE handshake parse error:', err);
          }
        });

        eventSource.addEventListener('site-update', (e: MessageEvent) => {
          try {
            const payload = JSON.parse(e.data);
            if (payload && payload.data) {
              // Update state instantly on mobile & any other open client
              currentVersionRef.current = payload.version || Date.now();
              setSiteData(payload.data);
              persistLocally(payload.data, currentVersionRef.current);
              setSyncStatus('synced');
              setLastSyncedTime(new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
              console.log('⚡ Real-time update received and applied to device interface!');
            }
          } catch (err) {
            console.error('SSE site-update parse error:', err);
          }
        });

        eventSource.onerror = () => {
          // SSE may disconnect when mobile phone is put to sleep; will auto-reconnect or recover on poll
          if (eventSource && eventSource.readyState === EventSource.CLOSED) {
            eventSource.close();
            eventSource = null;
          }
        };
      } catch (e) {
        console.warn('EventSource setup failed, fallback to polling:', e);
      }
    };

    setupSSE();

    // 3. Mobile screen wake / tab focus listener:
    // When phone is unlocked or user switches back to browser tab, immediately query server
    const handleVisibilityOrFocus = () => {
      if (document.visibilityState === 'visible') {
        fetchLatestFromServer();
        // Reconnect SSE if it was closed by mobile OS
        if (!eventSource || eventSource.readyState === EventSource.CLOSED) {
          setupSSE();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityOrFocus);
    window.addEventListener('focus', handleVisibilityOrFocus);

    // 4. Background polling fallback every 4 seconds (handles aggressive mobile sleeping)
    const pollInterval = setInterval(() => {
      fetchLatestFromServer();
    }, 4000);

    return () => {
      isMounted = false;
      document.removeEventListener('visibilitychange', handleVisibilityOrFocus);
      window.removeEventListener('focus', handleVisibilityOrFocus);
      clearInterval(pollInterval);
      if (eventSource) {
        eventSource.close();
      }
    };
  }, []);

  // Login handler
  const login = (user: string, pass: string) => {
    const trimmedUser = user.trim().toLowerCase();
    const trimmedPass = pass.trim();

    if (trimmedUser === 'vsalab' && trimmedPass === 'Vsalabvietnam') {
      setIsAdmin(true);
      try {
        localStorage.setItem(AUTH_STORAGE_KEY, 'true');
      } catch (e) {
        console.error(e);
      }
      setIsLoginModalOpen(false);
      setIsCmsOpen(true);
      return { success: true };
    }

    return {
      success: false,
      message: 'Tên tài khoản hoặc mật khẩu không chính xác. Vui lòng thử lại.',
    };
  };

  const logout = () => {
    setIsAdmin(false);
    setIsCmsOpen(false);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openCms = (tab: string = 'hero') => {
    setActiveCmsTab(tab);
    setIsCmsOpen(true);
  };

  const closeCms = () => setIsCmsOpen(false);

  return (
    <ContentContext.Provider
      value={{
        siteData,
        isAdmin,
        isCmsOpen,
        activeCmsTab,
        isLoginModalOpen,
        syncStatus,
        lastSyncedTime,
        login,
        logout,
        openLoginModal,
        closeLoginModal,
        openCms,
        closeCms,
        updateSiteData,
        updateTextSection,
        updateProduct,
        addProduct,
        deleteProduct,
        updateRegion,
        updateProcessStep,
        updateArticle,
        updateSeoConfig,
        updatePageSeo,
        pingIndexNow,
        saveAllNow,
        resetToDefault,
        exportDataJson,
        importDataJson,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
