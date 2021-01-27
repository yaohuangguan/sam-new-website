import React, { useState, useEffect } from 'react'

import s from './style.module.scss'

export function MarkList(props: any) {
    const outer = new Array(20).fill(
        new Array(10).fill(0)
    )
    return (
        <div className={s["layout"]}>
            <ul className={s["olist"]}>
                {
                    outer.map((iitem: any, i: number) => (
                        <li className={s["olist-item"]} key={i}>
                            <ul className={s["ilist"]}>
                                <li className={s["title"]}>2020-01-16 {i + 1}</li>
                                {
                                    iitem.map((jitem: any, j: number) => (
                                        <li className={s["ilist-item"]} key={j}>
                                            inner item {j + 1}
                                        </li>
                                    ))
                                }
                            </ul>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}