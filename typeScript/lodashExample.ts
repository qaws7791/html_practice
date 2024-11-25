function addNumber(x: number, y: number):number {
  if(typeof x !== 'number' || typeof y !== 'number') {
    throw new Error('입력이 숫자가 아닙니다.')
  }
  return x + y;
}

function sum(numbers: number[]):number {
  let result = 0;
  for(const x of numbers) {
    if(typeof x === 'number') result += x;
    else if (typeof x === 'string') {
      const parsedNumber = parseFloat(x);
      if(!isNaN(parsedNumber)) {
        result += parsedNumber;
      }
    }
  }
  return result;
}

type ObjType = {
  x: number;
  y: number;
}

const json = `{ "x": "a", "y": 10}`;
const obj: ObjType = JSON.parse(json) as ObjType;

try {
  console.log(addNumber(obj.x, obj.y))
} catch(error) {
  console.log(error)
}

const json2 = `{"results":[
  {"x":10},
  {"x":20},
  {"x":30},
  {"x":40},
  {"x":50},
  {"x":"10"}
]}`;

type Obj3Type = {
  x: number;
}

type Obj2Type = {
  results: Obj3Type[];
}


const obj2: Obj2Type = JSON.parse(json2) as Obj2Type;
console.log(sum(obj2.results.map(obj=>obj.x)))

interface IterateeType {
  (value:any): any;
}

const iteratee = (value:any):any => value

const baseSum = (array: CollectionType[], iteratee: IterateeType):number => {
  var result,
      index = -1,
      length = array.length;

  while (++index < length) {
    var current = iteratee(array[index]);
    if (current !== undefined) {
      result = result === undefined ? current : (result + current);
    }
  }
  return result;
}

const identity = (value:any):any => value;

type List<T> = ArrayLike<T>

type CollectionType =  List<any> | null | undefined;

function sum2(collection: CollectionType) {
  return (collection && collection.length)
    ? baseSum(collection, identity)
    : 0;
}

console.log(baseSum(obj2.results.map(obj=>obj.x),iteratee))