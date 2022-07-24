import { Chart } from "react-chartjs-2";

export default function Referrers({ paths, chartColors }) {
  return (
    <>
      <h2 id={"Pages"}>Pages</h2>
      <div data-uk-grid={""}>
        <div className={"uk-width-1-2@s"}>
          <table
            className={
              "uk-table uk-table-striped uk-table-hover uk-table-small uk-table-responsive"
            }
          >
            <thead>
              <tr>
                <th>Page</th>
                <th>Sessions</th>
                <th>Pageviews</th>
              </tr>
            </thead>
            <tbody>
              {paths?.map((path, key) => {
                return (
                  <tr key={key}>
                    <td>{path?.path}</td>
                    <td>{path?.sessions}</td>
                    <td>{path?.pageviews}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className={"uk-width-1-4@s"}>
          <p className={"uk-text-bold uk-margin-small-top"}>
            Sessions per Page
          </p>
          <Chart
            type={"doughnut"}
            data={{
              labels: paths?.map((path) => path?.path),
              datasets: [
                {
                  data: paths?.map((path) => path?.pageviews),
                  backgroundColor: chartColors,
                },
              ],
            }}
            options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        </div>
      </div>
    </>
  );
}
