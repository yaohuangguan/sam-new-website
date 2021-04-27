import React from "react";

// uikit
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

// styles
const useStyles = makeStyles((theme) => ({
  base: {
    width: `100%`,
    height: `100%`,
    position: `absolute`,
    left: 0,
    top: 0,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
    // `&:hover`: {
    //   backgroundColor: `rgba($color: #000000, $alpha: 0.05`)
    // }
  },
}));

// 网格基准渲染器
export const DefaultBaseRenderer = (props: any) => {
  // states
  const classes = useStyles();

  return <Box className={classes.base}>{props.children}</Box>;
};

export default DefaultBaseRenderer;
