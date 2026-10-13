export const projectTypes=['Personal project','Academic project','Capstone','Thesis','Other'];
export const experienceTypes=['Employment','OJT','Internship','Freelance','Volunteer','Other'];
export function personalDetails(data){
 const birthday=data.birthday?new Date(data.birthday+'T00:00:00').toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'}):'';
 return [['Birthday',birthday],['Gender',data.gender==='Other'?data.genderOther:data.gender],['Civil status',data.civilStatus==='Other'?data.civilStatusOther:data.civilStatus],['Religion',data.religion==='Other'?data.religionOther:data.religion],["Mother’s maiden name",data.motherMaidenName],["Father’s name",data.fatherName]].filter(([,value])=>value?.trim());
}
export function filledProjects(data){return(data.projects||[]).filter(p=>[p.name,p.description,p.role,p.organization,p.dates,p.tools].some(v=>v?.trim()));}

export function entryType(entry){return entry.type==='Other'?(entry.customType||'').trim():entry.type||'';}
