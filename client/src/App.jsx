import { useQuery } from "@apollo/client";
import { Navigate, Route, Routes } from "react-router-dom";

import Header from "./components/header";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/notFound";
import RegisterPage from "./pages/registerPage";
import TransactionPage from "./pages/transactionPage";

import { GET_AUTHENTICATED_USER } from "./graphql/queries/user.query";

function App() {
  const { data, loading } = useQuery(GET_AUTHENTICATED_USER);

  if (loading) return null;

  return (
    <>
      {data?.authUser && <Header />}
      <Routes>
        <Route
          path="/"
          element={data?.authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!data?.authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!data?.authUser ? <RegisterPage /> : <Navigate to="/" />}
        />
        <Route
          path="/transaction/:id"
          element={
            data?.authUser ? <TransactionPage /> : <Navigate to="/login" />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
export default App;
