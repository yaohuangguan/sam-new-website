import dayjs, { Dayjs } from "dayjs";

export interface CanlendarLayoutProps {
  settings: any;
  onChange: (Dayjs) => void;
}

export interface UnitProps {
  date: Dayjs;
}

declare module "@tony801015/chinese-lunar";
