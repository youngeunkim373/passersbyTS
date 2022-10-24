import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
/*-------------------------------------------*/
/*                    TAG                    */
/*-------------------------------------------*/
    html,
    body {
      background: ${(props) => props.theme.bgColor};
      color: ${(props) => props.theme.color};
      font-family: "ibmLight";
      font-size: 17px;
      font-weight: bold;
      height: 100%;
      margin: 0;
      padding: 0;
      position: relative;
      width: 100vw;
    }

    footer {
      bottom: 0;
      color: #cccccc;
      font-family: "ibmRegular";
      font-size: 20px;
      font-weight: normal;
      height: 150px;
      left: 0;
      min-width: 700px;
      position: absolute;
      text-align: center;
      white-space: nowrap;
      width: 100%;
    }
    
    button {
      background: transparent;
      border: 0;
      cursor: pointer;
    }

    a {
      cursor: pointer;
      text-decoration: none;
    }    
    
/*-------------------------------------------*/
/*                    ID                     */
/*-------------------------------------------*/
  #root {
    height: 100%;
  }
  
  #wrapper {
    position: relative;
    min-height: calc(100% - 150px);
    padding-bottom: 150px; /* footer 높이 */
  }
  
  #content {
    min-height: 100%;
    overflow: hidden;
  }
  
  #page {
    min-width: "700px";
    height: 100%;
    margin: 0 auto;
    padding-top: 100px;
    padding-bottom: 150px;
  }

  #narrow-page {
    width: 300px;
    height: 100%;
    margin: 0 auto;
    padding-top: 100px;
    padding-bottom: 150px;
  }  

//-------------------------------------------//
//                  CLASS                    //
//-------------------------------------------// 
/*---------- 여백 ----------*/
.P10 {
  padding: 10px;
}
.P30 {
  padding: 30px;
}
.P50 {
  padding: 50px;
}
.P80 {
  padding: 80px;
}
.P100 {
  padding: 100px;
}
.P150 {
  padding: 150px;
}
.P200 {
  padding: 200px;
}

.PT10 {
  padding-top: 10px;
}
.PT30 {
  padding-top: 30px;
}
.PT50 {
  padding-top: 50px;
}
.PT80 {
  padding-top: 80px;
}
.PT100 {
  padding-top: 100px;
}

.PB10 {
  padding-bottom: 10px;
}
.PB30 {
  padding-bottom: 30px;
}
.PB50 {
  padding-bottom: 50px;
}
.PB80 {
  padding-bottom: 80px;
}
.PB100 {
  padding-bottom: 100px;
}

.PL10 {
  padding-left: 10px;
}
.PL30 {
  padding-left: 30px;
}
.PL50 {
  padding-left: 50px;
}
.PL80 {
  padding-left: 80px;
}
.PL100 {
  padding-left: 100px;
}

.PR10 {
  padding-right: 10px;
}
.PR30 {
  padding-right: 30px;
}
.PR50 {
  padding-right: 50px;
}
.PR80 {
  padding-right: 80px;
}
.PR100 {
  padding-right: 100px;
}

.M10 {
  margin: 10px;
}
.M30 {
  margin: 30px;
}
.M50 {
  margin: 50px;
}
.M80 {
  margin: 80px;
}
.M100 {
  margin: 100px;
}

.MT10 {
  margin-top: 10px;
}
.MT30 {
  margin-top: 30px;
}
.MT50 {
  margin-top: 50px;
}
.MT80 {
  margin-top: 80px;
}
.MT100 {
  margin-top: 100px;
}

.MB50 {
  margin-bottom: 50px;
}
.MB100 {
  margin-bottom: 100px;
}

.ML30 {
  margin-left: 30px;
}

.MR10 {
  margin-right: 10px;
}

.line-6 {
  line-height: 0.6;
}

/*---------- 정렬 ----------*/
.auto-center {
  margin: 0 auto;
}

.align-center {
  text-align: center;
}

.align-right {
  text-align: right;
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.vertical-center {
  display: flex;
  align-items: center;
}

.left {
  float: left;
}

.right {
  float: right;
}

/*---------- 폰트 ----------*/
.base-font {
  font-family: "ibmLight";
  font-size: 17px;
  font-weight: bold;
}

.norm-font {
  font-family: "ibmLight";
  font-size: 17px;
  font-weight: normal;
}

.small-font {
  font-family: "ibmLight";
  font-size: 12px;
  font-weight: normal;
}

.title-font {
  font-family: "ibmRegular";
  font-size: 25px;
  font-weight: bold;
}

.logo-font {
  font-family: "sanjuGotgam";
  font-size: 25px;
  font-weight: bold;
  color: #9000ff;
}

.nowrap {
  white-space: nowrap;
}

/*---------- 넓이 ----------*/
.full-width {
  width: 100vw;
  min-width: 500px;
}

.base-width {
  width: 70vw;
  min-width: 700px;
}

.narrow-width {
  width: 300px;
}

.width100 {
  width: 100%;
}

/*---------- 배경색 ----------*/
.BG-white {
  background-color: white;
}

.BG-grey {
  background-color: #eaeaea;
}

.BG-purple {
  background-color: #fffaff;
}

/* Light */
/* Dark */

/*---------- Theme 컬러 ----------*/
.purple {
  color: #9000ff;
}

.black {
  color: #101820;
}

.white {
  color: white;
}

.red {
  color: #ff0046;
}

.blue {
  color: #5f00ff;
}

/*---------- border ----------*/
.base-radius {
  border-radius: 5px;
}

.no-underline {
  text-decoration: none;
}

/*---------- 이미지 ----------*/
.bg-img {
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

.carousel-img {
  height: 380px;
  min-width: 1200px;
  background-repeat: no-repeat;
  background-position: 85%;
  background-size: contain;
}

.profile-img {
  position: relative;
  z-index: 1;
  background-color: #ffe8f5;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

/*---------- 포인터 ----------*/
.pointer {
  cursor: pointer;
}

/*---------- 버튼 ----------*/
.default-btn {
  border: none;
  background-color: transparent;
}

/*---------- 조회 ----------*/
.none {
  display: none;
}

/*---------- 텍스트 ----------*/
.text-break {
  word-wrap: break-word;
  white-space: normal;
}

`;
