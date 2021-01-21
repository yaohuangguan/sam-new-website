import React from 'react'
import { RouterProps } from 'react-router'
import { Link } from 'react-router-dom'
import { CanlendarLayout } from '../../components/canlendar/layout'

import s from './style.module.scss'

export default function Main(props: RouterProps) {
    const tools = [1, 2, 3, 4]
    return (
        <div className={s.layout}>
            <div className={s["layout-t"]}>
                <div className={s['title']}>
                    <div className={s['l']}>
                        <div
                            className={s.setting}
                            onClick={() => {
                                props.history.push('/main/setting')
                            }}>
                            <span className={s['setting-icon']} />
                        </div>
                    </div>
                    <div className={s["c"]}>Fantastic Canlendar</div>
                    <div className={s["r"]}>
                        <div
                            className={s.setting}
                            onClick={() => {
                                props.history.push('/main/setting')
                            }}>
                            <span className={s['setting-icon']} />
                        </div>
                    </div>
                </div>
            </div>
            <div className={s["layout-c"]}>
                <CanlendarLayout />
            </div>
            <div className={s["layout-b"]}>
                <ul className={s['tools']}>
                    {
                        tools.map((item: any, index: number) => (
                            <li key={index} className={s['tool']}>tools {index} @todo</li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}