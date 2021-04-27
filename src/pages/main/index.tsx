import React, { useState, useEffect } from "react";
// import { RouterProps } from 'react-router'
import { connect } from "react-redux";
import dayjs, { Dayjs } from "dayjs";

// uikit
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Paper,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  List,
  ListItem,
  Button,
} from "@material-ui/core";
import * as Icons from "@material-ui/icons";

// self compoennts
import { CanlendarLayout } from "../../components/canlendar/layout";
import LunarDate from "./lunar-date";

// functions
import { initDates } from "../../apis";

// styles
import s from "./style.module.scss";
const useStyles = makeStyles((theme) => ({
  layout: {
    height: "100%",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
  },
  title: {
    flexGrow: 1,
  },
  mr16: {
    marginRight: 16,
  },
  listRoot: {
    height: "100%",
    overflow: "auto",
    backgroundImage: `url(https://i0.hdslb.com/bfs/article/2b78bf503a2dfd7260a645a461fa14725c868b19.jpg@1320w_930h.webp)`,
    backgroundPosition: -200,
    backgroundSize: "cover",
  },
  iconEnd: {
    marginRight: -12,
  },
}));

export function Main(props: any) {
  // props
  const { settings } = props;

  // states
  const frontDate = dayjs().startOf("date"); // 以客户端日期为初始日期
  const [baseDate, setBaseDate] = useState(frontDate);
  const [hintDate, setHintDate] = useState(frontDate);
  const [units, setUnits] = useState<any>([]);

  const classes = useStyles();

  const tools = [1, 2, 3];

  // effects
  useEffect(() => {
    handleInitUnits(baseDate);
  }, [baseDate, props.location.pathname]);

  // functions
  // function testH5Notice() {
  //   @notice unit test dont delete
  //   const [units, setUnits] = useState<any>([{
  //       date: baseDate,
  //       isToday: baseDate.isSame(currentDate),
  //       isInMonth: baseDate.isSame(baseDate, "month")
  //   }])
  // }
  function handleInitUnits(date: Dayjs) {
    // 在server端初始化日期，server端下发日历数据
    // const p1 = getMarksByDate(date.toString())
    //   .then((res: any) => {

    //   })

    return initDates(date, settings).then((res: any) => {
      setUnits(res);
    });
  }
  function handleGoPrevMonth() {
    setBaseDate(baseDate.add(-1, "month").startOf("date"));
  }
  function handleGoNextMonth() {
    setBaseDate(baseDate.add(1, "month").startOf("date"));
  }
  function handleUnitClick(date: Dayjs) {
    setHintDate(date);
  }

  return (
    <Container
      classes={{
        root: classes.layout,
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Fantastic Canlendar
          </Typography>
          <IconButton
            className={classes.iconEnd}
            onClick={() => {
              props.history.push("/main/setting");
            }}
            color="inherit"
          >
            <Icons.AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Paper
        elevation={0}
        square={true}
        classes={{
          root: classes.listRoot,
        }}
      >
        <div className={s["layout-c"]}>
          <CanlendarLayout
            units={units}
            settings={settings}
            frontDate={frontDate}
            onGoPrevMonth={handleGoPrevMonth}
            onGoNextMonth={handleGoNextMonth}
            onUnitClick={handleUnitClick}
          />
        </div>

        <List component="ul">
          <ListItem>
            <LunarDate date={hintDate} />
          </ListItem>
          <ListItem>
            <Button
              className={classes.mr16}
              variant="contained"
              color="primary"
              onClick={() => props.history.push(`/main/marker/list`)}
            >
              标志管理
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                props.history.push(
                  `/main/marker/create/${hintDate.format("YYYY-MM-DD")}`
                )
              }
            >
              添加标志
            </Button>
          </ListItem>
        </List>

        {/* <div className={s["layout-b"]}>
          <ul className={s["tools"]}>
            <li className={s["tool"]}>
              <LunarDate date={hintDate} />
            </li>
            <li className={s["tool"]}>
              Tool 1
              <button onClick={() => props.history.push(`/main/marker/list`)}>
                标志管理
              </button>
              <button
                onClick={() =>
                  props.history.push(
                    `/main/marker/create/${hintDate.format("YYYY-MM-DD")}`
                  )
                }
              >
                添加标志
              </button>
            </li>
            {tools.map((item: any, index: number) => (
              <li key={index} className={s["tool"]}>
                Tool {index + 2} @todo
              </li>
            ))}
          </ul>
        </div> */}
      </Paper>
    </Container>
  );
}

export default connect((state: any) => ({
  settings: state.settings,
}))(Main);
