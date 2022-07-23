import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { useEffect, useState } from "react";

export default function Times({ sessionsOverTime, pageviewsOverTime }) {
  const [sessions, setSessions] = useState();

  useEffect(() => {
    if (sessionsOverTime) {
      const object = sessionsOverTime?.reduce(function (acc, obj) {
        let key = obj["createdAt"];
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
      }, {});
      const array = Object.keys(object).map((key) => [key, object[key]]);
      setSessions(array);
    }
  }, [sessionsOverTime]);

  return (
    <>
      <h2>Visitors Over Time</h2>
      <div className={"uk-height-medium"}>
        <Chart
          type={"line"}
          data={{
            labels: pageviewsOverTime?.map((pageview) =>
              pageview.createdAt.substring(5, 10)
            ),
            datasets: [
              {
                label: "Sessions",
                data: sessions?.map((session) => session[1].length),
                borderColor: "#ec008c",
                hoverOffset: 4,
              },
              {
                label: "Pageivews",
                data: pageviewsOverTime?.map(
                  (pageview) => pageview._count.anonymousId
                ),
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
