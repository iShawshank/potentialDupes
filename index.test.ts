import { findPotentialDupes } from './index.js';

describe('findPotentialDupes', () => {
  it('returns potential dupes', () => {
    const expectedResult = {
      '1-800-Flowers.com': ['1800Flowers.com', '1 800 Flowers'],
      '1800Flowers.com': ['1 800 Flowers'],
      'Penske': ['Penske Systems, Inc'],
    };
    const result = findPotentialDupes('./data/test.txt');
    expect(result).toEqual(expectedResult);
  });
});
