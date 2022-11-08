import Menu from "../organisms/menu";

interface LayoutProps {
  children: React.ReactNode;
  isDark: boolean;
  toggleDarkMode: () => void;
}

const Layout = ({ children, isDark, toggleDarkMode }: LayoutProps) => {
  return (
    <>
      <header>
        <Menu isDark={isDark} toggleDarkMode={toggleDarkMode} />
      </header>
      <main>{children}</main>
    </>
  );
};

export default Layout;
