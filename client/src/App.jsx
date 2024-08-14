import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/homePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/registerPage";
import TransactionPage from "./pages/transactionPage";
import NotFound from "./pages/notFound";
import Header from "./components/header";

function App() {
  const authUser = true;
  return (
    <>
      {authUser && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/transaction/:id" element={<TransactionPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
export default App;
