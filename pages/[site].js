import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import "chart.js/auto";

import Time from "../components/Times";
import Referrers from "../components/Referrers";

export default function Site() {
  const router = useRouter();
  const { site } = router.query;

  const sections = ["Popular Sources", "Popular Pages", "Popular Screens"];

  const [days, setDays] = useState(7);
  const [data, setData] = useState();

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
  }, [data]);

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
            sessions={data?.sessionsOverTime}
            pageviews={data?.pageviewsOverTime}
          />
          <Referrers referrers={data?.referrers} chartColors={chartColors} />
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
