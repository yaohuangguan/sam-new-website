import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router } from "react-router-dom";

import { renderRoutes, routes, handleResizeDocument } from "./utils";

export function App() {
  const [rect, setRect] = useState(handleResizeDocument());

  useEffect(function () {
    const resizeFn = () => setRect(handleResizeDocument());
    window.addEventListener("resize", resizeFn);
    window.addEventListener("orientationchange", resizeFn);
  }, []);

  return <Router>{renderRoutes(routes, { rect })}</Router>;
}

export default App;
