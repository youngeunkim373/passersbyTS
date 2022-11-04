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
  color: ${({ theme }) => theme.global.component.color};
  font-family: ibmRegular;
  font-size: 20px;
  font-weight: bold;
`;

const LinkTextMenu = styled.a<LinkProps>`
  color: ${({ englishMenu, path, theme }) =>
    `/${englishMenu}` === path ? "#9000ff" : theme.global.component.color};
  font-family: ibmRegular;
  font-size: 20px;
  font-weight: bold;
  margin-left: 30px;
`;

const TextDecoration = styled.span`
  color: ${({ theme }) => theme.global.component.color};
  font-family: ibmRegular;
  font-size: 20px;
  font-weight: bold;
  padding-left: 30px;
`;
