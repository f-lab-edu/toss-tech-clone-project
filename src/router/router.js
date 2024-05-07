const ROUTE_PARAMETER_REGEXP = /:(\w+)/g;
const URL_FRAGMENT_REGEXP = '([^\\/]+)';
const A_SELECTOR = 'a[data-navigation]';

const extractUrlParams = (route, pathname) => {
  const params = {};

  if (route.params.length === 0) {
    return params;
  }

  const matches = pathname.match(route.testRegExp);

  matches.shift();

  matches.forEach((paramValue, index) => {
    const paramName = route.params[index];
    params[paramName] = paramValue;
  });

  return params;
};

export default () => {
  const routes = [];
  let notFound = () => {};
  let lastPathname;

  const checkRoutes = () => {
    const { pathname } = window.location;

    if (lastPathname === pathname) {
      return;
    }

    const currentRoute = routes.find((route) => {
      const { testRegExp } = route;
      return testRegExp.test(pathname);
    });

    if (!currentRoute) {
      notFound();
      return;
    }

    const urlParams = extractUrlParams(currentRoute, pathname);
    currentRoute.view(urlParams);
  };

  const router = {
    addRoute: (path, view) => {
      const params = [];

      const parsedPath = path
        .replace(ROUTE_PARAMETER_REGEXP, (match, paramName) => {
          params.push(paramName);
          return URL_FRAGMENT_REGEXP;
        })
        .replace(/\//g, '\\/');

      routes.push({
        testRegExp: new RegExp(`^${parsedPath}$`),
        view,
        params,
      });

      return router;
    },

    setNotFound: (cb) => {
      notFound = cb;
      return router;
    },

    navigate: (path) => {
      window.history.pushState(null, null, path);
      checkRoutes();
    },

    start: () => {
      checkRoutes();
      // window.setInterval(checkRoutes, 10000);
      window.addEventListener('popstate', () => {
        checkRoutes();
      });

      document.body.addEventListener('click', (e) => {
        const { target } = e;

        if (target.closest(A_SELECTOR)) {
          e.preventDefault();
          router.navigate(target.href);
        }
      });
    },
  };

  return router;
};
