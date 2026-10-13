export const requiredFields = ['name', 'title', 'email', 'summary'];
const filled = value => typeof value === 'string' && value.trim().length > 0;
export function isResumeComplete(data) {
  if (!requiredFields.every(field => filled(data[field]))) return false;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) return false;
  // Empty optional entries are fine; started entries must be complete.
  const validProjects=(data.projects||[]).every(project=>!['name','description','role','organization','dates','tools','customType'].some(field=>filled(project[field]))||(['name','description'].every(field=>filled(project[field]))&&(project.type!=='Other'||filled(project.customType))));
  return validProjects && ['experience', 'education'].every(kind => data[kind].every(entry => {
    const contentFields=kind==='experience'?['role','company','dates','details','location','customType']:['degree','school','dates','location','details'];
    if (!contentFields.some(field=>filled(entry[field]))) return true;
    if (kind==='experience'&&entry.type==='Other'&&!filled(entry.customType)) return false;
    const fields = kind === 'experience' ? ['role', 'company', 'dates'] : ['degree', 'school', 'dates'];
    return fields.every(field => filled(entry[field]));
  }));
}
