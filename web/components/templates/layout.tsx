import { useContext } from "react";
import Footer from "../organisms/footer";
import Loading from "../organisms/loading";
import Menu from "../organisms/menu";
import LoadingContext from "../../context/loading";

interface LayoutProps {
  children: React.ReactNode;
  isDark: boolean;
  toggleDarkMode: () => void;
}

const Layout = ({ children, isDark, toggleDarkMode }: LayoutProps) => {
  const { loading }: any = useContext(LoadingContext);

  return (
    <div id="wrapper">
      <header>
        <Menu isDark={isDark} toggleDarkMode={toggleDarkMode} />
      </header>
      {loading ? <Loading /> : null}
      <main>{children}</main>
      <br />
      <Footer />
    </div>
  );
};

export default Layout;
