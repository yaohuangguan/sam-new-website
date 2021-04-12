import React, { useState, useEffect } from "react";
// import { RouterProps } from 'react-router'
import { connect } from "react-redux";
import dayjs, { Dayjs } from 'dayjs'

// self compoennts
import { CanlendarLayout } from "../../components/canlendar/layout";
import LunarDate from './lunar-date'
import { Title } from './main-title'


// functions
import { initDates, getMarksByDate } from '../../apis'

// styles
import s from "./style.module.scss";

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
  }, [baseDate, props.location.pathname])

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
    setHintDate(date)
  }

  return (
    <div className={s.layout}>
      <div className={s["layout-t"]}>
        <Title {...props} />
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
            <LunarDate date={hintDate} />
          </li>
          <li className={s["tool"]}>
            {/* 测试入口 */}
            Tool 1
            <button onClick={() => props.history.push(`/main/marker/list`)}>标志管理</button>
            <button onClick={() => props.history.push(`/main/marker/create/${hintDate.format('YYYY-MM-DD')}`)}>添加标志</button>
          </li>
          {tools.map((item: any, index: number) => (
            <li key={index} className={s["tool"]}>
              Tool {index + 2} @todo
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default connect((state: any) => ({
  settings: state.settings,
}))(Main);