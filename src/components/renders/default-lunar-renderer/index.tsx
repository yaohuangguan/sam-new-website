import React from "react";
// @ts-ignore
import lunar from "@tony801015/chinese-lunar";

// uikit
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

// styles
const useStyles = makeStyles((theme) => ({}));

// 农历渲染器
export const DefaultLunarRenderer = (props: any) => {
  // states
  const classes = useStyles();

  const L = lunar(...props.date.format("YYYY-MM-DD").split("-")).getJson();

  return (
    <Typography variant="caption" display="block">
      {L.lunarDay}
    </Typography>
  );
};

export default DefaultLunarRenderer;
