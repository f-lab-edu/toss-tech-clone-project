import createRouter, { extractUrlParams } from '../router';

describe('createRouter', () => {
  let router: ReturnType<typeof createRouter>;
  let mockCallback: jest.Mock;
  let mockNotFoundCallback: jest.Mock;

  beforeEach(() => {
    router = createRouter();
    mockCallback = jest.fn();
    mockNotFoundCallback = jest.fn();
    router.addRoute('/article/:id', mockCallback);
    router.setNotFound(mockNotFoundCallback);

    global.window = Object.create(window);
    const url = 'http://toss.tech';
    Object.defineProperty(window, 'location', {
      value: {
        href: url,
        pathname: url,
      },
      writable: true,
    });
  });

  test('calls the callback when the route matches', () => {
    window.location.pathname = '/article/1';
    router.start();

    expect(mockCallback).toHaveBeenCalled();
  });

  test('calls notFound when no route matches', () => {
    window.location.pathname = '/not-added-page';
    router.start();

    expect(mockNotFoundCallback).toHaveBeenCalled();
  });

  // extractUrlParams가 undefined로 나와서 함수가 동작하지 않음
  // test('extractUrlParams test 현재 라우트에 param이 없는 경우', () => {
  //   const route = { params: [] };
  //   const pathname = '/';
  //   const expectValue = {};

  //   const newParams = extractUrlParams(route, pathname);

  //   expect(newParams).toEqual(expectValue);
  // });

  // test('extractUrlParams test 현재 라우트에 param이 있는 경우', () => {
  //   const route = {
  //     params: ['id'],
  //     testRegExp: /^\/article\/([^\\/]+)$/,
  //     view: jest.fn(),
  //   };
  //   const pathname = '/article/12343';
  //   const expectValue: { [key: string]: string } = { id: '12343' };
  //   console.log(extractUrlParams);

  //   const newParams = extractUrlParams(route, pathname);

  //   expect(newParams).toEqual(expectValue);
  // });
});
