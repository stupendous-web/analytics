import Head from "next/head";

export default function Home() {
  return (
    <>
      <div
        className={
          "uk-section uk-section-primary uk-flex uk-flex-center uk-flex-middle"
        }
        uk-height-viewport={""}
      >
        <div className={"uk-width-1-1"}>
          <div className={"uk-container uk-container-xsmall"}>
            <h1>Analytics</h1>
            <p>
              This area is for clients of{" "}
              <a href={"https://stupendousweb.com"}>Stupendous Web</a> only. If
              you have questions, please ask!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
