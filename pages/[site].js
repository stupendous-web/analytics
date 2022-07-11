import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Site() {
  const router = useRouter();
  const { site } = router.query;

  const [referrers, setReferrers] = useState();
  useEffect(() => {
    if (!router.isReady) return;
    axios.get("/api/pageviews/" + site).then((response) => {
      setReferrers(response.data.referrers);
    });
  }, [router.isReady]);

  return (
    <>
      {" "}
      <div className={"uk-section"} uk-height-viewport={""}>
        <div className={"uk-container uk-container-expand"}>
          {site && <h1>@{site}</h1>}
          <h2>Top Referrers</h2>
          <table className="uk-table uk-table-striped uk-table-small">
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
                    <td>{referrer.path}</td>
                    <td>1</td>
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
