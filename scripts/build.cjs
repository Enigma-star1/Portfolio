/* Build only the public portfolio and referenced assets. Source originals and
   the excluded Hindsight video are never copied into the deployment. */
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const output = path.resolve(root, 'public');
if (output !== path.join(root, 'public')) throw new Error('Unexpected output path');
fs.mkdirSync(output, {recursive:true});
const pages = ['index.html','resume.html','work/tratun.html','work/careerpaddy.html','work/grosvenor.html','work/ektos.html'];
const queue = [...pages, 'robots.txt','sitemap.xml','assets/css/styles.css','assets/js/app.js','assets/brand/social-preview.jpg'];
for (const name of fs.readdirSync(path.join(root,'assets/fonts'))) if(name.endsWith('LICENSE.txt')) queue.push('assets/fonts/'+name);
const files = new Set();
const decode = text => text.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#x([\da-f]+);/gi,(_,n)=>String.fromCodePoint(parseInt(n,16))).replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(Number(n)));
while(queue.length) {
  const name = queue.shift();
  if(files.has(name)) continue;
  if(/hindsight/i.test(name)) throw new Error('Excluded media in public build');
  const source = path.resolve(root,name);
  if(!source.startsWith(root+path.sep)) throw new Error('Asset outside project');
  if(!fs.existsSync(source)) throw new Error('Missing asset: '+name);
  files.add(name);
  if(/\.(html|css)$/.test(name)) {
    const content = fs.readFileSync(source,'utf8');
    const refs = name.endsWith('.css') ? [...content.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)] : [...content.matchAll(/(?:src|href|poster|data-image)="([^"]+)"/g)];
    for(const match of refs) {
      const ref=decode(match[1]);
      if(/^(https?:|mailto:|tel:|data:|#)/i.test(ref)) continue;
      const asset=decodeURIComponent(ref.split(/[?#]/)[0]).replace(/^\//,'') || 'index.html';
      queue.push(asset);
    }
  }
  const target=path.join(output,name);
  fs.mkdirSync(path.dirname(target),{recursive:true});
  fs.copyFileSync(source,target);
}
// Remove obsolete output files safely inside the dedicated generated directory.
for(const entry of fs.readdirSync(output,{recursive:true,withFileTypes:true})) {
  if(!entry.isFile()) continue;
  const file=path.join(entry.parentPath || entry.path,entry.name);
  const relative=path.relative(output,file).split(path.sep).join('/');
  if(!file.startsWith(output+path.sep)) throw new Error('Unexpected build path');
  if(!files.has(relative)) fs.unlinkSync(file);
}
console.log(`Built ${pages.length} pages and ${files.size-pages.length} supporting files. Hindsight excluded.`);
