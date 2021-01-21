import React, { useState, useEffect } from 'react';
import { CanlendarLayoutProps, UnitProps } from './index'
import s from './layout.module.scss'
import dayjs from 'dayjs'

// 基础新历渲染器
export function DefaultDateUnitRenderer(props: UnitProps) {
    const { date } = props
    return (
        <div className={s["unit"]}>
            <div className={s["base"]}>
                {date ? date.get('date') : null}
            </div>
        </div>
    )
}

// 日历网格
export function CanlendarLayout(props: CanlendarLayoutProps) {

    const weeks = `日一二三四五六`.split('')

    // 这个月
    const [currentDate, setCurrentDate] = useState(dayjs())

    const firstDate = currentDate.startOf("month")
    const lastDate = currentDate.endOf('month')
    const indexOfFirstDate = firstDate.get('day')
    const indexOfLastDate = lastDate.get('day')
    const units = []
    let headUnit = dayjs(firstDate).add(-indexOfFirstDate, 'day')
    let tailUnit = dayjs(lastDate).add(6 - indexOfLastDate, 'day')
    while (headUnit < tailUnit) {
        units.push(headUnit)
        headUnit = headUnit.add(1, 'day')
    }

    return (
        <div className={s.layout}>
            <div className={s["days"]}>
                {weeks.map((item: any, index) => (
                    <div key={index} className={s["day"]}>{item}</div>
                ))}
            </div>
            <div className={s["units"]}>
                {
                    units.map((item: any, index: number) => (
                        <DefaultDateUnitRenderer key={index} date={item} />
                    ))
                }
            </div>
        </div>
    )
}