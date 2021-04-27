import React from "react";

// uikit
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

// styles
const useStyles = makeStyles((theme) => ({
  unit: {
    flexBasis: `calc(1 / 7 * 100%)`,
    paddingTop: `calc(1 / 7 * 100%)`,
    position: `relative`,
  },
}));

// 网格渲染器
export const DefaultUnitRenderer = (props: any) => {
  // states
  const classes = useStyles();

  return (
    <Box className={classes.unit} onClick={props.onClick}>
      {props.children}
    </Box>
  );
};

export default DefaultUnitRenderer;
