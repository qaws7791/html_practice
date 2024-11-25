type Gender = 'M' | 'W';
type Roles = 'Citizen' | 'Student' | 'Teacher';
type Name = string;
type Email = string;
type Room = number;
type Grade = 1 | 2 | 3 | 4 | 5 | 6;
type Address = string;
type ContactInformation = string;
type DateOfBirth = string;

interface User {
  id: number;
  name: Name;
  email: Email;
  gender: Gender;
  createdAt: number;
  updatedAt: number;
  role: Roles;
  address: Address;
  contactInformation: ContactInformation;
  dateOfBirth: DateOfBirth;
}

interface SchoolMember extends User {
  isAuthenticated: boolean;
}

export interface Citizen extends User {
  job: string;
}

export interface Student extends SchoolMember {
  room: Room;
  grade: Grade;
  isFreshman: boolean;
  isGraduated: boolean;
}

export interface Teacher extends SchoolMember {
  yearsOfExperience: number;
  qualifications: string[];
  subject: string;
}

export interface CreateTeacher {
  (
    teacherName: Name,
    email:Email, 
    gender:Gender,
    yearsOfExperience: number,
    qualifications?:string[],
    subject?:string,
    address?: Address,
    contactInformation?: ContactInformation,
    dateOfBirth?: DateOfBirth
  ): Teacher;
}

export interface CreateStudent {
  ( studentName: Name,
    email: Email,
    gender: Gender,
    room: Room,
    grade: Grade,
    address?: Address,
    contactInformation?: ContactInformation,
    dateOfBirth?: DateOfBirth
  ): Student;
}

interface Iterator<T, TReturn = any, TNext = undefined> {
  next(...args: [] | [TNext]): IteratorResult<T, TReturn>;
  return?(value?: TReturn): IteratorResult<T, TReturn>;
  throw?(e?: any): IteratorResult<T, TReturn>;
}

export interface Generator<T = unknown, TReturn = any, TNext = unknown>
  extends Iterator<T, TReturn, TNext> {
  next(...args: [] | [TNext]): IteratorResult<T, TReturn>;
  return(value: TReturn): IteratorResult<T, TReturn>;
  throw(e: any): IteratorResult<T, TReturn>;
  [Symbol.iterator](): Generator<T, TReturn, TNext>;
}

type IteratorResult<T, TReturn = any> =
  | IteratorYieldResult<T>
  | IteratorReturnResult<TReturn>;

interface IteratorYieldResult<TYield> {
  done?: false;
  value: TYield;
}

interface IteratorReturnResult<TReturn> {
  done: true;
  value: TReturn;
}