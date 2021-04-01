import React, { useState, useEffect, useMemo } from 'react'
import { BrowserRouter as Router } from "react-router-dom";

import { renderRoutes, routes, handleResizeDocument } from "./utils";

// 引入转场动画
import './styles/transition.page.css'

export function App() {
  const [rect, setRect] = useState(handleResizeDocument());

  useEffect(function () {
    const resizeFn = () => setRect(handleResizeDocument());
    window.addEventListener("resize", resizeFn);
    window.addEventListener("orientationchange", resizeFn);
  }, []);

  return (
    <Router>
      {/* {
        (a: any) => {
          console.log('a', a)
          return <span>aaa</span>
        }
      } */}
      {/* <InterceptedContext> */}
        {renderRoutes(routes, { rect })}
      {/* </InterceptedContext> */}
    </Router>
  );
}

export function InterceptedContext(props: any) {
  const GlobalRouteState = useMemo(() => (
    React.createContext(props)
  ), [props])

  return (
    <GlobalRouteState.Provider
      value={{
        history: {},
        location: {},
        match: null,
      }}
    >
      {props.children}
    </GlobalRouteState.Provider>
  )
}

export default App;
