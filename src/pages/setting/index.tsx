import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

// uikit
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
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Switch from "@material-ui/core/Switch";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { Paper, Divider } from "@material-ui/core";

import * as Icons from "@material-ui/icons";

// self compoents

import {
  setFirstDayShow,
  setUnitInMonth,
  setUseDakTheme,
} from "../../redux/settings";

// types
enum WeekDayName {
  "周日" = 0,
  "周一" = 1,
  "周二" = 2,
  "周三" = 3,
  "周四" = 4,
  "周五" = 5,
  "周六" = 6,
}

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

export function Setting(props: any) {
  // props
  const { settings, setFirstDayShow, setUnitInMonth, setUseDakTheme } = props;

  // states
  const classes = useStyles();

  // functions
  function handleSetFirstDayShow(e: React.ChangeEvent<any>) {
    console.log(e);
    setFirstDayShow(e.target.value);
  }
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
            设置
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
                <ListItemText primary="暗黑" />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={settings.useDarkTheme}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setUseDakTheme(e.target.checked);
                    }}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider component="li" />

              <ListSubheader
                classes={{
                  root: classes.listSubHeaderRoot,
                }}
              >
                背景
              </ListSubheader>
              <ListItem>
                <ListItemIcon>
                  <Icons.ImageSearch />
                </ListItemIcon>
                <ListItemText primary="暗黑" />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={settings.useDarkTheme}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setUseDakTheme(e.target.checked);
                    }}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider component="li" />

              <ListSubheader
                classes={{
                  root: classes.listSubHeaderRoot,
                }}
              >
                日历
              </ListSubheader>
              <ListItem>
                <ListItemIcon>
                  <Icons.LineWeightSharp />
                </ListItemIcon>
                <ListItemText primary="第一天展示" />
                <ListItemSecondaryAction>
                  <Select
                    value={settings.firstDayToShow}
                    onChange={handleSetFirstDayShow}
                  >
                    {[0, 1, 2, 3, 4, 5, 6].map((item: any, index: number) => (
                      <MenuItem value={item} key={index}>
                        {WeekDayName[item]}
                      </MenuItem>
                    ))}
                  </Select>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Icons.Flight />
                </ListItemIcon>
                <ListItemText primary="显示非当月数据" />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={settings.unitInMonth}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setUnitInMonth(e.target.checked);
                    }}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </ul>
          </li>
        </List>
      </Paper>
    </Container>
  );
}

export default connect(
  (state: any) => ({
    settings: state.settings,
  }),
  (dispatch: any) => ({
    setFirstDayShow: (data: any) => setFirstDayShow(dispatch, data),
    setUnitInMonth: (data: any) => setUnitInMonth(dispatch, data),
    setUseDakTheme: (data: any) => setUseDakTheme(dispatch, data),
  })
)(Setting);
