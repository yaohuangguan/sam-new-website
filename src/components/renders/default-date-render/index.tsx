import React from "react";

// uikit
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

// styles
const useStyles = makeStyles((theme) => ({
  normal: {},
}));

// 普通日数字渲染器
export const DefaultDateRenderer = (props: any) => {
  // states
  const classes = useStyles();

  return <Typography variant="subtitle2">{props.date.get("date")}</Typography>;
};

export default DefaultDateRenderer;
