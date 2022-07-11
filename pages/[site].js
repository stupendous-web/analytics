import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";

export default function Site() {
  const router = useRouter();
  const { site } = router.query;

  const [pageviewCount, setPageviewCount] = useState();
  const [sessionCount, setSessionCount] = useState();
  const [referrers, setReferrers] = useState();
  const [paths, setPaths] = useState();

  const chartColors = [
    "#ec008c",
    "#d4007f",
    "#ba0070",
    "#a10060",
    "#870051",
    "#6e0042",
    "#540032",
    "#3b0023",
    "#210014",
    "#080005",
  ];

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!router.isReady) return;
    axios.get("/api/pageviews/" + site).then((response) => {
      setPageviewCount(response.data.pageviewCount[0]);
      setSessionCount(response.data.sessionCount.length);
      setReferrers(response.data.referrers);
      setPaths(response.data.paths);
      setLoading(false);
    });
  }, [router.isReady]);

  return (
    <>
      <div className={"uk-section"} uk-height-viewport={""}>
        <div className={"uk-container uk-container-expand"}>
          {site && <h1>@{site}</h1>}
          <div
            className={"uk-child-width-1-2 uk-text-center uk-grid-match"}
            uk-grid={""}
          >
            <div>
              <div className={"uk-card uk-card-secondary uk-card-body"}>
                <h1 className={"uk-heading-large uk-margin-remove"}>
                  {sessionCount}
                </h1>
                <p>Sessions</p>
              </div>
            </div>
            <div>
              <div className={"uk-card uk-card-secondary uk-card-body"}>
                <h1 className={"uk-heading-large uk-margin-remove"}>
                  {sessionCount > 0 ? pageviewCount?._count?.site : 0}
                </h1>
                <p>Pageviews</p>
              </div>
            </div>
          </div>
          <div
            className={
              "uk-section-default uk-padding-small uk-padding-remove-horizontal"
            }
            uk-sticky={""}
          >
            <ul className={"uk-subnav uk-margin-remove-bottom"}>
              <li>
                <a href={"#referrers"} uk-scroll={""}>
                  Top Sources
                </a>
              </li>
              <li>
                <a href={"#paths"} uk-scroll={""}>
                  Top Pages
                </a>
              </li>
            </ul>
          </div>
          <h2 id={"referrers"}>Top Sources</h2>
          <div uk-grid={""}>
            <div className={"uk-width-3-4@s"}>
              <table
                className={
                  "uk-table uk-table-striped uk-table-hover uk-table-small uk-table-responsive"
                }
              >
                <thead>
                  <tr>
                    <th>Location</th>
                    <th>Pageviews</th>
                  </tr>
                </thead>
                <tbody>
                  {referrers?.map((referrer, key) => {
                    return (
                      <tr key={key}>
                        <td>{referrer?.referrer}</td>
                        <td>{referrer?._count.referrer}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className={"uk-width-1-4@s"}>
              <Chart
                type={"doughnut"}
                data={{
                  labels: referrers?.map((referrer) => referrer?.referrer),
                  datasets: [
                    {
                      data: referrers?.map(
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
          <h2 id={"paths"}>Top Pages</h2>
          <div uk-grid={""}>
            <div className={"uk-width-3-4@s"}>
              <table
                className={
                  "uk-table uk-table-striped uk-table-hover uk-table-small uk-table-responsive"
                }
              >
                <thead>
                  <tr>
                    <th>Page Path</th>
                    <th>Pageviews</th>
                  </tr>
                </thead>
                <tbody>
                  {paths?.map((path, key) => {
                    return (
                      <tr key={key}>
                        <td>{path?.path}</td>
                        <td>{path?._count.path}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className={"uk-width-1-4@s"}>
              <Chart
                type={"doughnut"}
                data={{
                  labels: paths?.map((path) => path?.path),
                  datasets: [
                    {
                      data: paths?.map((path) => path?._count.path),
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
        </div>
      </div>
      {loading && (
        <div
          className={
            "uk-width-1-1 uk-section-default uk-flex uk-flex-center uk-flex-middle uk-position-fixed"
          }
          uk-height-viewport={""}
          style={{ top: 0, left: 0 }}
        >
          <div uk-spinner={""} />
        </div>
      )}
    </>
  );
}
