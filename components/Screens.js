import { Chart } from "react-chartjs-2";

export default function Screens({ screens }) {
  return (
    <>
      <h2 id={"Screens"}>Screens</h2>
      <div data-uk-grid={""}>
        <div className={"uk-width-1-2@s"}>
          <table
            className={
              "uk-table uk-table-striped uk-table-hover uk-table-small uk-table-responsive"
            }
          >
            <thead>
              <tr>
                <th>Size</th>
                <th>Sessions</th>
                <th>Pageviews</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Portrait</td>
                <td>{screens?.portraitSessions}</td>
                <td>{screens?.portraitPageviews}</td>
              </tr>
              <tr>
                <td>Landscape</td>
                <td>{screens?.landscapeSessions}</td>
                <td>{screens?.landscapePageviews}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={"uk-width-1-4@s"}>
          <p className={"uk-text-bold uk-margin-small-top"}>
            Sessions per Screen
          </p>
          <Chart
            type={"doughnut"}
            data={{
              labels: ["Portrait", "Landscape"],
              datasets: [
                {
                  data: [screens?.portraitSessions, screens?.landscapeSessions],
                  backgroundColor: ["#ec008c", "#ba0070"],
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
        <div className={"uk-width-1-4@s"}>
          <p className={"uk-text-bold uk-margin-small-top"}>
            Pageviews per Screen
          </p>
          <Chart
            type={"doughnut"}
            data={{
              labels: ["Portrait", "Landscape"],
              datasets: [
                {
                  data: [
                    screens?.portraitPageviews,
                    screens?.landscapePageviews,
                  ],
                  backgroundColor: ["#ec008c", "#ba0070"],
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
