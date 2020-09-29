import dataGenerator from './dataGenerator.helper';

describe('DataGenerator', () => {
  it('Should be instance of Function', () => {
    expect(dataGenerator).toBeInstanceOf(Function);
  });
  it('Should combine 2 objects into 1', () => {
    const obj1 = { city: 'Moscow', timeZone: '14400' };
    const obj2 = { country: 'Russia' };
    const result = dataGenerator(obj1, obj2);
    expect(result).toEqual(expect.objectContaining({
      city: 'Moscow',
      timeZone: '14400',
      country: 'Russia',
    }));
  });
});
