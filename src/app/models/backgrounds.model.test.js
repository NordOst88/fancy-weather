import BackgroundsModel from './backgrounds.model';

describe('backgroundsModel', () => {
  let backgroundsModel;
  beforeEach(() => {
    backgroundsModel = new BackgroundsModel();
    return backgroundsModel;
  });
  it('Query property of BackgroundsModel class should be defined', () => {
    expect(backgroundsModel.query).toBeDefined();
  });
  it('backgroundsModel should contain default query at initialization', () => {
    const defaultQuery = 'nature, spring';
    expect(backgroundsModel.query).toEqual(expect.stringContaining(defaultQuery));
  });
  it('queryGenerator method should set current season to query property', () => {
    const timezone = 14400;
    const seasons = ['winter', 'spring', 'summer', 'autumn'];
    backgroundsModel.queryGenerator(timezone);
    expect(backgroundsModel.query).toEqual(expect.stringContaining(seasons[2]));
  });
  it('queryGenerator method also should set current time of day to query property', () => {
    const timezone = 14400;
    const timesOfDay = ['night', 'morning', 'day', 'evening'];
    backgroundsModel.queryGenerator(timezone);
    expect(backgroundsModel.query).toEqual(expect.stringContaining(timesOfDay[0]));
  });
});
