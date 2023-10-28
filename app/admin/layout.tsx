import React from "react";
import AdminNavBar from "./NavBar";
import AuthProvider from "../auth/Provider";

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminNavBar />
      <div className="mt-5">{children}</div>
    </AuthProvider>
  );
}

export default AdminLayout;
