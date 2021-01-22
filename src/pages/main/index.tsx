import React from 'react'
// import { RouterProps } from 'react-router'
import { connect } from 'react-redux'
import { CanlendarLayout } from '../../components/canlendar/layout'
import { ImageIcons } from '../../utils/dom-assets'
import s from './style.module.scss'

export function MainTitle(props: any) {
    return (
        <div className={s['title']}>
            <div className={s["c"]}>Fantastic Canlendar</div>
            <div className={s["r"]}>
                <div
                    className={s.setting}
                    onClick={() => {
                        props.history.push('/main/setting')
                    }}>
                    <ImageIcons type='settings' size={64} className={s['setting-icon']} />
                </div>
            </div>
        </div>
    )
}

export function SettingTitle(props: any) {
    return (
        <div className={s['title']}>
            <div className={s['l']}>
                <div
                    className={s.setting}
                    onClick={() => {
                        props.history.go(-1)
                    }}>
                    <ImageIcons type='settings' size={64} className={s['setting-icon']} />
                </div>
            </div>
            <div className={s["c"]}>Setting</div>
        </div>
    )
}

export function Main(props: any) {
    const tools = [1, 2, 3, 4]
    return (
        <div className={s.layout}>
            <div className={s["layout-t"]}>
                <MainTitle {...props} />
            </div>
            <div className={s["layout-c"]}>
                <CanlendarLayout {...props} />
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

export default connect((state: any) => ({
    settings: state.settings
}))(Main);
