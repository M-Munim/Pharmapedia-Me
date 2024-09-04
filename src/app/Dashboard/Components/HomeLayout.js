// Dashboard/Components/HomeLayout.js
import Sidebar from './Sidebar/page';
import Navbar from './Nav/page';
import Footer from './Footer/page';

export default function HomeLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-4 bg-gray-50">{children}</main>
        {/* <Footer /> */}
      </div>
    </div>
  );
}
