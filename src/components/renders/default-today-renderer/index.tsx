import React from "react";

// uikit
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

// styles
const useStyles = makeStyles((theme) => ({}));

// 今日数字渲染器
export const DefaultTodayRenderer = (props: any) => {
  // states
  const classes = useStyles();

  return (
    <Typography
      //   className={cn(s["today"], {
      //     [s["active"]]: props.isToday,
      //     [s["outside"]]: !props.isInMonth,
      //   })}
      component="div"
    >
      {props.children}
    </Typography>
  );
};

export default DefaultTodayRenderer;
