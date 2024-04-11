import { GetHeroPipe } from './get-hero.pipe';

describe('GetHeroPipe', () => {
  it('create an instance', () => {
    const pipe = new GetHeroPipe();
    expect(pipe).toBeTruthy();
  });
});
