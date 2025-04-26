import { Outlet, Link } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

const AdminLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow container mx-auto px-4">
        <nav className="mb-4">
          <ul className="flex space-x-4">
            <li>
              <Link to="/admin/datasets">Admin Datasets</Link>
            </li>
            <li>
              <Link to="/admin/datasets-list">Admin Datasets List</Link>
            </li>
            <li><Link to="/admin/upload">Upload Dataset</Link></li>
            <li><Link to="/admin/edit-dataset">Edit Dataset</Link></li>
            <li><Link to="/admin/delete-dataset">Delete Dataset</Link></li>
          </ul>
        </nav>
        <main><Outlet /></main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;