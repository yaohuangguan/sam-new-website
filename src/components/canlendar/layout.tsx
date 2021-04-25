import React, { useMemo } from "react";
import { CanlendarLayoutProps } from "./index";

// uikit
import { IconButton } from "@material-ui/core";
import * as Icons from "@material-ui/icons";

// styles
import s from "./layout.module.scss";

import { DefaultDateUnitRenderer } from "../renders";

// 日历网格
export function CanlendarLayout(props: CanlendarLayoutProps) {
  // props
  const { frontDate, settings } = props;
  const { firstDayToShow } = settings;

  // states
  // 星期
  let weeks = `日一二三四五六`.split("");
  weeks = weeks.concat(weeks.splice(0, firstDayToShow));

  const { units = [] } = props;
  const { onUnitClick, onGoNextMonth, onGoPrevMonth } = props;

  // memos
  const frontDateFormat = useMemo(() => frontDate.format("YYYY-MM"), [
    frontDate,
  ]);

  return (
    <div className={s.layout}>
      <div className={s.title}>
        <div className={s.left}>{frontDateFormat}</div>
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
          <DefaultDateUnitRenderer
            key={index}
            {...item}
            onClick={() => onUnitClick && onUnitClick(item.date)}
          />
        ))}
      </div>
      <div className={s.right_icons}>
        <IconButton onClick={() => onGoPrevMonth && onGoPrevMonth()}>
          <Icons.NavigateBefore />
        </IconButton>
        <IconButton onClick={() => onGoNextMonth && onGoNextMonth()}>
          <Icons.NavigateNext />
        </IconButton>
      </div>
    </div>
  );
}
