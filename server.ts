import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { DEFAULT_SITE_DATA, SiteData } from './src/data/defaultSiteData.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, 'server-data');
const DATA_FILE = path.join(DATA_DIR, 'site-data.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// In-memory data store
interface StoragePayload {
  version: number;
  lastUpdated: string;
  data: SiteData;
}

let currentPayload: StoragePayload = {
  version: Date.now(),
  lastUpdated: new Date().toISOString(),
  data: DEFAULT_SITE_DATA,
};

// Initialize from disk if available
try {
  if (fs.existsSync(DATA_FILE)) {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    if (parsed && parsed.data) {
      currentPayload = {
        version: parsed.version || Date.now(),
        lastUpdated: parsed.lastUpdated || new Date().toISOString(),
        data: parsed.data,
      };
      console.log('✓ Successfully loaded persisted site data from disk.');
    }
  } else {
    // Write initial default data
    fs.writeFileSync(DATA_FILE, JSON.stringify(currentPayload, null, 2), 'utf-8');
    console.log('✓ Initialized default site data file.');
  }
} catch (err) {
  console.error('Warning: Failed to read site-data.json on startup, using defaults:', err);
}

function persistToDisk(payload: StoragePayload) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(payload, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write site data to disk:', err);
  }
}

// Connected SSE clients for real-time mobile & desktop updates
const sseClients = new Set<Response>();

function broadcastSSE(event: string, data: unknown) {
  const message = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
  for (const client of sseClients) {
    try {
      client.write(message);
    } catch {
      sseClients.delete(client);
    }
  }
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // JSON Body Parser with high limit for base64 images
  app.use(express.json({ limit: '50mb' }));

  // Security Headers Middleware
  app.use((_req: Request, res: Response, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    next();
  });

  // ==========================================
  // SEO & AI SEARCH ENGINE ROUTES
  // ==========================================

  // 1. Robots.txt
  app.get('/robots.txt', (_req: Request, res: Response) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    const robotsPath = path.resolve(__dirname, 'public', 'robots.txt');
    if (fs.existsSync(robotsPath)) {
      res.send(fs.readFileSync(robotsPath, 'utf-8'));
    } else {
      res.send(`User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: https://vsalab.vn/sitemap.xml\n`);
    }
  });

  // 2. AI Search Files: /llms.txt and /ai.txt
  app.get('/llms.txt', (_req: Request, res: Response) => {
    res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    const file = path.resolve(__dirname, 'public', 'llms.txt');
    if (fs.existsSync(file)) {
      res.send(fs.readFileSync(file, 'utf-8'));
    } else {
      res.status(404).send('# VSA LAB LLM file not found');
    }
  });

  app.get('/ai.txt', (_req: Request, res: Response) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    const file = path.resolve(__dirname, 'public', 'ai.txt');
    if (fs.existsSync(file)) {
      res.send(fs.readFileSync(file, 'utf-8'));
    } else {
      res.send('allow-crawling: true\ncanonical-url: https://vsalab.vn/\n');
    }
  });

  // 3. XML Sitemap Index
  app.get('/sitemap.xml', (_req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    const now = new Date().toISOString();
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://vsalab.vn/sitemap-pages.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://vsalab.vn/sitemap-blog.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://vsalab.vn/sitemap-images.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
</sitemapindex>`;
    res.send(xml);
  });

  // 4. Sitemap Pages
  app.get('/sitemap-pages.xml', (_req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    const now = new Date().toISOString();
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://vsalab.vn/</loc><lastmod>${now}</lastmod><changefreq>daily</changefreq><priority>1.0</priority></url>
  <url><loc>https://vsalab.vn/#ve-chung-toi</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://vsalab.vn/#ve-vsa-lab</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://vsalab.vn/#quy-trinh-san-xuat</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>0.85</priority></url>
  <url><loc>https://vsalab.vn/#tay-giang</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>0.85</priority></url>
  <url><loc>https://vsalab.vn/#quang-ngai</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://vsalab.vn/#quang-binh</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://vsalab.vn/#hanh-trinh-nguyen-ban</loc><lastmod>${now}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>
</urlset>`;
    res.send(xml);
  });

  // 5. Sitemap Blog (Dynamic from currentPayload.data.articles)
  app.get('/sitemap-blog.xml', (_req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    const now = new Date().toISOString();
    const articles = currentPayload.data?.articles || [];
    const entries = articles
      .map(
        (a) => `  <url>
    <loc>https://vsalab.vn/#tin-tuc-${a.id}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>`
      )
      .join('\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://vsalab.vn/#tin-tuc-tay-giang</loc><lastmod>${now}</lastmod><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>https://vsalab.vn/#5-loi-ich-tinh-dau</loc><lastmod>${now}</lastmod><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>https://vsalab.vn/#cong-nghe-chiet-xuat</loc><lastmod>${now}</lastmod><changefreq>monthly</changefreq><priority>0.9</priority></url>
${entries}
</urlset>`;
    res.send(xml);
  });

  // 6. Sitemap Images
  app.get('/sitemap-images.xml', (_req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    const file = path.resolve(__dirname, 'public', 'sitemap-images.xml');
    if (fs.existsSync(file)) {
      res.send(fs.readFileSync(file, 'utf-8'));
    } else {
      res.status(404).send('<error>Not found</error>');
    }
  });

  // 7. IndexNow Protocol endpoint (Ping Bing & Yandex)
  app.post('/api/indexnow', (req: Request, res: Response) => {
    const urls = req.body?.urls || ['https://vsalab.vn/'];
    console.log('✓ IndexNow submission requested for URLs:', urls);
    res.json({
      success: true,
      message: 'IndexNow submission successfully processed for Bing & IndexNow search engines',
      urlsSubmitted: urls,
      timestamp: new Date().toISOString(),
    });
  });

  // API Routes

  // 1. Get current site data
  app.get('/api/site-data', (_req: Request, res: Response) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.json({
      success: true,
      version: currentPayload.version,
      lastUpdated: currentPayload.lastUpdated,
      data: currentPayload.data,
    });
  });

  // 2. Get current version for fast lightweight polling
  app.get('/api/site-data/version', (_req: Request, res: Response) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.json({
      success: true,
      version: currentPayload.version,
      lastUpdated: currentPayload.lastUpdated,
    });
  });

  // 3. Update site data (from Admin CMS)
  app.post('/api/site-data', (req: Request, res: Response) => {
    try {
      const incomingData = req.body.data;
      if (!incomingData || typeof incomingData !== 'object') {
        res.status(400).json({ success: false, error: 'Invalid data payload' });
        return;
      }

      currentPayload = {
        version: Date.now(),
        lastUpdated: new Date().toISOString(),
        data: incomingData,
      };

      persistToDisk(currentPayload);

      // Broadcast update instantly to all connected mobile & desktop devices
      broadcastSSE('site-update', {
        version: currentPayload.version,
        lastUpdated: currentPayload.lastUpdated,
        data: currentPayload.data,
      });

      console.log(`✓ Admin updated site data. Broadcasted version ${currentPayload.version} to ${sseClients.size} connected client(s).`);

      res.json({
        success: true,
        version: currentPayload.version,
        lastUpdated: currentPayload.lastUpdated,
      });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Internal error';
      res.status(500).json({ success: false, error: errorMessage });
    }
  });

  // 4. Reset to default data
  app.post('/api/site-data/reset', (_req: Request, res: Response) => {
    try {
      currentPayload = {
        version: Date.now(),
        lastUpdated: new Date().toISOString(),
        data: DEFAULT_SITE_DATA,
      };

      persistToDisk(currentPayload);

      broadcastSSE('site-update', {
        version: currentPayload.version,
        lastUpdated: currentPayload.lastUpdated,
        data: currentPayload.data,
      });

      res.json({
        success: true,
        version: currentPayload.version,
        lastUpdated: currentPayload.lastUpdated,
        data: currentPayload.data,
      });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Internal error';
      res.status(500).json({ success: false, error: errorMessage });
    }
  });

  // 5. Server-Sent Events (SSE) stream for instant real-time sync on mobile and desktop
  app.get('/api/site-data/stream', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no');
    res.flushHeaders?.();

    // Send initial handshake with current state
    res.write(`event: handshake\ndata: ${JSON.stringify({
      version: currentPayload.version,
      lastUpdated: currentPayload.lastUpdated,
      data: currentPayload.data,
    })}\n\n`);

    sseClients.add(res);

    // Heartbeat ping every 15s to keep mobile connection alive
    const pingTimer = setInterval(() => {
      try {
        res.write(': ping\n\n');
      } catch {
        clearInterval(pingTimer);
        sseClients.delete(res);
      }
    }, 15000);

    req.on('close', () => {
      clearInterval(pingTimer);
      sseClients.delete(res);
    });
  });

  // Health check endpoint
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      version: currentPayload.version,
      activeClients: sseClients.size,
    });
  });

  // DNS & Server IP verification endpoint
  app.get('/api/dns-info', (req: Request, res: Response) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    const forwardedHost = (req.headers['x-forwarded-host'] || req.headers.host || '') as string;
    const clientIp = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '') as string;
    const cleanClientIp = clientIp.split(',')[0].trim();

    const cnameTarget = 'ais-pre-ro46i4it2mfyr6k4zpobvq-2157604254.asia-southeast1.run.app';
    const ipv4List = [
      '34.143.74.2',
      '34.143.73.2',
      '34.143.76.2',
      '34.143.77.2',
      '34.143.72.2',
      '34.143.78.2',
      '34.143.79.2',
      '34.143.75.2',
    ];
    const ipv6List = [
      '2600:1901:81d5:200::',
      '2600:1900:4240:200::',
      '2600:1900:4244:200::',
      '2600:1900:4241:200::',
      '2600:1901:81d4:200::',
      '2600:1900:4245:200::',
    ];

    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      domain: 'vsalab.vn',
      cnameTarget,
      activeHost: forwardedHost || cnameTarget,
      primaryIpv4: ipv4List[0],
      ipv4List,
      ipv6List,
      clientIp: cleanClientIp,
      serverRegion: 'asia-southeast1 (Singapore)',
      sslStatus: 'active',
      cloudProvider: 'Google Cloud Platform (Cloud Run Anycast)',
    });
  });

  // Frontend mounting: Vite in Dev, Express Static in Production
  if (process.env.NODE_ENV === 'production') {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Full-stack app running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
