import { useRouter } from "next/router";
import axios from "axios";
import { useState } from "react";

export default function Site() {
  const router = useRouter();
  const { site } = router.query;

  const [pageviews, setPageviews] = useState();
  axios.get("/api/pageviews/" + site).then((response) => {
    console.log(response.data);
  });

  return <h1>{site}</h1>;
}
