import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    basicButton: {
      bgColor: string;
    };
    basicInput: {
      bgColor: string;
      border: string;
      color: string;
    };
    basicLabel: {
      color: string;
    };
    basicSelect: {
      bgColor: string;
      color: string;
    };
    basicText: {
      color: string;
    };
    bgColor: string;
    box: {
      bgColor: string;
      color: string;
    };
    color: string;
    findUser: {
      bgColor: string;
    };
    menu: {
      bgColor: string;
      color: string;
    };
    menuIcon: {
      color: string;
    };
    textMenu: {
      color: string;
    };
  }
}
