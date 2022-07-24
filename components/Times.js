import "chart.js/auto";
import { Chart } from "react-chartjs-2";

export default function Times({ sessions, pageviews }) {
  return (
    <>
      <h2 id={"Visitors"}>Visitors Over Time</h2>
      <div className={"uk-height-medium"}>
        <Chart
          type={"line"}
          data={{
            labels: [],
            datasets: [
              {
                label: "Sessions",
                data: sessions,
                borderColor: "rgba(236, 0, 140, 1)",
                backgroundColor: "rgba(236, 0, 140, .3)",
                fill: true,
              },
              {
                label: "Pageivews",
                data: pageviews,
                borderColor: "rgba(236, 0, 140, .2)",
                backgroundColor: "rgba(236, 0, 140, .1)",
                fill: true,
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
