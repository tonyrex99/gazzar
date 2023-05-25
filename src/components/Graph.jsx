import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Brush,
  ResponsiveContainer,
} from "recharts";

import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import seedrandom from "seedrandom";
dayjs.extend(isSameOrBefore);

export default function Graph({ range, changeSum, width, height }) {
  const generateData = (dateRange) => {
    const [formattedFromDate, formattedToDate] = dateRange;
    const fromDate = dayjs(formattedFromDate, "DD/MM/YYYY");
    const toDate = dayjs(formattedToDate, "DD/MM/YYYY");
    const currentWeek = dayjs().startOf("week");

    const data = [];
    let currentDate = fromDate;
    let totalsum = 0;

    // Use seeded random number generator
    const rng = seedrandom(dateRange.join("")); // Seed based on the date range
    let i = 0;
    while (currentDate.isSameOrBefore(toDate, "day")) {
      i++;
      let day, amount;

      if (currentDate.isSame(currentWeek, "week")) {
        // Generate random amount for current week's days
        day = currentDate.format("ddd").toUpperCase();
        amount = Math.floor(rng() * 100000) + 100; // Use seeded random number
      } else {
        // Generate random amount for other days
        day = currentDate.format("DD/MM/YYYY");
        amount = Math.floor(rng() * 100000) + 100; // Use seeded random number
      }
      totalsum += amount;

      data.push({ key: i, day, amount });
      currentDate = currentDate.add(1, "day");
    }

    if (dateRange[0] === null && dateRange[1] === null) {
      return generateData(generateCurrentWeekDateRange());
    }
    changeSum(totalsum);
    return data;
  };

  const generateCurrentWeekDateRange = () => {
    const startOfWeek = dayjs().startOf("week");
    const currentDay = dayjs();

    const startDate = startOfWeek.format("DD/MM/YYYY");
    const endDate = currentDay.format("DD/MM/YYYY");

    return [startDate, endDate];
  };
  const formatAmountLabel = (val) => {
    if (val >= 1e12) {
      return `${(val / 1e12).toFixed(0)}T`;
    } else if (val >= 1e9) {
      return `${(val / 1e9).toFixed(0)}B`;
    } else if (val >= 1e6) {
      return `${(val / 1e6).toFixed(0)}M`;
    } else if (val >= 1e3) {
      return `${(val / 1e3).toFixed(0)}K`;
    }
    return val;
  };
  const formatTooltipValue = (value) => {
    return value.toLocaleString();
  };
  const data =
    range !== null && range !== undefined
      ? generateData(range)
      : generateData(generateCurrentWeekDateRange());

  return (
    <ResponsiveContainer width={width} height={height}>
      <AreaChart data={data}>
        <XAxis
          dataKey="day"
          axisLine={false}
          tick={{
            fontSize: 14,
            fontWeight: "Medium",
            fontFamily: "Satoshi",
            fill: "var(--grey-800)",
          }}
          tickLine={false}
        />
        <YAxis
          axisLine={false}
          tickFormatter={formatAmountLabel}
          tick={{
            fontSize: 14,
            fontWeight: "Medium",
            fontFamily: "Satoshi",
            fill: "var(--grey-800)",
          }}
          tickLine={false}
        />
        <Area
          type="monotone"
          dataKey="amount"
          stroke="#ffb722"
          fill="url(#colorGradient)"
          strokeWidth={2}
        />
        {data.length > 15 && (
          <Brush dataKey="day" height={10} travellerWidth={12} />
        )}

        <defs>
          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffb722" stopOpacity={0.5} />
            <stop offset="90%" stopColor="#ffb722" stopOpacity={0.03} />
          </linearGradient>
        </defs>
        <Tooltip
          contentStyle={{
            backgroundColor: "#ffffff",
            borderRadius: "4px",
            padding: "6px 8px",
            color: "#000000",
            borderColor: "var(--grey-400)",
          }}
          cursor={{ stroke: "#ffffff", strokeWidth: 1 }}
          formatter={(value) => formatTooltipValue(value)}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
