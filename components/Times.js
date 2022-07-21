import "chart.js/auto";
import { Chart } from "react-chartjs-2";

export default function Times({ pageviewsOverTime }) {
  return (
    <>
      <h2>Pageviews Over Time</h2>
      <div className={"uk-height-medium"}>
        <Chart
          type={"line"}
          data={{
            labels: pageviewsOverTime?.map((pageview) =>
              pageview.createdAt.substring(5, 10)
            ),
            datasets: [
              {
                data: pageviewsOverTime?.map(
                  (pageview) => pageview._count.anonymousId
                ),
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
