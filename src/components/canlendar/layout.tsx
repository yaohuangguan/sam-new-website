import React, { useState, useEffect, PropsWithChildren, useMemo } from "react";
import cn from "classnames";
import { CanlendarLayoutProps, UnitProps } from "./index";
import { ImageIcons } from "../../utils/dom-assets/index";
import s from "./layout.module.scss";
import dayjs, { Dayjs } from "dayjs";

import { DefaultMarkRenderer } from '../renders/mark'

// @ts-ignore
import lunar from '@tony801015/chinese-lunar'

// 网格渲染器
const DefaultUnitRenderer = (props: any) => (
    <div className={s["unit"]} onClick={props.onClick}>{props.children}</div>
);

// 网格基准渲染器
const DefaultBaseRenderer = (props: any) => (
    <div className={s["base"]}>{props.children}</div>
);

// 今日数字渲染器
const DefaultTodayRenderer = (props: any) =>
    <div className={cn(s["today"], {
        [s["active"]]: props.isToday,
        [s["outside"]]: !props.isInMonth
    })}>{props.children}</div>

// 普通日数字渲染器
const DefaultDateRenderer = (props: any) =>
    <span className={s["date"]}>
        {props.date.get('date')}
    </span>


// 农历渲染器
const DefaultLunarRenderer = (props: any) => {
    const L = lunar(...props.date.format('YYYY-MM-DD').split('-')).getJson()
    // console.log(props.date.format('YYYY-MM-DD'), L.animal)
    // lunarDay
    return (
        <span className={s["lunar"]}>{L.lunarDay}</span>

    )
}

// Unit渲染器
export function DefaultDateUnitRenderer(props: UnitProps) {
    const renderMaps = {
        fn: [
            {
                type: 1,
                fn: [
                    DefaultDateRenderer,
                    DefaultLunarRenderer
                ],
            },
            DefaultTodayRenderer,
            DefaultMarkRenderer,
            DefaultBaseRenderer,
            DefaultUnitRenderer,
        ]
    }
    function render(item: any, superIndex: number) {
        const { type, fn } = item
        if (type === 1) {
            return fn.map((next: any, index: number) => {
                if (typeof next === 'function') {
                    const F = next
                    return <F key={index} {...props} />
                } else {
                    return render(next, index)
                }
            })
        } else {
            return fn && fn.reduce((prev: any, next: any, index: number) => {
                if (typeof next === 'function') {
                    const F = next
                    return <F {...props} key={superIndex}>{prev}</F>
                } else {
                    return render(next, index)
                }
            }, null)
        }
    }
    return render(renderMaps, 0)
}

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
    const { onUnitClick, onGoNextMonth, onGoPrevMonth } = props

    // memos
    const frontDateFormat = useMemo(() => frontDate.format('YYYY-MM'), [frontDate])

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
                        onClick={() =>
                            onUnitClick && onUnitClick(item.date)
                        }
                    />
                ))}
            </div>
            <div className={s.right_icons}>
                <ImageIcons
                    size={32}
                    className={s.prev}
                    type="arrow-left"
                    onClick={() =>
                        onGoPrevMonth && onGoPrevMonth()
                    }
                />
                <ImageIcons
                    size={32}
                    className={s.next}
                    type="arrow-right"
                    onClick={() =>
                        onGoNextMonth && onGoNextMonth()
                    }
                />
            </div>
        </div>
    );
}
