import React, { useEffect, useState } from 'react'
import { RouterProps } from 'react-router'

import s from './style.module.scss'

export default function Splash(props: RouterProps) {
    const [seconds, setSeconds] = useState(1)
    useEffect(() => {
        const next = seconds + 1
        if (next < 3) {
            const ik = window.setInterval(() => {
                setSeconds(next)
            }, 1000)
            return () => {
                clearInterval(ik)
            }
        } else {
            props.history.push('/main')
        }
    }, [])
    return (
        <div className={s.layout}>
            Splash {seconds}
        </div>
    )
}