import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { useEffect } from "react";

export default function Times({ sessionsOverTime, pageviewsOverTime }) {
  useEffect(() => {
    if (pageviewsOverTime) {
      console.log(
        Object.keys(pageviewsOverTime)?.map(
          (pageview) => pageviewsOverTime[pageview].length
        )
      );
    }
  }, [pageviewsOverTime]);
  /*

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

*/

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
                label: "Pageivews",
                data:
                  pageviewsOverTime &&
                  Object.keys(pageviewsOverTime)?.map(
                    (pageview) => pageviewsOverTime[pageview].length
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
