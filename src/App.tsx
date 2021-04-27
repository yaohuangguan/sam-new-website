import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";

// others
import { renderRoutes, routes, handleResizeDocument } from "./utils";

// @全局样式 引入转场动画
import "./styles/transition.page.css";

function App(props: any) {
  // states
  const [rect, setRect] = useState(handleResizeDocument());

  // effects
  // 屏幕尺寸和方向变化的时候重新计算高宽等
  useEffect(function () {
    const resizeFn = () => setRect(handleResizeDocument());
    window.addEventListener("resize", resizeFn);
    window.addEventListener("orientationchange", resizeFn);
  }, []);

  return <Router>{renderRoutes(routes, { rect })}</Router>;
}

export default App;