import assert from 'node:assert/strict';
import {isResumeComplete} from './dist/validation.js';
const valid={name:'Alex',title:'Designer',email:'alex@example.com',summary:'My experience.',experience:[],education:[]};
assert.equal(isResumeComplete(valid),true);
for(const field of ['name','title','email','summary'])assert.equal(isResumeComplete({...valid,[field]:'  '}),false);
assert.equal(isResumeComplete({...valid,email:'invalid@'}),false);
assert.equal(isResumeComplete({...valid,experience:[{role:'Designer',company:'',dates:'',details:''}]}),false);
assert.equal(isResumeComplete({...valid,experience:[{role:'Designer',company:'Studio',dates:'2024 – Present',details:''}]}),true);
assert.equal(isResumeComplete({...valid,education:[{degree:'BS IT',school:'',dates:''}]}),false);
assert.equal(isResumeComplete({...valid,education:[{degree:'',school:'',dates:''}]}),true);
console.log('Completion rules: required fields, email, optional and incomplete entries verified.');

assert.equal(isResumeComplete({...valid,projects:[{name:'Capstone',description:''}]}),false);assert.equal(isResumeComplete({...valid,projects:[{name:'Capstone',description:'Built a web app.'}]}),true);assert.equal(isResumeComplete({...valid,projects:[{type:'Thesis',name:'',description:''}]}),true);console.log('Project completion rules passed.');

assert.equal(isResumeComplete({...valid,experience:[{type:'Employment',role:'',company:'',dates:'',details:''}]}),true);const project={type:'Other',name:'Project',description:'Description'};assert.equal(isResumeComplete({...valid,projects:[project]}),false);assert.equal(isResumeComplete({...valid,projects:[{...project,customType:'Community project'}]}),true);const experience={type:'Other',role:'Researcher',company:'School',dates:'2026'};assert.equal(isResumeComplete({...valid,experience:[experience]}),false);assert.equal(isResumeComplete({...valid,experience:[{...experience,customType:'Research assistantship'}]}),true);console.log('Other type validation passed.');
