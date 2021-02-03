import React, { PropsWithChildren } from 'react'
import { RouterProps } from 'react-router'
import { connect, DispatchProp } from 'react-redux'
import s from './style.module.scss'

import { SettingTitle } from '../main'
import { setFirstDayShow, setUnitInMonth } from '../../redux/settings'

export function Setting(props: any) {
    // props
    const { settings, setFirstDayShow, setUnitInMonth } = props;

    // functions
    function handleSetFirstDayShow(e: React.ChangeEvent<HTMLSelectElement>) {
        setFirstDayShow(e.target.value)
    }

    return (
        <div className={s.layout}>
            <div className={s["layout-t"]}>
                <SettingTitle {...props} />
            </div>
            <div className={s["layout-c"]}>
                <div className={s["option"]}>
                    每周的第一天显示：
                    <select
                        value={settings.firstDayToShow}
                        onChange={handleSetFirstDayShow}>
                        <option value={0}>周日</option>
                        <option value={1}>周一</option>
                        <option value={2}>周二</option>
                        <option value={3}>周三</option>
                        <option value={4}>周四</option>
                        <option value={5}>周五</option>
                        <option value={6}>周六</option>
                    </select>
                </div>
                <div className={s["option"]}>
                    <label htmlFor="">
                        {settings.unitInMonth ? '显示非当月数据' : '隐藏非当月数据'}
                        <input type="checkbox"
                            checked={settings.unitInMonth}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUnitInMonth(e.target.checked)}
                        />
                    </label>
                </div>
            </div>
        </div>
    )
}

export default connect(
    (state: any) => ({
        settings: state.settings
    }),
    (dispatch: any) => ({
        setFirstDayShow: (data: any) => setFirstDayShow(dispatch, data),
        setUnitInMonth: (data: any) => setUnitInMonth(dispatch, data)
    })
)(Setting);
