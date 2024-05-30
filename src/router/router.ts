const ROUTE_PARAMETER_REGEXP = /:(\w+)/g;
const URL_FRAGMENT_REGEXP = '([^\\/]+)';
const A_SELECTOR = 'a[data-navigation]';

type RouteProps = {
  params?: string[];
  testRegExp?: RegExp;
  view?: (params: { [key: string]: string }) => void;
};

const extractUrlParams = (route: RouteProps, pathname: string) => {
  const params: { [key: string]: string } = {};

  if (route.params!.length === 0) {
    return params;
  }

  const matches = pathname.match(route.testRegExp!);

  if (matches) {
    matches.shift();

    matches.forEach((paramValue, index) => {
      const paramName = route.params![index];

      params[paramName] = paramValue;
    });
  }

  return params;
};

export default () => {
  const routes: RouteProps[] = [];
  let notFound = () => {};
  let lastPathname: string;

  const checkRoutes = () => {
    const { pathname } = window.location;

    if (lastPathname === pathname) {
      return;
    }

    const currentRoute = routes.find((route) => {
      const { testRegExp } = route;

      if (testRegExp) {
        return testRegExp.test(pathname);
      }
    });

    if (!currentRoute) {
      notFound();
      return;
    }

    const urlParams = extractUrlParams(currentRoute, pathname);
    currentRoute.view!(urlParams);
  };

  const router = {
    addRoute: (path: string, view: () => void) => {
      const params: string[] = [];

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

    setNotFound: (cb: () => void) => {
      notFound = cb;
      return router;
    },

    navigate: (path: string) => {
      window.history.pushState(null, '', path);
      checkRoutes();
    },

    start: () => {
      checkRoutes();
      // window.setInterval(checkRoutes, 10000);
      window.addEventListener('popstate', () => {
        checkRoutes();
      });

      document.body.addEventListener('click', (e) => {
        const target = e.target as Element;

        const closestLink = target.closest(A_SELECTOR);
        if (closestLink) {
          const href = closestLink.getAttribute('href');

          if (href) {
            e.preventDefault();
            router.navigate(href);
          }
        }
      });
    },
  };

  return router;
};
