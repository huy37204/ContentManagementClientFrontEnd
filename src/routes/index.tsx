// src/routes/index.tsx
import { Routes, Route } from "react-router-dom";
import LoginPage from "../views/pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "../views/pages/HomePage";
import ContentDetailPage from "../views/pages/ContentDetailPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute allowedRoles={["client"]}>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/contents/:id"
        element={
          <ProtectedRoute allowedRoles={["client"]}>
            <ContentDetailPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/unauthorized"
        element={<div>Không có quyền truy cập</div>}
      />
    </Routes>
  );
}
