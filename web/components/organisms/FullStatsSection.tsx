import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Chart } from "react-google-charts";
import { ThemeContext } from "styled-components";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Divider } from "@mui/material";

import BasicLabel from "../atoms/basicLabel";
import { SessionDatas } from "../../types/globalTypes";

const colors = [
  "#FEE19F",
  "#D1EDE1",
  "#CCD3D9",
  "#FFC2C3",
  "#D3B7D8",
  "#E4B660",
  "#7BC5AE",
  "#85B8CB",
  "#FE7773",
  "#A13E97",
  "#F2AB39",
  "#028C6A",
  "#1D6A96",
  "#E81E25",
  "#632A7E",
];

interface FullStatsSectionProps {
  chartReload: boolean;
  listId: string;
  loggedInUser?: SessionDatas;
}

const FullStatsSection = ({
  chartReload,
  listId,
  loggedInUser,
}: FullStatsSectionProps) => {
  const [all, setAll] = useState<(string | number)[][]>();
  const [age, setAge] = useState<(string | number)[][]>();
  const [sex, setSex] = useState<(string | number)[][]>();
  const [region, setRegion] = useState<(string | number)[][]>();
  const [answerCount, setAnswerCount] = useState(0);
  const [myAnswer, setMyAnswer] = useState(null);

  const themeContext = useContext(ThemeContext);
  const currentTheme =
    themeContext.global.component.bgColor === "#ffffff"
      ? "lightTheme"
      : "darkTheme";

  useEffect(() => {
    const allArray: (string | number)[][] = [["answer", "count"]];
    const ageArray: (string | number)[][] = [
      [
        "",
        "10세 미만",
        "10대",
        "20대",
        "30대",
        "40대",
        "50대",
        "60대",
        "70대",
        "80대",
        "90대",
        "100세 이상",
      ],
    ];
    const sexArray: (string | number)[][] = [["", "여성", "남성"]];
    const regionArray: (string | number)[][] = [
      [
        "",
        "서울특별시",
        "경기도",
        "광주광역시",
        "대구광역시",
        "대전광역시",
        "부산광역시",
        "인천광역시",
        "울산광역시",
        "세종특별자치시",
        "제주특별자치도",
        "강원도",
        "경상도",
        "전라도",
        "충청도",
      ],
    ];

    async function fetchStats() {
      await axios
        .get(`${process.env.NEXT_PUBLIC_ENV_HOST}/api/board`, {
          params: {
            path: "getBoardStats",
            listId: listId,
            respondentEmail: loggedInUser?.email,
          },
        })
        .then((res) => {
          const { StatsResult, myAnswerResult } = res.data;

          let totalAnswerCount = 0;

          for (var answer of StatsResult) {
            totalAnswerCount += Number(answer.answerSelectionCount);

            allArray.push([
              String(answer.answerContent),
              Number(answer.answerSelectionCount),
            ]);

            ageArray.push([
              String(answer.answerContent),
              Number(answer.respondentAge_0),
              Number(answer.respondentAge_10),
              Number(answer.respondentAge_20),
              Number(answer.respondentAge_30),
              Number(answer.respondentAge_40),
              Number(answer.respondentAge_50),
              Number(answer.respondentAge_60),
              Number(answer.respondentAge_70),
              Number(answer.respondentAge_80),
              Number(answer.respondentAge_90),
              Number(answer.respondentAge_100),
            ]);

            sexArray.push([
              String(answer.answerContent),
              Number(answer.respondentSex_f),
              Number(answer.respondentSex_m),
            ]);

            regionArray.push([
              String(answer.answerContent),
              Number(answer.respondentRegion_seoul),
              Number(answer.respondentRegion_seoul_gyeonggi),
              Number(answer.respondentRegion_seoul_gwangju),
              Number(answer.respondentRegion_seoul_daegu),
              Number(answer.respondentRegion_seoul_daejeon),
              Number(answer.respondentRegion_seoul_busan),
              Number(answer.respondentRegion_seoul_incheon),
              Number(answer.respondentRegion_seoul_ulsan),
              Number(answer.respondentRegion_seoul_sejong),
              Number(answer.respondentRegion_seoul_jeju),
              Number(answer.respondentRegion_seoul_gangwon),
              Number(answer.respondentRegion_seoul_gyeongsang),
              Number(answer.respondentRegion_seoul_jeolla),
              Number(answer.respondentRegion_seoul_chungcheong),
            ]);
          }

          setAll(allArray);
          setAge(ageArray);
          setSex(sexArray);
          setRegion(regionArray);
          setAnswerCount(totalAnswerCount);

          if (myAnswerResult) {
            setMyAnswer(myAnswerResult.answerContent);
          }
        })
        .catch((error) => console.log(error.response));
    }

    fetchStats();
  }, [listId, loggedInUser?.email, chartReload]);

  return (
    <ThemeAccordion
      sx={{
        borderBottom: "1px solid #cccccc",
        boxShadow: "none",
        padding: "0px 20px",
      }}
    >
      <AccordionSummary
        aria-controls="panel1a-content"
        expandIcon={<ExpandMoreIcon />}
        id="panel1a-header"
      >
        <BasicLabel fontSize="22px">통계 보기</BasicLabel>
      </AccordionSummary>
      <AccordionDetails>
        {answerCount > 0 ? (
          <div>
            <MyAnswerParagraph>내 답변</MyAnswerParagraph>
            <AnswerContainer>{myAnswer}</AnswerContainer>
            <br />
            <Divider />
            <br />
            <MyAnswerParagraph>통계자료</MyAnswerParagraph>
            <div>
              <Chart
                chartType="PieChart"
                data={all}
                height="400px"
                options={{
                  title: "전체 답변",
                  colors: colors,
                  is3D: true,
                  sliceVisibilityThreshold: 0,
                  backgroundColor: "transparent",
                  legend: {
                    textStyle: {
                      color:
                        currentTheme === "lightTheme" ? "#151515" : "#F6F6F6",
                    },
                  },
                  titleTextStyle: {
                    color:
                      currentTheme === "lightTheme" ? "#151515" : "#F6F6F6",
                  },
                }}
                width="100%"
              />
              <Chart
                chartType="BarChart"
                data={sex}
                height="400px"
                options={{
                  title: "성별별 답변",
                  backgroundColor: "transparent",
                  chartArea: { width: "50%" },
                  colors: colors,
                  hAxis: {
                    textStyle: {
                      color:
                        currentTheme === "lightTheme" ? "#151515" : "#F6F6F6",
                    },
                  },
                  isStacked: true,
                  legend: {
                    textStyle: {
                      color:
                        currentTheme === "lightTheme" ? "#151515" : "#F6F6F6",
                    },
                  },
                  titleTextStyle: {
                    color:
                      currentTheme === "lightTheme" ? "#151515" : "#F6F6F6",
                  },
                  vAxis: {
                    textStyle: {
                      color:
                        currentTheme === "lightTheme" ? "#151515" : "#F6F6F6",
                    },
                  },
                }}
                width="100%"
              />
              <Chart
                chartType="BarChart"
                data={age}
                height="400px"
                options={{
                  title: "연령별 답변",
                  backgroundColor: "transparent",
                  chartArea: { width: "50%" },
                  colors: colors,
                  isStacked: true,
                  hAxis: {
                    textStyle: {
                      color:
                        currentTheme === "lightTheme" ? "#151515" : "#F6F6F6",
                    },
                  },
                  legend: {
                    textStyle: {
                      color:
                        currentTheme === "lightTheme" ? "#151515" : "#F6F6F6",
                    },
                  },
                  titleTextStyle: {
                    color:
                      currentTheme === "lightTheme" ? "#151515" : "#F6F6F6",
                  },
                  vAxis: {
                    textStyle: {
                      color:
                        currentTheme === "lightTheme" ? "#151515" : "#F6F6F6",
                    },
                  },
                }}
                width="100%"
              />
              <Chart
                chartType="BarChart"
                data={region}
                height="400px"
                options={{
                  title: "지역별 답변",
                  backgroundColor: "transparent",
                  chartArea: { width: "50%" },
                  colors: colors,
                  hAxis: {
                    textStyle: {
                      color:
                        currentTheme === "lightTheme" ? "#151515" : "#F6F6F6",
                    },
                  },
                  isStacked: true,
                  legend: {
                    textStyle: {
                      color:
                        currentTheme === "lightTheme" ? "#151515" : "#F6F6F6",
                    },
                  },
                  titleTextStyle: {
                    color:
                      currentTheme === "lightTheme" ? "#151515" : "#F6F6F6",
                  },

                  vAxis: {
                    textStyle: {
                      color:
                        currentTheme === "lightTheme" ? "#151515" : "#F6F6F6",
                    },
                  },
                }}
                width="100%"
              />
            </div>
          </div>
        ) : (
          <AnswerContainer>아직 답변이 등록되지 않았습니다.</AnswerContainer>
        )}
      </AccordionDetails>
    </ThemeAccordion>
  );
};

export default FullStatsSection;

const AnswerContainer = styled.div`
  background: ${({ theme }) => theme.box.simpleBox.bgColor};
  font-family: "ibmLight";
  font-size: 17px;
  font-weight: bold;
  padding: 30px;
  text-align: center;
`;

const MyAnswerParagraph = styled.p`
  font-family: "ibmLight";
  font-size: 17px;
  font-weight: bold;
`;

const ThemeAccordion = styled(Accordion)`
  background: ${({ theme }) => theme.global.component.bgColor};
  border-bottom: ${({ theme }) => theme.global.component.border};
  color: ${({ theme }) => theme.global.component.color};

  .css-yw020d-MuiAccordionSummary-expandIconWrapper {
    color: ${({ theme }) => theme.global.component.pointColor};
  }
`;
