import * as allTypes from './type';
let counter = idCounter();
function* idCounter():allTypes.Generator<number, void, boolean> {
  let i = 1;
  while(true) {
    yield i++;
  }
}


const createStudent:allTypes.CreateStudent 
= (
  studentName,
  email,
  gender,
  room,
  grade,
  address ='',
  contactInformation='',
  dateOfBirth=''
  ) => {
  const {value} =counter.next();
  if(!value) throw new Error('ID Counter Error') ;
  const time = new Date().getTime();
  const newStudent: allTypes.Student = {
    id: value,
    name: studentName,
    createdAt: time,
    updatedAt: time,
    role: 'Student',
    isFreshman: false,
    isGraduated: false,
    isAuthenticated: false,
    email,
    gender,
    room,
    grade,
    address,
    contactInformation,
    dateOfBirth
  }
  return newStudent
};


const createTeacher: allTypes.CreateTeacher
= (
  teacherName,
  email, 
  gender,
  yearsOfExperience,
  qualifications=[],
  subject='',
  address='',
  contactInformation='',
  dateOfBirth=''
  ) => {
  const {value} =counter.next();
  if(!value) throw new Error('ID Counter Error') ;
  const time = new Date().getTime();
  const newTeacher: allTypes.Teacher = {
    id: value,
    email: email,
    gender: gender,
    name: teacherName,
    createdAt: time,
    updatedAt: time,
    role: 'Teacher',
    isAuthenticated: false,
    yearsOfExperience: yearsOfExperience,
    qualifications: qualifications,
    subject,
    address,
    contactInformation,
    dateOfBirth
  }

  return newTeacher;
}

const newStudent = createStudent('학생1','abcd@gmail.com','M',3,3)
console.log(newStudent)
const newStudent2 = createStudent('학생2','abcd@gmail.com','M',3,3)
console.log(newStudent2)
const newStudent3 = createStudent('학생3','abcd@gmail.com','M',3,3)
console.log(newStudent3)

const newTeacher = createTeacher('선생님1','abc@gmail.com','W',1,['자격증1'],'과학')
console.log(newTeacher)
const newTeacher2 = createTeacher('선생님1','abc@gmail.com','W',1,['자격증1'])
console.log(newTeacher2)