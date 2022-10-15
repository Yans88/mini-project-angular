import {GradePipePipe} from './grade-pipe.pipe';

describe('GradePipePipe', () => {
  it('create an instance', () => {
    const pipe = new GradePipePipe();
    expect(pipe).toBeTruthy();
  });

  it('transforms Value A to Badge', () => {
    const pipe = new GradePipePipe();
    expect(pipe.transform('A')).toBe('<p-tag severity="success" value="A"></p-tag>');
  });

  it('transforms Value B to Badge', () => {
    const pipe = new GradePipePipe();
    expect(pipe.transform('B')).toBe('<p-tag severity="info" value="B"></p-tag>');
  });

  it('transforms Value C to Badge', () => {
    const pipe = new GradePipePipe();
    expect(pipe.transform('C')).toBe('<p-tag severity="warning" value="C"></p-tag>');
  });

  it('transforms default to Badge', () => {
    const pipe = new GradePipePipe();
    expect(pipe.transform('')).toBe('<p-tag severity="danger" value="Reject"></p-tag>');
  });
});
