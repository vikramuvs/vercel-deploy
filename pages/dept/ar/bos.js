import BosMainContent from "../../../components/BosMainContent";
import Head from "next/head";
import DeptBanner from "../../../components/DeptBanner";
import Header from "../../../components/Header";
import { useRouter } from "next/router";
import DeptStats from "../../../components/DeptStats";
import Footer from "../../../components/Footer";

function bos({ boe, bos, sy, tt, sm, latestNews, latestEvents, deptStats }) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Ramaiah Institute of Technology, Bengaluru - 54</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="font-body">
        <Header />
        <DeptBanner
          latestNews={latestNews}
          deptName={"SCHOOL OF ARCHITECTURE"}
          latestEvents={latestEvents}
          bkg="bg-arch bg-[#C0C0C0] bg-blend-overlay"
        />
        <DeptStats stats={deptStats} />
        <BosMainContent
          data={bos}
          boe={boe}
          syllabus={sy}
          timetable={tt}
          studymaterial={sm}
          path={router.pathname}
        />
        <Footer />
      </div>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    "http://ec2-52-39-2-31.us-west-2.compute.amazonaws.com:8080/api/v1/bos/19"
  );
  const json = await res.json();

  const resboe = await fetch(
    "http://ec2-52-39-2-31.us-west-2.compute.amazonaws.com:8080/api/v1/boe/19"
  );
  const jsonboe = await resboe.json();

  const syl = await fetch(
    "http://ec2-52-39-2-31.us-west-2.compute.amazonaws.com:8080/api/v1/syllabus/1"
  );
  const syllJson = await syl.json();

  const t_t = await fetch(
    "http://ec2-52-39-2-31.us-west-2.compute.amazonaws.com:8080/api/v1/timetable/1"
  );
  const t_tJson = await t_t.json();

  const s_m = await fetch(
    "http://ec2-52-39-2-31.us-west-2.compute.amazonaws.com:8080/api/v1/studymat/1"
  );
  const s_mJson = await s_m.json();

  const l_e = await fetch(
    "http://ec2-52-39-2-31.us-west-2.compute.amazonaws.com:8080/api/v1/latest_events/19"
  );
  const l_eJson = await l_e.json();

  const l_n = await fetch(
    "http://ec2-52-39-2-31.us-west-2.compute.amazonaws.com:8080/api/v1/latest_news/19"
  );
  const l_nJson = await l_n.json();

  const dep_stat = await fetch(
    "http://ec2-52-39-2-31.us-west-2.compute.amazonaws.com:8080/api/v1/dept_stats/19"
  );
  const d_sJson = await dep_stat.json();
  //const json = await res.json();
  //console.log(res);

  return {
    props: {
      bos: json,
      boe: jsonboe,
      sy: syllJson,
      sm: s_mJson,
      tt: t_tJson,
      latestNews: l_nJson,
      latestEvents: l_eJson,
      deptStats: d_sJson,
    }, // will be passed to the page component as props
  };
}

export default bos;
