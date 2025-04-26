import { Outlet, Link } from 'react-router-dom';
import AdminNav from './AdminNav';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <AdminNav />
        <nav>
            <ul>
                <li><Link to="/admin/datasets">Admin Datasets</Link></li>
                <li><Link to="/admin/datasets-list">Admin Datasets List</Link></li>
                <li><Link to="/admin/upload">Upload Dataset</Link></li>
                <li><Link to="/admin/edit-dataset">Edit Dataset</Link></li>
                <li><Link to="/admin/delete-dataset">Delete Dataset</Link></li>
            </ul>
        </nav>
      <main>
        
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;