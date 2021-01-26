import React, { useEffect, useState } from 'react'
import { RouterProps } from 'react-router'

import s from './style.module.scss'

export default function Splash(props: RouterProps) {
    const [seconds, setSeconds] = useState(1)
    useEffect(() => {
        const next = seconds + 1
        let tk = 0
        tk = window.setTimeout(() => {
            if (next < 3) {
                setSeconds(next)
            } else {
                props.history.replace('/main')
            }
        }, 1000)
        return () => {
            tk && clearTimeout(tk)
        }
    }, [seconds])

    return (
        <div className={s.layout}>
            Splash {seconds}
        </div>
    )
}