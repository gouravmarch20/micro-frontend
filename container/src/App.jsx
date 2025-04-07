import React, { lazy, Suspense } from "react";
import { Routes, Route, Link } from "react-router-dom";
import StepOne from "./components/StepOne.jsx";

// 👇 lazy load remote
const CoursePage = lazy(() => import("CoursePage/App"));
const HomePage = lazy(() => import("HomePage/App"));

const App = () => {
  return (
    <>
      <nav style={{ marginBottom: "16px" }}>
        <Link to="/" style={{ marginRight: "10px" }}>
          container
        </Link>
        <Link to="/coursePage" style={{ marginRight: "10px" }}>
          Course
        </Link>
        <Link to="/homePage">homepage</Link>
      </nav>

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route index element={<StepOne />} />
          <Route path="coursePage" element={<CoursePage />} />
          <Route path="homePage" element={<HomePage />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
