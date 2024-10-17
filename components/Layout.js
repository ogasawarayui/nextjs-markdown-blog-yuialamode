import Header from './Header';
import Footer from './Footer';
import { GoogleAnalytics } from '@next/third-parties/google'

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 max-w-4xl w-full mx-auto">{children}</main>
      <Footer />
      <GoogleAnalytics gaId="G-JZ1WSV6MWZ" />
    </div>
  );
}

export default Layout;