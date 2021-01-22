import React from "react";
import s from "./style.module.scss";

// Mark渲染器
export const DefaultMarkRenderer = (props: any) => {
    const { marks } = props;
    return (
        <>
            {
                marks.length ?
                    <div className={s["marks"]}>
                        {
                            marks.map((item: any, index: number) =>
                                <div className={s["mark"]} key={index} />
                            )
                        }
                    </div>
                    : null
            }
            {props.children}
        </>
    )
}
