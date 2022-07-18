import { useEffect, useState } from "react";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";

export default function Times({ pageviews }) {
  const [times, setTimes] = useState([]);
  useEffect(() => {
    if (pageviews) {
      const timesObject = pageviews.reduce((accumulator, object) => {
        let groupKey = object["createdAt"].substring(0, 10);
        if (!accumulator[groupKey]) {
          accumulator[groupKey] = [];
        }
        accumulator[groupKey].push(object);
        return accumulator;
      }, {});
      const timesArray = Object.keys(timesObject).map((key) => [
        key,
        timesObject[key],
      ]);
      timesArray.pop();
      setTimes(timesArray);
    }
  }, [pageviews]);

  return (
    <>
      <div className={"uk-height-medium"}>
        <Chart
          type={"line"}
          data={{
            labels: times?.map((times) => times[0]),
            datasets: [
              {
                data: times?.map((times) => times[1].length),
                borderColor: "#ec008c",
                hoverOffset: 4,
              },
            ],
          }}
          options={{
            plugins: {
              legend: {
                display: false,
              },
            },
            maintainAspectRatio: false,
          }}
        />
      </div>
    </>
  );
}
