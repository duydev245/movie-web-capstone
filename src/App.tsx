import "./index.css";
import ScrollToTop from "./routes/ScrollToTop";
import useRouteElement from "./routes/useRouteElement";

function App() {
  const routeElement = useRouteElement();

  return <>
    <ScrollToTop />
    {routeElement}
  </>;
}

export default App
