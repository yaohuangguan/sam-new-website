import React from 'react'
import { CanlendarLayout } from '../../components/canlendar/layout'

import s from './style.module.scss'

export default function Main() {
    return (
        <div className={s.layout}>
            <div className={s["layout-t"]}>
                title todo
            </div>
            <div className={s["layout-c"]}>
                <CanlendarLayout />
            </div>
            <div className={s["layout-b"]}>
                tools todo
            </div>
        </div>
    )
}