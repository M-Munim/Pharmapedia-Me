import Sidebar from './Sidebar/page';
import Navbar from './Nav/page';
import Footer from './Footer/page';

export default function LogoutLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-4">{children}</main>
        {/* <Footer /> */}
      </div>
    </div>
  );
}
