// src/routes/index.tsx
import { Routes, Route } from "react-router-dom";
import LoginPage from "../views/pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {/* <Route
        path="/*"
        element={
          <ProtectedRoute allowedRoles={["client"]}>
            <ClientPage />
          </ProtectedRoute>
        }
      /> */}

      <Route
        path="/unauthorized"
        element={<div>Không có quyền truy cập</div>}
      />
    </Routes>
  );
}
