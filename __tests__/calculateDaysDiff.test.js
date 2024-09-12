import calculateDaysDiff from '../src/client/js/calculateDaysDiff';

describe('calculateDaysDiff', () => {
  it('should return the difference between two dates in days', () => {
    const date1 = new Date('2024-01-01');
    const date2 = new Date('2024-01-15');
    expect(calculateDaysDiff(date1, date2)).toBe(14);
  });
});