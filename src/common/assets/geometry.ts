export class RectSize {
  constructor(
    public width: number,
    public height: number,
  ) {}
  add(size: RectSize): RectSize {
    return new RectSize(this.width + size.width, this.height + size.height);
  }
  reduce(size: RectSize): RectSize {
    return new RectSize(this.width - size.width, this.height - size.height);
  }
}

export class Rect {
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  constructor(x: number, y: number, width: number, height: number);
  constructor(json: string);
  constructor(x: number | string, y?: number, width?: number, height?: number) {
    if (y !== undefined && width !== undefined && height !== undefined) {
      this.x = x as number;
      this.y = y;
      this.width = width;
      this.height = height;
    } else {
      const obj = JSON.parse(x as string);
      this.x = obj.x;
      this.y = obj.y;
      this.width = obj.width;
      this.height = obj.height;
    }
  }
  get json(): string {
    return JSON.stringify({
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    });
  }
  get style() {
    return {
      left: `${this.x}px`,
      top: `${this.y}px`,
      width: `${this.width}px`,
      height: `${this.height}px`,
    };
  }
  get size() {
    return new RectSize(this.width, this.height);
  }
  multiply(m: number): Rect {
    return new Rect(this.x * m, this.y * m, this.width * m, this.height * m);
  }
}
