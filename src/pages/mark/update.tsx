import React from 'react'

import s from "./style.module.scss";

export function UpdateMarker(props: any) {
    function handleGoBack() {
        props.history.go(-1)
    }
    return (
        <div className={s["layout"]}>
            <button onClick={handleGoBack}>goback</button>
            <div>
            UpdateMarker
            </div>
        </div>
    )
}
