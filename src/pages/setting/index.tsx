import React, { PropsWithChildren } from 'react'
import { RouterProps } from 'react-router'
import { connect, DispatchProp } from 'react-redux'
import s from './style.module.scss'

import { SettingTitle } from '../main'
import { setFirstDayShow } from '../../redux/settings'

export function Setting(props: any) {
    const { settings } = props;
    
    function handleSetFirstDayShow(index: number) {
        props.setFirstDayShow(index)
    }
    return (
        <div className={s.layout}>
            <div className={s["layout-t"]}>
                <SettingTitle {...props} />
            </div>
            {settings.firstDayToShow}
            <div onClick={() => handleSetFirstDayShow(0)}>设置周日为星期的第一天</div>
            <div onClick={() => handleSetFirstDayShow(1)}>设置周一为星期的第一天</div>
            <div onClick={() => handleSetFirstDayShow(2)}>设置周二为星期的第一天</div>
            <div onClick={() => handleSetFirstDayShow(3)}>设置周三为星期的第一天</div>
            <div onClick={() => handleSetFirstDayShow(4)}>设置周四为星期的第一天</div>
            <div onClick={() => handleSetFirstDayShow(5)}>设置周五为星期的第一天</div>
            <div onClick={() => handleSetFirstDayShow(6)}>设置周六为星期的第一天</div>
        </div>
    )
}

export default connect(
    (state: any) => ({
        settings: state.settings
    }),
    (dispatch: any) => ({
        setFirstDayShow: (data: any) => setFirstDayShow(dispatch, data)
    })
)(Setting);
