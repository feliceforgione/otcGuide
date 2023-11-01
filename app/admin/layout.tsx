import React from "react";
import AdminNavBar from "./NavBar";
import AuthProvider from "../auth/Provider";
import { Toaster } from "react-hot-toast";
import { Metadata } from "next";

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminNavBar />
      <div className="mt-5">{children}</div>
      <Toaster />
    </AuthProvider>
  );
}

export const metadata: Metadata = {
  title: "otcGuide - Admin",
  description: "Administration area",
};

export default AdminLayout;
