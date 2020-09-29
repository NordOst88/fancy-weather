import GeolocationModel from './geolocation.model';

describe('geolocation', () => {
  let geolocation;
  beforeEach(() => {
    geolocation = new GeolocationModel();
    return geolocation;
  });
  it('QueryURL property of GeolocationModel class should be defined', () => {
    expect(geolocation.queryUrl).toBeDefined();
  });
  it('QueryURL property of GeolocationModel class should contains API key in its value', () => {
    const APIKey = 'f84d96ffd8f279';
    expect(geolocation.queryUrl).toEqual(expect.stringContaining(APIKey));
  });
});
