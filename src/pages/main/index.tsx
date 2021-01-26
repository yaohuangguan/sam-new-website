import React, { useState, useEffect } from "react";
// import { RouterProps } from 'react-router'
import { connect } from "react-redux";
import dayjs, { Dayjs } from 'dayjs'
import { CanlendarLayout } from "../../components/canlendar/layout";
import Navigation from "../../components/navigation";
import { ImageIcons } from "../../utils/dom-assets";
import LunarDate from './lunar-date'
import { initDates, getMarksByDate } from '../../apis'
import s from "./style.module.scss";

export function MainTitle(props: any) {
  return (
    <div className={s["title"]}>
      <div className={s["c"]}>Fantastic Canlendar</div>
      <div className={s["r"]}>
        <div
          className={s.setting}
          onClick={() => {
            props.history.push("/main/setting");
          }}
        >
          <ImageIcons type="settings" size={64} className={s["setting-icon"]} />
        </div>
      </div>
    </div>
  );
}

export function SettingTitle(props: any) {
  return (
    <div className={s["title"]}>
      <div className={s["l"]}>
        <div
          className={s.setting}
          onClick={() => {
            props.history.go(-1);
          }}
        >
          <ImageIcons type="settings" size={64} className={s["setting-icon"]} />
        </div>
      </div>
      <div className={s["c"]}>Setting</div>
    </div>
  );
}

export function Main(props: any) {
  // props
  const { settings } = props

  // states
  const frontDate = dayjs().startOf("date") // 以客户端日期为初始日期
  const [baseDate, setBaseDate] = useState(frontDate);
  const [hintDate, setHintDate] = useState(frontDate);
  const [units, setUnits] = useState<any>([]);

  const tools = [1, 2, 3];

  // effects
  useEffect(() => {
    handleInitUnits(baseDate)
  }, [baseDate])

  // functions
  function testH5Notice() {
    // @notice unit test dont delete
    // const [units, setUnits] = useState<any>([{
    //     date: baseDate,
    //     isToday: baseDate.isSame(currentDate),
    //     isInMonth: baseDate.isSame(baseDate, "month")
    // }])
  }
  function handleInitUnits(date: Dayjs) {
    // 在server端初始化日期，server端下发日历数据
    // const p1 = getMarksByDate(date.toString())
    //   .then((res: any) => {

    //   })

    return initDates(date, settings)
      .then((res: any) => {
        setUnits(res)
      })

  }
  function handleGoPrevMonth() {
    setBaseDate(baseDate.add(-1, 'month').startOf('date'))
  }
  function handleGoNextMonth() {
    setBaseDate(baseDate.add(1, 'month').startOf('date'))
  }
  function handleUnitClick(date: Dayjs) {
    setBaseDate(date)
    setHintDate(date)
  }

  return (
    <Navigation
      moduleOptions={[
        { name: "最近", route: "/main/settings", icon: "arrow-right" },
        { name: "事项", route: "/main/settings", icon: "arrow-right" },
        { name: "天气", route: "/main/settings", icon: "arrow-right" },
        { name: "我的", route: "/main/settings", icon: "arrow-right" },
      ]}
      {...props}
    >
      <div className={s.layout}>
        <div className={s["layout-t"]}>
          <MainTitle {...props} />
        </div>
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
        <div className={s["layout-b"]}>

          <ul className={s["tools"]}>
            <li className={s["tool"]}>
              <LunarDate date={frontDate} />
            </li>
            <li className={s["tool"]}>
              {/* 测试入口 */}
              <button onClick={() => props.history.push(`/main/marker/list`)}>标志管理</button>
              <button onClick={() => props.history.push(`/main/marker/create/${baseDate.format('YYYY-MM-DD')}`)}>添加标志</button>
            </li>

            {tools.map((item: any, index: number) => (
              <li key={index} className={s["tool"]}>
                tools {index} @todo
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Navigation>
  );
}

export default connect((state: any) => ({
  settings: state.settings,
}))(Main);
