import React, { useState, useEffect, PropsWithChildren, useMemo } from "react";
import cn from "classnames";
import { CanlendarLayoutProps, UnitProps } from "./index";
import { ImageIcons } from "../../utils/dom-assets/index";
import s from "./layout.module.scss";
import dayjs from "dayjs";

// 网格渲染器
const DefaultUnitRenderer = (props: any) => (
  <div className={s["unit"]}>{props.children}</div>
);

// 网格基准渲染器
const DefaultBaseRenderer = (props: any) => (
  <div className={s["base"]}>{props.children}</div>
);

// 今日数字渲染器
const DefaultTodayRenderer = (props: any) => (
  <div
    className={cn({
      [s["today"]]: props.isToday,
      [s["outside"]]: !props.isInMonth,
    })}
  >
    {props.children}
  </div>
);

// 普通日数字渲染器
const DefaultDateRenderer = (props: any) => (
  <span className={s["date"]}>{props.date.get("date")}</span>
);

// 基础新历渲染器
export function DefaultDateUnitRenderer(props: UnitProps) {
  return [
    DefaultDateRenderer,
    DefaultTodayRenderer,
    DefaultBaseRenderer,
    DefaultUnitRenderer,
  ].reduce((prev: any, Next: any) => <Next {...props}>{prev}</Next>, null);
}

// 日历网格
export function CanlendarLayout(props: CanlendarLayoutProps) {
  // props
  const { settings } = props;
  const { firstDayToShow } = settings;

  // states
  // 星期
  let weeks = `日一二三四五六`.split("");
  weeks = weeks.concat(weeks.splice(0, firstDayToShow));

  // 这个月
  const [currentDate, setCurrentDate] = useState(
    dayjs(dayjs().startOf("date"))
  );
  const [baseDate, setBaseDate] = useState(currentDate);
  const [units, setUnits] = useState<any>([]);

  // effects
  useEffect(() => {
    const firstDate = baseDate.startOf("month");
    const lastDate = baseDate.endOf("month");
    const indexOfFirstDate = firstDate.get("day");
    const indexOfLastDate = lastDate.get("day");
    const tunits = [];
    let headUnit = dayjs(firstDate).add(
      -indexOfFirstDate + firstDayToShow,
      "day"
    );
    let tailUnit = dayjs(lastDate).add(
      6 - indexOfLastDate + firstDayToShow,
      "day"
    );
    while (headUnit < tailUnit) {
      tunits.push({
        date: headUnit,
        isToday: headUnit.isSame(currentDate),
        isInMonth: headUnit.isSame(baseDate, "month"),
      });
      headUnit = headUnit.add(1, "day");
    }
    setUnits(tunits);
  }, [baseDate]);

  // memos
  const baseDateFormat = useMemo(() => baseDate.format("YYYY-MM"), [baseDate]);

  // functions
  function handleGoPrevMonth() {
    setBaseDate(baseDate.add(-1, "month").startOf("date"));

    // Notification.requestPermission()
    // Notification.permission
    Notification.requestPermission().then(function (result) {
      // result可能是是granted, denied, 或default.
      console.log(result);
      var n = new Notification("title", {
        body: "notification body",
      }); // 显示通知
      n.onshow = function () {
        setTimeout(n.close.bind(n), 5000);
      };
    });
  }
  function handleGoNextMonth() {
    setBaseDate(baseDate.add(1, "month").startOf("date"));
  }

  return (
    <div className={s.layout}>
      <div className={s.title}>
        <div className={s.left}>{baseDateFormat}</div>
        <div className={s.center}></div>
      </div>
      <div className={s.days}>
        {weeks.map((item: any, index) => (
          <div key={index} className={s.day}>
            {item}
          </div>
        ))}
      </div>
      <div className={s.units}>
        {units.map((item: any, index: number) => (
          <DefaultDateUnitRenderer key={index} {...item} />
        ))}
      </div>
      <div className={s.right_icons}>
          <ImageIcons
            size={32}
            className={s.prev}
            type='arrow-left'
            onClick={handleGoPrevMonth}
          />
          <ImageIcons
            size={32}
            className={s.next}
            type='arrow-right'
            onClick={handleGoNextMonth}
          />
        </div>
    </div>
  );
}
