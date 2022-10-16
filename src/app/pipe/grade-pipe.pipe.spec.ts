import {GradePipePipe} from './grade-pipe.pipe';

describe('GradePipePipe', () => {
  it('create an instance', () => {
    const pipe = new GradePipePipe();
    expect(pipe).toBeTruthy();
  });

  it('transforms Value A to Badge', () => {
    const pipe = new GradePipePipe();
    expect(pipe.transform('A')).toBe('success');
  });

  it('transforms Value B to Badge', () => {
    const pipe = new GradePipePipe();
    expect(pipe.transform('B')).toBe('info');
  });

  it('transforms Value C to Badge', () => {
    const pipe = new GradePipePipe();
    expect(pipe.transform('C')).toBe('warning');
  });

  it('transforms default to Badge', () => {
    const pipe = new GradePipePipe();
    expect(pipe.transform('')).toBe('danger');
  });
});
