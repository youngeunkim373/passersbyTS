import { DefaultTheme } from "styled-components";

export const lightTheme: DefaultTheme = {
  basicSelect: {
    hoverBgColor: "#FFEBFF",
  },

  box: {
    smallBox: {
      bgColor: "#FFEBFF",
      color: "#6f30c9",
      shadow: "5px 15px 20px 5px #eaeaea",
    },
    findUser: {
      divider: "#FCFCFC",
    },
    simpleBox: {
      bgColor: "#F0F0F0",
    },
  },

  menu: {
    bgColor: "#ffffff",
  },

  menuIcon: {
    color: "#5D5D5D",
  },

  table: {
    border: "1px solid #eaeaea",
  },

  pagination: {
    page: "#5D5D5D",
    arrow: "#5D5D5D",
    circle: "rgba(0, 0, 0, 0.08)",
  },

  global: {
    component: {
      bgColor: "#ffffff",
      border: "1px solid #cccccc",
      color: "#151515",
      pointBgColor: "#fff7ff",
      pointColor: "#9000ff",
    },
    layout: {
      bgColor: "#F5F5F5",
      color: "#151515",
    },
  },
};

export const darkTheme: DefaultTheme = {
  basicSelect: {
    hoverBgColor: "#363636",
  },

  box: {
    smallBox: {
      bgColor: "#474747",
      color: "#F6F6F6",
      shadow: "5px 15px 20px 5px #000000",
    },
    findUser: {
      divider: "#353535",
    },
    simpleBox: {
      bgColor: "#353535",
    },
  },

  menu: {
    bgColor: "#353535",
  },

  menuIcon: {
    color: "#fffaff",
  },

  table: {
    border: "1px solid #353535",
  },

  pagination: {
    page: "#ffffff",
    arrow: "#ffffff",
    circle: "rgba(255, 255, 255, 0.1)",
  },

  global: {
    component: {
      bgColor: "#151515",
      border: "1px solid #5D5D5D",
      color: "#F6F6F6",
      pointBgColor: "#1C1C1C",
      pointColor: "#ffffff",
    },
    layout: {
      bgColor: "#242424",
      color: "#F6F6F6",
    },
  },
};
