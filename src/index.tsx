import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback="loading">
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

window.addEventListener("load", function () {
  let ua = window.navigator.userAgent;
  let isIE = /MSIE|Trident/.test(ua);

  if (isIE) {
    //IE specific code goes here
    console.log("用户使用ie");

    window.alert(
      "检测到你正在使用ie，请使用Chrome,Firefox等浏览器来进行访问！"
    );
  } else {
    console.log("用户没有使用ie，挂载正常");
  }
});
