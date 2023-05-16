import { Chart, LineAdvance, Axis } from "bizcharts";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import seedrandom from "seedrandom";
dayjs.extend(isSameOrBefore);
export default function Graph({ width, height = 380, data, range, changeSum }) {
  const defaultData = [
    { day: "MON", amount: 100 },
    { day: "TUE", amount: 150 },
    { day: "WED", amount: 200 },
    { day: "THU", amount: 175 },
    { day: "FRI", amount: 225 },
    { day: "SAT", amount: 250 },
    { day: "SUN", amount: 300 },
  ];
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

    while (currentDate.isSameOrBefore(toDate, "day")) {
      let day, amount;

      if (currentDate.isSame(currentWeek, "week")) {
        // Generate random amount for current week's days
        day = currentDate.format("ddd");
        amount = Math.floor(rng() * 100000) + 100; // Use seeded random number
      } else {
        // Generate random amount for other days
        day = currentDate.format("DD/MM/YYYY");
        amount = Math.floor(rng() * 100000) + 100; // Use seeded random number
      }
      totalsum += amount;

      data.push({ day, amount });
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
  // Example usage
  const formatAmountLabel = (val) => {
    if (val >= 1e12) {
      return `${(val / 1e12).toFixed(1)}T`;
    } else if (val >= 1e9) {
      return `${(val / 1e9).toFixed(1)}B`;
    } else if (val >= 1e6) {
      return `${(val / 1e6).toFixed(1)}M`;
    } else if (val >= 1e3) {
      return `${(val / 1e3).toFixed(1)}K`;
    }
    return val;
  };

  return (
    <>
      <Chart
        padding={[10, 20, 50, 40]}
        height={height}
        width={width}
        data={
          data !== null && data !== undefined
            ? data
            : range !== null && range !== undefined
            ? generateData(range)
            : generateData(generateCurrentWeekDateRange())
        }
      >
        <LineAdvance
          shape="smooth"
          area
          position="day*amount"
          color="#ffb722"
        />

        <Axis
          name="day"
          grid={{ line: { style: { lineWidth: 0 } } }}
          line={0}
        />
        <Axis
          name="amount"
          grid={{ line: { style: { lineWidth: 0 } } }}
          label={{
            formatter: formatAmountLabel, // Use the custom formatter
          }}
        />
      </Chart>
    </>
  );
}
