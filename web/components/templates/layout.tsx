import Menu from "../organisms/menu";

interface LayoutProps {
  children: React.ReactNode;
  isDark: boolean;
  toggleDarkMode: () => void;
}

const Layout = ({ children, isDark, toggleDarkMode }: LayoutProps) => {
  return (
    <>
      <Menu isDark={isDark} toggleDarkMode={toggleDarkMode} />
      <main>{children}</main>
    </>
  );
};

export default Layout;
