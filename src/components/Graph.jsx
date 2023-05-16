import { Chart, LineAdvance, Axis } from "bizcharts";

const defaultData = [
  { day: "MON", amount: 100 },
  { day: "TUE", amount: 150 },
  { day: "WED", amount: 200 },
  { day: "THU", amount: 175 },
  { day: "FRI", amount: 225 },
  { day: "SAT", amount: 250 },
  { day: "SUN", amount: 300 },
];

export default function Graph({ width, height = 380, data = defaultData }) {
  return (
    <>
      <Chart
        padding={[10, 20, 50, 40]}
        height={height}
        width={width}
        data={data}
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
            formatter: (val) => `${val}K`,
          }}
        />
      </Chart>
    </>
  );
}
