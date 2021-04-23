import React from "react";
// @ts-ignore
import lunar from "@tony801015/chinese-lunar";

// uikit
import { Box, Typography } from "@material-ui/core";

export default function LunarDate(props: any) {
  const build = props.date.format("YYYY-MM-DD").split("-");
  const L = lunar(...build).getJson();
  const lunarFormat1 = `农历${L.lunarMonth}${L.lunarDay}`;
  const lunarFormat2 = `${L.chineseYear}年 ${L.chineseMonth}月 ${L.chineseDay}日`;

  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom>
        {lunarFormat1}
      </Typography>
      <Typography variant="body2" gutterBottom>
        {lunarFormat2}
      </Typography>
    </Box>
  );
}
