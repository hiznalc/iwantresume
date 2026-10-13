import {cpSync,mkdirSync} from 'node:fs';
const source=new URL('./dist/',import.meta.url),target=new URL('./docs/',import.meta.url);
mkdirSync(target,{recursive:true});cpSync(source,target,{recursive:true});
console.log('GitHub Pages files updated in docs/.');
