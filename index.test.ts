import { findPotentialDupes } from './index.js';

describe('findPotentialDupes', () => {
  it('returns potential dupes', () => {
    const expectedResult = {
      '1-800-Flowers.com': ['1800Flowers.com'],
    };
    const result = findPotentialDupes('./data/test.txt');
    expect(result).toEqual(expectedResult);
  });
});
