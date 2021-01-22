import React, { useState, useEffect, PropsWithChildren, useMemo } from 'react';
import cn from 'classnames'
import { CanlendarLayoutProps, UnitProps } from './index'
import s from './layout.module.scss'
import dayjs from 'dayjs'

// @ts-ignore
import lunar from '@tony801015/chinese-lunar'

// 网格渲染器
const DefaultUnitRenderer = (props: any) =>
    <div className={s["unit"]}>{props.children}</div>

// 网格基准渲染器
const DefaultBaseRenderer = (props: any) =>
    <div className={s["base"]}>{props.children}</div>

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
    console.log(L)
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
    const { settings } = props
    const { firstDayToShow } = settings

    // states
    // 星期
    let weeks = `日一二三四五六`.split('')
    weeks = weeks.concat(weeks.splice(0, firstDayToShow))

    // 这个月
    const [currentDate, setCurrentDate] = useState(dayjs(dayjs().startOf("date")))
    const [baseDate, setBaseDate] = useState(currentDate)
    const [units, setUnits] = useState<any>([])

    // @notice unit test dont delete
    // const [units, setUnits] = useState<any>([{
    //     date: baseDate,
    //     isToday: baseDate.isSame(currentDate),
    //     isInMonth: baseDate.isSame(baseDate, "month")
    // }])


    // effects
    useEffect(() => {
        const firstDate = baseDate.startOf("month")
        const lastDate = baseDate.endOf('month')
        const indexOfFirstDate = firstDate.get('day')
        const indexOfLastDate = lastDate.get('day')
        const tunits = []
        let headUnit = dayjs(firstDate).add(-indexOfFirstDate + firstDayToShow, 'day')
        let tailUnit = dayjs(lastDate).add(6 - indexOfLastDate + firstDayToShow, 'day')
        while (headUnit < tailUnit) {
            tunits.push({
                date: headUnit,
                isToday: headUnit.isSame(currentDate),
                isInMonth: headUnit.isSame(baseDate, "month")
            })
            headUnit = headUnit.add(1, 'day')
        }
        setUnits(tunits)
    }, [baseDate])

    // memos
    const baseDateFormat = useMemo(() => baseDate.format('YYYY-MM'), [baseDate])

    // functions
    function handleGoPrevMonth() {
        setBaseDate(baseDate.add(-1, 'month').startOf('date'))
        // Notification.requestPermission()
        // Notification.permission
        // Notification.requestPermission(function(){
        // })
        // new Notification("title");
        // .then(function (result) {
        //     // result可能是是granted, denied, 或default.
        //     console.log(result)
        // });
    }
    function handleGoNextMonth() {
        setBaseDate(baseDate.add(1, 'month').startOf('date'))
    }

    return (
        <div className={s.layout}>
            <div className={s['title']}>
                <div className={s["l"]}>{baseDateFormat}</div>
                <div className={s["c"]}></div>
                <div className={s["r"]}>
                    <div className={s["prev"]} onClick={handleGoPrevMonth} />
                    <div className={s["next"]} onClick={handleGoNextMonth} />
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