import React, { Suspense, useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { ErrorBoundary } from "react-error-boundary";
import NoteLoader from "./NoteLoader";
import { ThemeContext } from "../context/DarkAndLightMode";

const Layout = () => {
  const { isDark, setDark } = useContext(ThemeContext);
  return (
    <div data-theme={isDark ? "dark" : "light"} className="layout ">
      {/* sidebar */}
      <div className="sidebar">
        <Sidebar isDark={isDark} setDark={setDark} />
      </div>
      {/* pages */}
      <div className="outlet">
        <ErrorBoundary
          fallback={
            <div className="w-screen h-screen flex items-center justify-center">
              <p className="text-red-500 text-2xl font-light">
                An error has been occured
              </p>
            </div>
          }
        >
          <Suspense
            fallback={
              <div className="flex justify-center items-center h-screen">
                <NoteLoader />
              </div>
            }
          >
            {" "}
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default Layout;
