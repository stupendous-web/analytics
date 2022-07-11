import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Site() {
  const router = useRouter();
  const { site } = router.query;

  const [pageviewCount, setPageviewCount] = useState();
  const [sessionCount, setSessionCount] = useState();
  const [referrers, setReferrers] = useState();
  const [paths, setPaths] = useState();
  useEffect(() => {
    if (!router.isReady) return;
    axios.get("/api/pageviews/" + site).then((response) => {
      setPageviewCount(response.data.pageviewCount[0]);
      setSessionCount(response.data.sessionCount[0]);
      setReferrers(response.data.referrers);
      setPaths(response.data.paths);
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
              <div className={"uk-card uk-card-default uk-card-body"}>
                <div className={"uk-text-small"}>All Time</div>
                <h1 className={"uk-heading-large uk-margin-remove"}>
                  {sessionCount?._count?.anonymousId}
                </h1>
                <div className={"uk-text-small"}>Sessions</div>
              </div>
            </div>
            <div>
              <div className={"uk-card uk-card-default uk-card-body"}>
                <div className={"uk-text-small"}>All Time</div>
                <h1 className={"uk-heading-large uk-margin-remove"}>
                  {pageviewCount?._count?.site}
                </h1>
                <div className={"uk-text-small"}>Pageviews</div>
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
          <table
            className={
              "uk-table uk-table-striped uk-table-hover uk-table-small"
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
          <h2 id={"paths"}>Top Pages</h2>
          <table className={"uk-table uk-table-striped uk-table-small"}>
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
      </div>
    </>
  );
}
