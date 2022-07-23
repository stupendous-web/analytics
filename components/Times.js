import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { useEffect } from "react";

export default function Times({ sessionsOverTime, pageviewsOverTime }) {
  return (
    <>
      <h2>Visitors Over Time</h2>
      <div className={"uk-height-medium"}>
        <Chart
          type={"line"}
          data={{
            labels:
              pageviewsOverTime &&
              Object.keys(pageviewsOverTime)?.map((pageview) => pageview),
            datasets: [
              {
                label: "Sessions",
                data: sessionsOverTime,
                borderColor: "#ec008c",
                hoverOffset: 4,
              },
              {
                label: "Pageivews",
                data: pageviewsOverTime,
                borderColor: "#080005",
                hoverOffset: 4,
              },
            ],
          }}
          options={{
            plugins: {
              legend: {
                display: true,
                labels: {
                  color: "rgb(255, 99, 132)",
                },
              },
            },
            maintainAspectRatio: false,
          }}
        />
      </div>
    </>
  );
}
