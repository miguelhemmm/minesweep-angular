import { RoundPipe } from './round-pipe.pipe';

describe('RoundPipePipe', () => {
  let pipe: RoundPipe;

  beforeEach(() => {
    pipe = new RoundPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('transform method', () => {
    it('should floor the number when method is not provided', () => {
      expect(pipe.transform(4.7)).toBe(4);
      expect(pipe.transform(4.2)).toBe(4);
    });

    it('should floor the number when method is set to "floor"', () => {
      expect(pipe.transform(4.7, 'floor')).toBe(4);
      expect(pipe.transform(4.2, 'floor')).toBe(4);
    });

    it('should ceil the number when method is set to "ceil"', () => {
      expect(pipe.transform(4.7, 'ceil')).toBe(5);
      expect(pipe.transform(4.2, 'ceil')).toBe(5);
    });
  });
});
