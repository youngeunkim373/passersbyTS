import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    basicSelect: {
      hoverBgColor: string;
    };

    box: {
      smallBox: {
        bgColor: string;
        color: string;
        shadow: string;
      };
      findUser: {
        divider: string;
      };
      simpleBox: {
        bgColor: string;
      };
    };

    menu: {
      bgColor: string;
    };

    menuIcon: {
      color: string;
    };

    table: {
      border: string;
    };

    pagination: {
      page: string;
      arrow: string;
      circle: string;
    };

    global: {
      component: {
        bgColor: string;
        color: string;
        border: string;
        pointBgColor: string;
        pointColor: string;
      };
      layout: {
        bgColor: string;
        color: string;
      };
    };
  }
}
