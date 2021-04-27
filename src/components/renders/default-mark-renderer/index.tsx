import React from "react";
import s from "./style.module.scss";

// Mark渲染器
export const DefaultMarkRenderer = (props: any) => {
  const { marks } = props;
  return (
    <>
      {marks.length ? (
        <div className={s["marks"]}>
          <div className={s["mark"]} />
        </div>
      ) : null}
      {props.children}
    </>
  );
};

export default DefaultMarkRenderer;
