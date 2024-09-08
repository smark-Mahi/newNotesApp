import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./component/Layout";
import { ThemeProvider } from "./context/DarkAndLightMode";
import ProtectedRoutes from "./component/ProtectedRoutes";
import { setUpInterceptors } from "./component/Interceptor";
import { lazy, Suspense, useEffect } from "react";
import NoteLoader from "./component/NoteLoader";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./component/graphql/queries";

const HomePage = lazy(() => import("./pages/Homepage"));
const Login = lazy(() => import("./pages/Auth"));
const LandingPage = lazy(() => import("./component/LandindPage/Landingpage"));
function App() {
  useEffect(() => {
    setUpInterceptors();
  }, []);
  return (
    <BrowserRouter>
      <ApolloProvider client={apolloClient}>
        <Suspense
          fallback={
            <div className="w-screen h-screen flex justify-center items-center">
              <NoteLoader />
            </div>
          }
        >
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route
                path="/"
                element={
                  <ThemeProvider>
                    <Layout />
                  </ThemeProvider>
                }
              >
                <Route index element={<HomePage />} />
              </Route>
            </Route>
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/auth" element={<Login />} />
          </Routes>
        </Suspense>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
