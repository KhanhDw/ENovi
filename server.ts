import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr/node';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server'; // Đổi từ AppServerModule thành bootstrap để rõ ràng hơn

export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine({ enablePerformanceProfiler: true });

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Phục vụ file tĩnh
  server.get('**', express.static(browserDistFolder, {
    maxAge: '1y',
    index: false // Ngăn Express phục vụ index.html mặc định
  }));

  // Render Angular SSR cho mọi route
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;
    commonEngine
      .render({
        bootstrap, // Dùng biến bootstrap thay vì AppServerModule trực tiếp
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Chỉ chạy nếu file được gọi trực tiếp (không phải import)
// if (process.env.NODE_ENV !== 'production') {
//   run();
// }
run();

export default app; // Export để dùng trong serverless nếu cần  