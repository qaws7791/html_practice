function add(a: number, b: number) {
  return a + b;
}
const sum: number = add(1, 2);
console.log(sum);

//Boolean 타입
let isBoolean: boolean;
// Number 타입
let num: number;
// String 타입
let str: string;
// 단일 타입만 가지는 배열
let fruits: string[] = ['Apple', 'Banana', 'Mango'];
let oneToSeven: Array<number> = [1, 2, 3, 4, 5, 6, 7];
// 다중 타입 배열
let array: (string | number)[] = ['Apple', 1, 2, 'Banana', 'Mango', 3];
let array2: Array<string | number> = ['Apple', 1, 2, 'Banana', 'Mango', 3];
// enum
// 역방향 매핑 지원 0 -> 월, 월 -> 0
enum Week {
  월, 화, 수, 목, 금, 토, 일
}
console.log(Week)
// Any 타입
let any: any = 123;
// Any 타입 배열
let someArr: any[] = [0, 1, {}, [], 'str', false];
// Unknown 타입
// Unknown에는 다른 타입 할당이 되지만, Unknown을 다른 타입에 할당 불가
let u: unknown = 123;
// Object 객체: 객체, 배열, 함수 등
let obj: object = {};
// void: 함수에서 값을 반환하지 않을 때
function hello(msg: string): void {
}
// never: 절대 발생하지 않을 값
function error(message: string): never {
  throw new Error(message);
}
// Union: 복수 타입 가능 (|)
let union: (string | number);
// Intersection: 타입 조합 (&)
const neo: IUser & IValidation = {
  name: 'Neo',
  age: 85,
  isValid: true
};
// 타입 단언
let val: (string | number)
val as number

//interface와 선택적 속성 정의(?), 읽기 전용 속성(readonly)
interface IUser {
  name: string,
  age: number,
  isAdult?: boolean
}

//함수 타입 정의 ( (파라미터:타입) : 반환 타입 )
interface IGetUser {
  (name: string) : IUser
}

//인터페이스 확장 (extends)
interface IAnimal {
}

interface ICat extends IAnimal {
  
}