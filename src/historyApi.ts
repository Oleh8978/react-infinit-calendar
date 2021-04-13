import { createBrowserHistory } from "history";

const history = createBrowserHistory();

history.listen(location => {
  if ((window as any).ga) {
    (window as any).ga("set", "page", location.pathname + location.search);
    (window as any).ga("send", "pageview");
  }
});

export default history;