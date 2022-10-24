import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

import type { ButtonProps, AnchorProps } from "../../types/globalTypes";

interface TextMenuProps {
  englishMenu?: string;
  koreanMenu: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

interface LinkProps extends AnchorProps {
  children: React.ReactNode;
  englishMenu: string;
  path: string;
}

const TextMenu = ({ koreanMenu, englishMenu, onClick }: TextMenuProps) => {
  const router = useRouter();

  return (
    <>
      {onClick ? (
        <EventTextMenu type="button" onClick={onClick}>
          {koreanMenu}
        </EventTextMenu>
      ) : englishMenu ? (
        <Link href={`/${englishMenu}`}>
          <LinkTextMenu englishMenu={englishMenu} path={router.pathname}>
            {koreanMenu}
          </LinkTextMenu>
        </Link>
      ) : (
        <TextDecoration>{koreanMenu}</TextDecoration>
      )}
    </>
  );
};

export default TextMenu;

const EventTextMenu = styled.button<ButtonProps>`
  font-family: ibmRegular;
  font-size: 20px;
  font-weight: bold;
  color: #101820;
`;

const LinkTextMenu = styled.a<LinkProps>`
  font-family: ibmRegular;
  font-size: 20px;
  font-weight: bold;
  color: ${({ englishMenu, path, theme }) =>
    `/${englishMenu}` === path ? "#9000ff" : theme.textMenu.color};
  margin-left: 30px;
`;

const TextDecoration = styled.span`
  font-family: ibmRegular;
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.theme.textMenu.color};
  padding-left: 30px;
`;
