// images
import { ImageIcons } from "../../utils/dom-assets";

// style
import s from './setting-title.module.scss';

export function Title(props: any) {
    return (
      <div className={s["title"]}>
        <div className={s["l"]}>
          <div
            className={s.setting}
            onClick={() => {
              props.history.go(-1);
            }}
          >
            <ImageIcons type="settings" size={64} className={s["setting-icon"]} />
          </div>
        </div>
        <div className={s["c"]}>Setting</div>
      </div>
    );
  }