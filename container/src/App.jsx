import React, { lazy, Suspense } from "react";
import { Routes, Route, Link } from "react-router-dom";
import StepOne from "./components/StepOne.jsx";

// 👇 lazy load remote
const HomePage = lazy(() => import("app1/App"));

const App = () => {
  return (
    <>
      <nav style={{ marginBottom: "16px" }}>
        <Link to="/" style={{ marginRight: "10px" }}>
          Step 1
        </Link>
        <Link to="/step-2" style={{ marginRight: "10px" }}>
          Step 2
        </Link>
        <Link to="/step-3">Step 3</Link>
      </nav>

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route index element={<StepOne />} />
          <Route path="step-2" element={<HomePage />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
