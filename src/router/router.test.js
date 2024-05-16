import { extractUrlParams } from './router.js';

describe('router unit tests', () => {
  test('extractUrlParams test 현재 라우트에 param이 없는 경우', () => {
    const route = { params: [] };
    const pathname = '/';
    const expectValue = {};

    const newParams = extractUrlParams(route, pathname);

    expect(newParams).toEqual(expectValue);
  });

  test('extractUrlParams test 현재 라우트에 param이 있는 경우', () => {
    const route = {
      testRegExp: /^\/test\/([^\\/]+)$/,
      params: ['id'],
    };
    const pathname = '/test/12343';
    const expectValue = { id: '12343' };

    const newParams = extractUrlParams(route, pathname);

    expect(newParams).toEqual(expectValue);
  });
});
