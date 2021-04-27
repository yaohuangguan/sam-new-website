import React from "react";
import { Dayjs } from "dayjs";

// uikit
import { DefaultDateRenderer } from "../default-date-render";
import { DefaultLunarRenderer } from "../default-lunar-renderer";
import { DefaultTodayRenderer } from "../default-today-renderer";
import { DefaultMarkRenderer } from "../default-mark-renderer";
import { DefaultBaseRenderer } from "../default-base-renderer";
import { DefaultUnitRenderer } from "../default-unit-renderer";

// types
export interface UnitProps {
  date: Dayjs;
}

/**
 * Unit渲染器
 * @param props
 */
export const DefaultDateUnitRenderer = (props: UnitProps) => {
  const renderMaps = {
    fn: [
      {
        type: 1,
        fn: [DefaultDateRenderer, DefaultLunarRenderer],
      },
      DefaultTodayRenderer,
      DefaultMarkRenderer,
      DefaultBaseRenderer,
      DefaultUnitRenderer,
    ],
  };
  function render(item: any, superIndex: number) {
    const { type, fn } = item;
    if (type === 1) {
      return fn.map((next: any, index: number) => {
        if (typeof next === "function") {
          const F = next;
          return <F key={index} {...props} />;
        } else {
          return render(next, index);
        }
      });
    } else {
      return (
        fn &&
        fn.reduce((prev: any, next: any, index: number) => {
          if (typeof next === "function") {
            const F = next;
            return (
              <F {...props} key={superIndex}>
                {prev}
              </F>
            );
          } else {
            return render(next, index);
          }
        }, null)
      );
    }
  }
  return render(renderMaps, 0);
};

export default DefaultUnitRenderer;
