import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";

import Time from "../components/Times";
import Referrers from "../components/Referrers";

export default function Site() {
  const router = useRouter();
  const { site } = router.query;

  const sections = ["Popular Sources", "Popular Pages", "Popular Screens"];

  const [days, setDays] = useState(7);
  const [data, setData] = useState();
  const [sessions, setSessions] = useState();
  const [pageviews, setPageviews] = useState();
  const [pageviewsOverTime, setPageviewsOverTime] = useState();
  const [sessionsOverTime, setSessionsOverTime] = useState();
  const [portrait, setPortrait] = useState();
  const [landscape, setLandscape] = useState();
  const [referrerSessions, setReferrerSessions] = useState();
  const [referrerPageviews, setReferrerPageviews] = useState();
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

  const get = () => {
    const api =
      process.env.NODE_ENV === "development"
        ? "http://localhost:8000/"
        : "https://analytics-api.stupendousweb.com/";
    const url = days
      ? api + "pageviews/" + site + "/" + days
      : api + "pageviews/" + site;
    axios.get(url).then((response) => {
      setData(response.data);
      setSessions(response.data.sessions);
      setPageviews(response.data.pageviews);
      setPageviewsOverTime(response.data.pageviewsOverTime);
      setSessionsOverTime(response.data.sessionsOverTime);
    });
    setLoading(false);
  };

  useEffect(() => {
    /*
    if (pageviews) {
      // Screen Sizes
      setPortrait(
        pageviews.filter((pageview) => pageview.height > pageview.width).length
      );
      setLandscape(
        pageviews.filter((pageview) => pageview.height < pageview.width).length
      );
    }

     */
  }, [pageviews]);

  useEffect(() => {
    if (!router.isReady) return;
    get();
  }, [router.isReady]);

  useEffect(() => {
    if (days !== 7) {
      setLoading(true);
      get();
    }
  }, [days]);

  return (
    <>
      <div className={"uk-section"} data-uk-height-viewport={""}>
        <div className={"uk-container uk-container-expand"}>
          <div
            className={
              "uk-section-default uk-padding-small uk-padding-remove-horizontal"
            }
            data-uk-sticky={""}
          >
            {" "}
            <div className={"uk-flex-middle"} data-uk-grid={""}>
              <div className={"uk-width-expand"}>
                {site && <h1>@{site}</h1>}
              </div>
              <div>
                <select
                  value={days}
                  className={"uk-select"}
                  onChange={(event) => setDays(event.target.value)}
                >
                  <option value={1}>24 Hours</option>
                  <option value={7}>7 Days</option>
                  <option value={30}>30 Days</option>
                  <option value={90}>90 Days</option>
                  <option value={365}>Year</option>
                </select>
              </div>
            </div>
          </div>
          <div
            className={"uk-child-width-1-2 uk-text-center uk-grid-match"}
            data-uk-grid={""}
          >
            <div>
              <div className={"uk-card uk-card-secondary uk-card-body"}>
                <h1 className={"uk-heading-large uk-margin-remove"}>
                  {data?.sessionsCount}
                </h1>
                <p>Sessions</p>
              </div>
            </div>
            <div>
              <div className={"uk-card uk-card-secondary uk-card-body"}>
                <h1 className={"uk-heading-large uk-margin-remove"}>
                  {data?.pageviewsCount}
                </h1>
                <p>Pageviews</p>
              </div>
            </div>
          </div>
          <div
            className={
              "uk-section-default uk-padding-small uk-padding-remove-horizontal"
            }
            data-uk-sticky={"offset: 80"}
          >
            <ul
              className={"uk-subnav uk-margin-remove-bottom"}
              data-uk-scrollspy-nav={"closest: li; scroll: true; offset: 156"}
            >
              {sections.map((section, key) => {
                return (
                  <li key={key}>
                    <a href={"#" + section}>{section}</a>
                  </li>
                );
              })}
            </ul>
          </div>
          <Time
            sessionsOverTime={data?.sessionsOverTime}
            pageviewsOverTime={data?.pageviewsOverTime}
          />
          {"referrer cmoponent"}
          <h2 id={"Popular Pages"}>Popular Pages</h2>
          <div data-uk-grid={""}>
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
          <h2 id={"Popular Screens"}>Screens</h2>
          <div data-uk-grid={""}>
            <div className={"uk-width-3-4@s"}>
              <table
                className={
                  "uk-table uk-table-striped uk-table-hover uk-table-small uk-table-responsive"
                }
              >
                <thead>
                  <tr>
                    <th>Width</th>
                    <th>Pageviews</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Portrait</td>
                    <td>{portrait}</td>
                  </tr>
                  <tr>
                    <td>Landscape</td>
                    <td>{landscape}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={"uk-width-1-4@s"}>
              <Chart
                type={"doughnut"}
                data={{
                  labels: ["Portrait", "Landscape"],
                  datasets: [
                    {
                      data: [],
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
          data-uk-height-viewport={""}
          style={{ top: 0, left: 0 }}
        >
          Loading...
        </div>
      )}
    </>
  );
}
