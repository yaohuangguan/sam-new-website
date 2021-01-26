import dayjs, { Dayjs } from "dayjs";

export interface CanlendarLayoutProps {
  settings: any;
  units: any;
  frontDate: Dayjs;
  onUnitClick: (Dayjs) => void;
  onGoNextMonth: () => void;
  onGoPrevMonth: () => void;
}

export interface UnitProps {
  date: Dayjs;
}

declare module "@tony801015/chinese-lunar";
