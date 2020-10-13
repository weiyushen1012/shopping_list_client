import { formatDateTime } from '../../utils/dateFormatter';

describe('dateFormatter', () => {
  it('formats datetime', () => {
    expect(formatDateTime(new Date('Sun, 11 Oct 2020 18:10:50 GMT"'))).toBe(
      'Sunday October 11, 2020, 02:10 PM'
    );

    expect(formatDateTime(new Date('Sun, 11 Oct 2020 8:10:50 GMT"'))).toBe(
      'Sunday October 11, 2020, 04:10 AM'
    );
  });

});
