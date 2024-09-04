import Sidebar from './Sidebar/page';
import Footer from './Footer/page';
import Nav from './Nav/page';

export default function AddAdminLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Nav />
        <main className="p-4">{children}</main>
        {/* <Footer /> */}
      </div>
    </div>
  );
}
