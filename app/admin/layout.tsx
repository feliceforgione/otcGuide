import React from "react";
import AdminNavBar from "./NavBar";
import AuthProvider from "../auth/Provider";
import { Toaster } from "react-hot-toast";

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminNavBar />
      <div className="mt-5">{children}</div>
      <Toaster />
    </AuthProvider>
  );
}

export default AdminLayout;
