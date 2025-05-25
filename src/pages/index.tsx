import AppealTable from "@/components/AppealTable";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import Head from "next/head";
import { useState } from "react";
export default function Home() {
   const [isExpanded, setIsExpanded] = useState(true);
  return (
    <>
      <Head>
        <title>Appeals Dashboard</title>
        <meta name="description" content="Appeals Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="p-3">
        <Header />
        <div className="row py-3">
          <div className={`${isExpanded?'col-xl-2 col-md-3':'col-xl-1 col-md-2'}`}>
            <Layout setIsExpanded={setIsExpanded} isExpanded={isExpanded}/>
          </div>
          <div className={`${isExpanded?'col-xl-10 col-md-9':'col-xl-11  col-md-10'}`}>
            <AppealTable />
          </div>
        </div>
      </div>
    </>
  );
}
