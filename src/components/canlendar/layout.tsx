import React, { useState, useEffect, PropsWithChildren, useMemo } from 'react';
import cn from 'classnames'
import { CanlendarLayoutProps, UnitProps } from './index'
import s from './layout.module.scss'
import dayjs from 'dayjs'

// 网格渲染器
const DefaultUnitRenderer = (props: any) =>
    <div className={s["unit"]}>{props.children}</div>

// 网格基准渲染器
const DefaultBaseRenderer = (props: any) =>
    <div className={s["base"]}>{props.children}</div>

// 今日数字渲染器
const DefaultTodayRenderer = (props: any) =>
    <div className={cn({
        [s["today"]]: props.isToday,
        [s["outside"]]: !props.isInMonth
    })}>{props.children}</div>

// 普通日数字渲染器
const DefaultDateRenderer = (props: any) =>
    <span className={s["date"]}>{props.date.get('date')}</span>


// 基础新历渲染器
export function DefaultDateUnitRenderer(props: UnitProps) {
    return [
        DefaultDateRenderer,
        DefaultTodayRenderer,
        DefaultBaseRenderer,
        DefaultUnitRenderer,
    ]
        .reduce((prev: any, Next: any) => <Next {...props}>{prev}</Next>, null)
}

// 日历网格
export function CanlendarLayout(props: CanlendarLayoutProps) {
    // props
    const { settings } = props
    const { firstDayToShow } = settings

    // 星期
    let weeks = `日一二三四五六`.split('')
    weeks = weeks.concat(weeks.splice(0, firstDayToShow))

    // 这个月
    const [currentDate, setCurrentDate] = useState(dayjs(dayjs().startOf("date")))

    const firstDate = currentDate.startOf("month")
    const lastDate = currentDate.endOf('month')


    const indexOfFirstDate = firstDate.get('day')
    const indexOfLastDate = lastDate.get('day')

    const units = []
    let headUnit = dayjs(firstDate).add(-indexOfFirstDate + firstDayToShow, 'day')
    let tailUnit = dayjs(lastDate).add(6 - indexOfLastDate + firstDayToShow, 'day')

    // console.log(currentDate.toDate().toLocaleDateString())
    // console.log(headUnit.toDate().toLocaleDateString())
    // console.log(tailUnit.toDate().toLocaleDateString())

    while (headUnit < tailUnit) {
        units.push({
            date: headUnit,
            isToday: headUnit.isSame(currentDate),
            isInMonth: headUnit.isSame(currentDate, "month")
        })
        headUnit = headUnit.add(1, 'day')
    }

    const currentDateFormat = useMemo(() => currentDate.format('YYYY-MM-DD'), [currentDate])

    return (
        <div className={s.layout}>
            <div className={s['title']}>
                <div className={s["l"]}>{currentDateFormat}</div>
                <div className={s["c"]}></div>
                <div className={s["r"]}>
                    <div className={s["prev"]} />
                    <div className={s["next"]} />
                </div>
            </div>
            <div className={s["days"]}>
                {weeks.map((item: any, index) => (
                    <div key={index} className={s["day"]}>{item}</div>
                ))}
            </div>
            <div className={s["units"]}>
                {
                    units.map((item: any, index: number) => (
                        <DefaultDateUnitRenderer key={index} {...item} />
                    ))
                }
            </div>
        </div>
    )
}