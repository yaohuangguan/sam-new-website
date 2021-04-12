// images
import { ImageIcons } from "../../utils/dom-assets";

// styles
import s from "./main-title.module.scss";

export function Title(props: any) {
    return (
      <div className={s["title"]}>
        <div className={s["c"]}>Fantastic Canlendar</div>
        <div className={s["r"]}>
          {/* <Link to="/">go /</Link> */}
          <div
            className={s.setting}
            onClick={() => {
              props.history.push("/main/setting");
            }}
          >
            <ImageIcons type="settings" size={64} className={s["setting-icon"]} />
          </div>
        </div>
      </div>
    );
  }