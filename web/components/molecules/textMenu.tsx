import Link from "next/link";
import clsx from "clsx";
import { useRouter } from "next/router";

import menuClass from "./style/menuDetail.module.css";

interface TextMenuProps {
  koreanMenu: string;
  englishMenu?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const TextMenu = ({ koreanMenu, englishMenu, onClick }: TextMenuProps) => {
  const router = useRouter();

  return (
    <>
      {onClick ? (
        <button
          type="button"
          className={`PL30 ${menuClass.menu_font}`}
          onClick={onClick}
        >
          {koreanMenu}
        </button>
      ) : englishMenu ? (
        <Link href={`/${englishMenu}`}>
          <a
            className={clsx(
              `pointer no-underline ML30 ${menuClass.menu_font}`,
              { [menuClass.isActive]: `/${englishMenu}` === router.pathname }
            )}
          >
            {koreanMenu}
          </a>
        </Link>
      ) : (
        <span className={`PL30 ${menuClass.menu_font}`}>{koreanMenu}</span>
      )}
    </>
  );
};

export default TextMenu;
