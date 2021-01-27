import React, { Fragment } from "react";
import s from "./style.module.scss";
import { ImageIcons } from "../../utils/dom-assets";
import { INavigationProps, ModuleOption } from "./defined";

const Navigation = (props: any) => {
  const { moduleOptions } = props;
    // console.log('props', props)
  return (
    <Fragment>
      {props.children}
      <div className={s.nav_container}>
        {moduleOptions.map((el: ModuleOption) => (
          <div key={el.name} className={s.nav_item}>
            <ImageIcons
              type={el.icon}
              size={32}
              onClick={() => {
                props.history.push(el.route);
              }}
            />
            <span>{el.name}</span>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default Navigation;
