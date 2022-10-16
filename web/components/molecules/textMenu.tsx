import Link from "next/link";
import clsx from "clsx";
import { useRouter } from "next/router";

import menuClass from "./style/menuDetail.module.css";

interface TextMenuProps {
  koreanMenu: string;
  englishMenu?: string;
}

const TextMenu = (props: TextMenuProps) => {
  const { koreanMenu, englishMenu } = props;

  const router = useRouter();

  return (
    <>
      {englishMenu ? (
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
