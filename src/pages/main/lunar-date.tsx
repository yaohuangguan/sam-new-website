
import React from 'react'
// @ts-ignore
import lunar from '@tony801015/chinese-lunar'
import s from "./lunar-date.module.scss";

export default function LunarDate(props: any) {
    const build = props.date.format('YYYY-MM-DD').split('-')
    const L = lunar(...build).getJson()
    const lunarFormat1 = `农历${L.lunarMonth}${L.lunarDay}`
    const lunarFormat2 = `${L.chineseYear}年 ${L.chineseMonth}月 ${L.chineseDay}日`

    return (
        <div className={s["layout"]}>
            <div className={s["t"]}>{lunarFormat1}</div>
            <div className={s["b"]}>{lunarFormat2}</div>
        </div>
    )
}