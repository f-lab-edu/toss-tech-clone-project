import { extractUrlParams } from './router';

describe('router unit tests', () => {
  test('extractUrlParams test 현재 라우트에 param이 없는 경우', () => {
    const route = { params: [] };
    const pathname = '/';
    const expectValue = {};

    const newParams = extractUrlParams(route, pathname);

    expect(newParams).toEqual(expectValue);
  });
});
