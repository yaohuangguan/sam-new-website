import dayjs, { Dayjs } from "dayjs";

export function get() {}

function allStorage() {
  let values: any[] = [],
    keys = Object.keys(localStorage),
    i = keys.length;
  while (i--) {
    // @ts-ignore
    const item = localStorage.getItem(keys[i]);
    if (item) {
      const jsonized = JSON.parse(JSON.stringify(item));
      values.push(jsonized);
    }
  }
  return values;
}

// 初始化dates
export function initDates(date: Dayjs, settings: any) {
  const all = allStorage();
  return new Promise((resolve, reject) => {
    const { firstDayToShow } = settings;
    const baseDate = dayjs(date);
    const firstDate = baseDate.startOf("month");
    const lastDate = baseDate.endOf("month");
    const indexOfFirstDate = firstDate.get("day");
    const indexOfLastDate = lastDate.get("day");
    const tunits = [];
    const tailUnit = dayjs(lastDate).add(
      6 - indexOfLastDate + firstDayToShow,
      "day"
    );
    let headUnit = dayjs(firstDate).add(
      -indexOfFirstDate + firstDayToShow,
      "day"
    );
    // console.log(all, headUnit.toString())
    while (headUnit < tailUnit) {
      tunits.push({
        date: headUnit,
        isToday: dayjs().startOf("date").isSame(headUnit),
        isInMonth: headUnit.isSame(baseDate, "month"),
        marks: all.filter((item: any) => item.date === headUnit.toString()),
      });
      headUnit = headUnit.add(1, "day");
    }
    resolve(tunits);
  });
}

// 获取mark
export function getMarksByDate(date: string) {
  const all = allStorage();
  return Promise.resolve(
    all.filter((item: any) => {
      return item.date === date;
    })
  );
}
// 添加mark
export function createMark(data: any) {
  return new Promise<void>((resolve, reject) => {
    try {
      const recordId = Math.round(Math.random() * 100) + "";
      const recordData = JSON.stringify({
        ...data,
      });
      window.localStorage.setItem(recordId, recordData);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}
