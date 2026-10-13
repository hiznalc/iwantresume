import {personalDetails,filledProjects,entryType} from './resume-options.js';
export async function buildResumeDocx(data){
 const {Document,Paragraph,TextRun,ImageRun,Packer,AlignmentType,BorderStyle,TabStopType}=window.docx;
 const ats=data.format==='ats',font=({times:'Times New Roman',helvetica:'Arial',courier:'Courier New'})[data.font]||'Times New Roman';
 const children=[],color='000000',align=ats?AlignmentType.CENTER:AlignmentType.LEFT;
 const run=(text,options={})=>new TextRun({text:String(text||''),font,size:22,color,...options});
 const paragraph=(text,options={})=>new Paragraph({children:[run(text)],spacing:{after:70,line:300},...options});
 const heading=text=>children.push(new Paragraph({children:[run(text.toUpperCase(),{bold:true,size:26})],keepNext:true,spacing:{before:200,after:100},border:{bottom:{color,style:BorderStyle.SINGLE,size:4,space:2}}}));
 const pair=(left,right,bold=false,italics=false)=>children.push(new Paragraph({children:[run(left,{bold,italics}),run(right?'\t'+right:'',{bold,italics})],tabStops:[{type:TabStopType.RIGHT,position:10100}],keepNext:true,spacing:{after:30,line:280}}));
 const description=(text,justified=false)=>{for(const line of String(text||'').split('\n').filter(Boolean))children.push(paragraph(line,{alignment:justified?AlignmentType.JUSTIFIED:AlignmentType.LEFT}))};
 const name=run(ats?data.name.toUpperCase():data.name,{bold:true,size:40});
 const nameRuns=[name];
 if(!ats&&data.photo){const bytes=Uint8Array.from(atob(data.photo.split(',')[1]),c=>c.charCodeAt(0));nameRuns.push(run('\t'),new ImageRun({type:'jpg',data:bytes,transformation:{width:65,height:65}}))}
 children.push(new Paragraph({children:nameRuns,style:'Title',alignment:align,tabStops:[{type:TabStopType.RIGHT,position:10100}],spacing:{after:45,line:280},keepNext:true}));
 if(data.title)children.push(new Paragraph({children:[run(data.title,{italics:true,size:24})],alignment:align,spacing:{after:45},keepNext:true}));
 const contact=[data.email,data.phone,data.location,data.website].filter(Boolean).join(' • ');
 if(contact)children.push(new Paragraph({children:[run(contact,{size:19})],alignment:align,spacing:{after:100},keepNext:true}));
 if(data.summary){heading('Professional Summary');description(data.summary,true)}
 const personal=personalDetails(data);if(personal.length){heading('Personal Information');for(const[label,value]of personal)children.push(new Paragraph({children:[run(label+': ',{bold:true}),run(value)],spacing:{after:35}}))}
 const education=data.education.filter(e=>e.school||e.degree);if(education.length){heading('Education');for(const e of education){pair(e.school.toUpperCase(),e.location,true);pair(e.degree,e.dates,false,true);description(e.details)}}
 const experience=data.experience.filter(e=>e.role||e.company||e.details);if(experience.length){heading('Work Experience');for(const e of experience){pair(e.company.toUpperCase(),e.location,true);pair([e.role,e.type&&e.type!=='Employment'?entryType(e):''].filter(Boolean).join(' | '),e.dates,false,true);description(e.details)}}
 const projects=filledProjects(data);if(projects.length){heading('Portfolio & Projects');for(const p of projects){pair(p.name,p.dates,true);pair([entryType(p),p.role,p.organization].filter(Boolean).join(' | '),'',false,true);description(p.description);if(p.tools)description('Tools: '+p.tools)}}
 if(data.skills){heading('Skills');for(const skill of data.skills.split(/[,\n]/).map(s=>s.trim()).filter(Boolean))children.push(paragraph(skill,{bullet:{level:0}}))}
 if(data.certifications){heading('Certifications');description(data.certifications)}
 const document=new Document({creator:'iwantresume',title:'Resume',styles:{default:{document:{run:{font,size:22,color},paragraph:{spacing:{line:300,after:70}}}},paragraphStyles:[{id:'Title',name:'Title',basedOn:'Normal',run:{font,color,bold:true,size:40}}]},sections:[{properties:{page:{size:{width:11906,height:16838},margin:{top:850,bottom:850,left:850,right:850}}},children}]});
 return Packer.toBlob(document);
}
export async function exportDocx(data){
 const blob=await buildResumeDocx(data),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=data.name.replace(/[^a-z0-9\s_-]/gi,'').trim().replace(/\s+/g,'-')+'-'+data.format+'-resume.docx';a.click();setTimeout(()=>URL.revokeObjectURL(url),30000);
}
