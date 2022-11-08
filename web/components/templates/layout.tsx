import Footer from "../organisms/footer";
import Menu from "../organisms/menu";

interface LayoutProps {
  children: React.ReactNode;
  isDark: boolean;
  toggleDarkMode: () => void;
}

const Layout = ({ children, isDark, toggleDarkMode }: LayoutProps) => {
  return (
    <div id="wrapper">
      <header>
        <Menu isDark={isDark} toggleDarkMode={toggleDarkMode} />
      </header>
      <main>{children}</main>
      <br />
      <Footer />
    </div>
  );
};

export default Layout;
