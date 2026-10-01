// Renders the landing page to static HTML after `vite build`, so crawlers and
// first paint get real markup. The client bundle then hydrates it (see src/main.jsx).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ssrDir = path.join(root, '.ssr');
const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);

const file = path.join(root, 'dist', 'index.html');
const template = fs.readFileSync(file, 'utf8');
if (!template.includes('<!--app-html-->')) throw new Error('Missing <!--app-html--> placeholder in dist/index.html');
fs.writeFileSync(file, template.replace('<!--app-html-->', render()));
fs.rmSync(ssrDir, { recursive: true, force: true });
console.log('Prerendered dist/index.html');
