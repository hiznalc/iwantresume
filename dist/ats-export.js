import{fitFontSize}from'./font-fit.js';
import {filledProjects,entryType,personalDetails} from './resume-options.js';
export async function exportATSResume(data){
 const doc=new window.jspdf.jsPDF();await doc.initializeFonts(data.font||'times');
 const left=14,right=196,width=right-left,accent=[99,34,32];let y=22;
 const ensure=height=>{if(y+height>280){doc.addPage();y=20}};
 const style=(size=11,bold=false,italic=false,color=[25,25,25])=>{doc.setFont(data.font||'times',(bold?'bold':'')+(italic?'italic':'')||'normal');doc.setFontSize(size);doc.setTextColor(...color)};
 const text=(value,size=11,bold=false,italic=false,align='left',color=[25,25,25],w=width)=>{style(size,bold,italic,color);const paragraphs=String(value||'').split('\n');let count=0;for(const paragraph of paragraphs){const lines=doc.splitTextToSize(paragraph,w);for(let i=0;i<lines.length;i++){ensure(6);if(align==='justify'&&i<lines.length-1)doc.justifyLine(lines[i],left,y,w);else doc.text(lines[i],align==='center'?105:align==='right'?right:left,y,{align});y+=size*.3528*1.3;count++}}return count};
 const heading=title=>{ensure(24);y+=7;text(title.toUpperCase(),13,true,false,'left',accent);doc.setDrawColor(...accent);doc.line(left,y-3,right,y-3);y+=1};
 const pair=(a,b,bold=false,italic=false)=>{style(11,bold,italic);const gap=8;let rw=b?Math.min(65,doc.textWidth(b)):0;const leftLines=doc.splitTextToSize(a||'',width-rw-gap),rightLines=b?doc.splitTextToSize(b,rw||65):[];ensure(Math.max(leftLines.length,rightLines.length)*5.1);for(let i=0;i<Math.max(leftLines.length,rightLines.length);i++){ensure(6);if(leftLines[i])doc.text(leftLines[i],left,y);if(rightLines[i])doc.text(rightLines[i],right,y,{align:'right'});y+=5.1}};
 const nameSize=fitFontSize(data.name.toUpperCase(),width,(value,size)=>{style(size,true);return doc.textWidth(value)},27,18);text(data.name.toUpperCase(),nameSize,true,false,'center',accent);if(data.title)text(data.title,11,false,true,'center');
 for(const contact of [data.location,data.phone,data.email,data.website].filter(Boolean))text(contact,10,false,false,'center');y+=5;
 if(data.summary){heading('Professional Summary');text(data.summary,11,false,false,'justify');y+=4}
 const personal=personalDetails(data);if(personal.length){heading('Personal information');for(const [label,value]of personal)text(label+': '+value)}
 const education=data.education.filter(x=>x.degree||x.school);if(education.length){heading('Education');for(const x of education){ensure(20);pair(x.school.toUpperCase(),x.location||'',true);pair(x.degree,x.dates,false,true);if(x.details){y+=3;text(x.details)}y+=4}}
 const experience=data.experience.filter(x=>x.role||x.company||x.details);
 if(experience.length){heading('Work experience');for(const x of experience){ensure(22);pair(x.company.toUpperCase(),x.location||'',true);pair([x.role,x.type&&x.type!=='Employment'?entryType(x):''].filter(Boolean).join(' | '),x.dates,false,true);y+=3;if(x.details)text(x.details);y+=4}}
 const projects=filledProjects(data);if(projects.length){heading('Portfolio & projects');for(const p of projects){ensure(20);pair(p.name,p.dates,true);text([entryType(p),p.role,p.organization].filter(Boolean).join(' | '),11,false,true);if(p.description)text(p.description);if(p.tools)text('Tools: '+p.tools,10);y+=4}}

 if(data.skills){heading('Skills');for(const skill of data.skills.split(/[,\n]/).map(s=>s.trim()).filter(Boolean))text('• '+skill)}
 if(data.certifications){heading('Certifications');text(data.certifications)}
 await doc.save(data.name.replace(/[^a-z0-9\s_-]/gi,'').trim().replace(/\s+/g,'-')+'-ats-resume.pdf');
}

