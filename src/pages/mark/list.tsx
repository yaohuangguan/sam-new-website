import React from "react";

// uikit
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ListSubheader from "@material-ui/core/ListSubheader";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Paper, Divider } from "@material-ui/core";

import * as Icons from "@material-ui/icons";

// styles
const useStyles = makeStyles((theme) => ({
  layout: {
    height: "100%",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
  },
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  listRoot: {
    position: "relative",
    top: 56,
    paddingTop: 0,
    height: "calc(100% - 56px)",
    overflow: "auto",
  },
  listSubHeaderRoot: {
    // backgroundColor: "#f9f7f3",
  },
}));

export function MarkList(props: any) {
  // states
  const classes = useStyles();

  // functions
  function handleGoBack() {
    props.history.go(-1);
  }
  return (
    <Container
      classes={{
        root: classes.layout,
      }}
    >
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleGoBack}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            标记 Mark
          </Typography>
        </Toolbar>
      </AppBar>
      <Paper
        elevation={0}
        square={true}
        classes={{
          root: classes.listRoot,
        }}
      >
        <List component="nav">
          <li>
            <ul>
              <ListSubheader
                classes={{
                  root: classes.listSubHeaderRoot,
                }}
              >
                主题
              </ListSubheader>
              <ListItem>
                <ListItemIcon>
                  <Icons.WbSunny />
                </ListItemIcon>
                <ListItemText primary="this is a mark" />
              </ListItem>
              <Divider component="li" />
            </ul>
          </li>
        </List>
      </Paper>
    </Container>
  );
}
