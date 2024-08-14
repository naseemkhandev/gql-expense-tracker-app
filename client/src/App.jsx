import { useQuery } from "@apollo/client";
import { Route, Routes } from "react-router-dom";

import Header from "./components/header";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/notFound";
import RegisterPage from "./pages/registerPage";
import TransactionPage from "./pages/transactionPage";
import Loader from "./components/ui/loader";

import { GET_AUTHENTICATED_USER } from "./graphql/queries/user.query";

function App() {
  const authUser = true;
  const { loading, error, data } = useQuery(GET_AUTHENTICATED_USER);

  if (loading) return <Loader />;
  if (error) return `Error! ${error.message}`;

  console.log("Loading:", loading);
  console.log("Error:", error);
  console.log("Data:", data);

  return (
    <>
      {authUser && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/transaction/:id" element={<TransactionPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
export default App;
