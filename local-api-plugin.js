import generateAdvice from './api/generateAdvice.js';
import analyzeImage from './api/analyzeImage.js';

export function localVercelApi() {
  return {
    name: 'local-vercel-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url.startsWith('/api/')) return next();

        // Read and parse JSON body manually (since Vite doesn't do this automatically like Vercel does)
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', async () => {
          if (body) {
            try {
              req.body = JSON.parse(body);
            } catch(e) {}
          }

          // Mock Vercel's res.status().json()
          res.status = (code) => {
            res.statusCode = code;
            return res;
          };
          res.json = (data) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
          };

          // Route the requests
          try {
            if (req.url === '/api/generateAdvice') {
              await generateAdvice(req, res);
            } else if (req.url === '/api/analyzeImage') {
              await analyzeImage(req, res);
            } else {
              res.status(404).json({ error: "Route not found" });
            }
          } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
          }
        });
      });
    }
  };
}
