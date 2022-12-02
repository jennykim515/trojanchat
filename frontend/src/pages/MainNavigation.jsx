import { useState, useContext, useEffect } from "react";
import { AppContext, useApp } from "../App";
import Thread from "../components/Thread";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import School from "../components/School";
import { __DEV__ } from "../utils/network";
import Navbar from "../components/navbar/navbar";
import Loading from "../components/Loading";

const DEFAULT_FEED = [
  {
    boardName: "General",
    threadCount: 34552,
  },
  {
    boardName: "Dornsife",
    threadCount: 52,
  },
  {
    boardName: "Viterbi",
    threadCount: 305,
  },
];

/*
    Displays the main navigation board (with different schools) 
*/
export default function MainNavigation() {
  const { apiGet } = useApp();

  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSchoolData = async () => {
    const { status, ...data } = await apiGet(
      "/feed/home?schools=all,viterbi,general,dornsife,annenberg,roski,marshall"
    );
    if (status === 200) {
      setSchools(
        Object.keys(data).map((school) => ({
          boardName: school,
          threadCount: data[school],
        }))
      );
    } else {
      if (__DEV__) setSchools(DEFAULT_FEED);
    }

    setLoading(false);
  };

  useEffect(() => {
    getSchoolData();
  }, []);

  // const { user } = useContext(AppContext)
  // console.log(user);
  const [navType, setNavType] = useState(0);
  return (
    <>
      <Navbar navType={navType} setNavType={setNavType} />
      <Container>
        <h1 className="boardTitle">USC</h1>
        {!loading ? (
          schools.map((schoolData, i) => {
            return (
              <div key={schoolData.boardName}>
                <School key={i} schoolInfo={schoolData} />
              </div>
            );
          })
        ) : (
          <Loading />
        )}
      </Container>
    </>
  );
}
