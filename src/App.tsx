import { Routes, Route, Navigate } from "react-router-dom";
import TrackerPage from "./pages/TrackerPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<TrackerPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}