import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { Chart } from "react-chartjs-2";

export default function Referrers({ referrers, chartColors }) {
  const removeProtocol = (url) => {
    if (url.startsWith("https://www.")) {
      return url.slice(12);
    }
    if (url.startsWith("https://www.")) {
      return url.slice(13);
    }
    if (url.startsWith("http://")) {
      return url.slice(7);
    }
    if (url.startsWith("https://")) {
      return url.slice(8);
    }
    return url;
  };

  const searchEngines = ["https://www.google.com/"];
  const search = referrers?.filter((referrer) =>
    searchEngines.includes(referrer.path)
  ).length;

  const socialMediaPlatforms = [
    "https://t.co/",
    "https://l.facebook.com/",
    "https://www.reddit.com/",
  ];
  const social = referrers?.filter((referrer) =>
    socialMediaPlatforms.includes(referrer.path)
  ).length;

  const direct = referrers?.filter(
    (referrer) => referrer.path === "Direct"
  ).length;

  const other = referrers?.length - (search + social + direct);

  return (
    <>
      {" "}
      <h2 id={"Popular Sources"}>Popular Sources</h2>
      <div data-uk-grid={""}>
        <div className={"uk-width-1-2@s"}>
          <table
            className={
              "uk-table uk-table-striped uk-table-hover uk-table-small uk-table-responsive"
            }
          >
            <thead>
              <tr>
                <th>Location</th>
                <th>Sessions</th>
                <th>Pageviews</th>
              </tr>
            </thead>
            <tbody>
              {referrers?.map((referrer, key) => {
                return (
                  <tr key={key}>
                    <td>
                      {removeProtocol(referrer?.path)}{" "}
                      <a href={referrer?.path}>
                        <FontAwesomeIcon icon={faUpRightFromSquare} />
                      </a>{" "}
                    </td>
                    <td>{referrer?.sessions}</td>
                    <td>{referrer?.pageviews}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className={"uk-width-1-4@s"}>
          <p className={"uk-text-bold uk-margin-small-top"}>Referrals</p>
          <Chart
            type={"doughnut"}
            data={{
              labels: ["Search", "Social", "Direct", "Other"],
              datasets: [
                {
                  data: [search, social, direct, other],
                  backgroundColor: chartColors,
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
            }}
          />
        </div>
        <div className={"uk-width-1-4@s"}>
          <p className={"uk-text-bold uk-margin-small-top"}>Locations</p>
          <Chart
            type={"doughnut"}
            data={{
              labels: referrers?.map((referrer) => referrer?.path),
              datasets: [
                {
                  data: referrers?.map((referrer) => referrer?.sessions),
                  backgroundColor: chartColors,
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
            }}
          />
        </div>
      </div>
    </>
  );
}
