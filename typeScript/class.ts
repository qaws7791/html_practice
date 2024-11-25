
abstract class AbstractClass {
  public static staticName = 100;  // 생성자 개체 자체에서 접근 가능

  public readonly readonlyName: string = 'AbstractClass'; // 외부에서 읽기만 가능
  protected _borderWidth: number; // 내부에서만 사용하는 변수

  constructor(borderWidth: number = 1) {
    this._borderWidth = borderWidth
  }

  abstract printName: () => number;

  set borderWidth(width: number) {

  }
}