import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Site() {
  const router = useRouter();
  const { site } = router.query;

  const [pageviews, setPageviews] = useState();
  useEffect(() => {
    axios.get("/api/pageviews/" + site).then((response) => {
      console.log(response.data);
    });
  });

  return <h1>{site}</h1>;
}
