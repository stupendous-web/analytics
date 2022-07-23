import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { Chart } from "react-chartjs-2";

export default function Referrers({
  pageviews,
  referrerPageviews,
  chartColors,
}) {
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
  const search = pageviews?.filter((pageview) =>
    searchEngines.includes(pageview?.referrer)
  ).length;

  const socialMediaPlatforms = [
    "https://t.co/",
    "https://l.facebook.com/",
    "https://www.reddit.com/",
  ];
  const social = pageviews?.filter((pageview) =>
    socialMediaPlatforms.includes(pageview?.referrer)
  ).length;

  const direct = pageviews?.filter(
    (pageview) => pageview?.referrer === "Direct"
  ).length;

  const other = pageviews?.length - (search + social + direct);

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
              {referrerPageviews?.map((referrer, key) => {
                return (
                  <tr key={key}>
                    <td>
                      {removeProtocol(referrer?.referrer)}{" "}
                      <a href={referrer?.referrer}>
                        <FontAwesomeIcon icon={faUpRightFromSquare} />
                      </a>{" "}
                    </td>
                    <td>{referrer?._count.referrer}</td>
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
              labels: referrerPageviews?.map((referrer) => referrer?.referrer),
              datasets: [
                {
                  data: referrerPageviews?.map(
                    (referrer) => referrer?._count.referrer
                  ),
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
