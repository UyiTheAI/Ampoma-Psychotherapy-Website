import express from 'express';
import { siteContent } from '../../shared/site-content.js';

const app = express();
app.use(express.json());

app.get('/api/healthz', (_request, response) => {
  response.json({ status: 'ok' });
});

app.get('/api/site-content', (_request, response) => {
  response.json(siteContent);
});

const port = Number(process.env.PORT ?? 5000);
app.listen(port, '0.0.0.0', () => {
  console.info(`Ampoma API listening on http://localhost:${port}`);
});
