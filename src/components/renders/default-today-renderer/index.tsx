import React from "react";
import cn from "classnames";

// uikit
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

// styles
const useStyles = makeStyles((theme) => ({
  today: {
    width: `80%`,
    height: `80%`,
    display: `flex`,
    flexDirection: `column`,
    alignItems: `center`,
    justifyContent: `center`,
    borderRadius: `100%`,
  },
  active: {
    backgroundColor: `rgb(99, 99, 99)`,
    color: `white`,
  },
  outside: {
    color: `#aaa`,
  },
}));

// 今日数字渲染器
export const DefaultTodayRenderer = (props: any) => {
  // states
  const classes = useStyles();

  return (
    <Typography
      className={cn(classes.today, {
        [classes.active]: props.isToday,
        [classes.outside]: !props.isInMonth,
      })}
      component="div"
    >
      {props.children}
    </Typography>
  );
};

export default DefaultTodayRenderer;
