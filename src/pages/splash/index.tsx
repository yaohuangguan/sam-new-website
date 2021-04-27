import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";

import { styled } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

// styles
import s from "./style.module.scss";
const useStyle = makeStyles({
  layout: (props: any) => ({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundImage: `url(${props.backgroundImage})`,
    backgroundColor: props.backgroundColor,
    backgroundPosition: "center",
    backgroundSize: "cover",
  }),
});

// types
interface SplashProps extends RouteComponentProps<any> {}

const MyButton = styled(Button)({
  marginBottom: 30,
  background: "linear-gradient(45deg, #EEEEEE40 30%, #EAEAEA40 90%)",
  border: 0,
  borderRadius: 3,
  opacity: 0.5,
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  color: "white",
  height: 36,
  padding: "0 12px",
});

const Splash: React.FC<SplashProps> = (props: SplashProps) => {
  // states
  const [seconds, setSeconds] = useState(1);
  const max = 300;
  const classes = useStyle({
    backgroundColor: "red",
    backgroundImage:
      "https://pic2.zhimg.com/v2-a35447de6a3ca78a8573cf5b8c15c1c2_1440w.jpg?source=172ae18b",
  });

  // functions
  const handleEnterMain = () => {
    props.history.replace("/main");
  };

  // effects
  useEffect(() => {
    const next = seconds + 1;
    let tk = 0;
    tk = window.setTimeout(() => {
      if (next < max) {
        setSeconds(next);
      } else {
        handleEnterMain();
      }
    }, 1000);
    return () => {
      tk && clearTimeout(tk);
    };
  }, [seconds]);

  // render
  return (
    <div className={classes.layout}>
      <MyButton onClick={handleEnterMain}>
        点击直接跳转（{seconds} 秒后自动跳转 ）
      </MyButton>
    </div>
  );
};

export default Splash;
