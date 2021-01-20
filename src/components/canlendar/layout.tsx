import React, { useState, useEffect } from 'react';
import { CanlendarLayoutProps, UnitProps } from './index'
import s from './layout.module.scss'
import dayjs from 'dayjs'

// 基础新历渲染器
export function DefaultDateUnitRenderer(props: UnitProps) {
    return (
        <span></span>
    )
}


// 日历网格
export function CanlendarLayout(props: CanlendarLayoutProps) {

    const [currentDate, setCurrentDate] = useState(dayjs())

    const indexOfMonth = currentDate.get('month')
    const indexOfWeek = currentDate.get('day')

    const units = new Array(31).fill(0)

    return (
        <div className={s.layout}>
            <div>{currentDate.format('YYYY-MM-DD HH:mm:ss')}</div>
            <div>{indexOfMonth}</div>
            <div>{indexOfWeek}</div>
            <div className={s["units"]}>
                {
                    units.map((item: any, index: number) => (
                        <div key={index} className={s["unit"]}>
                            <div className={s["base"]}>
                                {index + 1}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}