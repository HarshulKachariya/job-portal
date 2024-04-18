import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import "./App.jsx";
import Footer from "./components/Footer.jsx";
function App() {
  return (
    <>
      <main className="mx-auto">
        <Header />
        <Outlet />
        <Footer />
      </main>
    </>
  );
}

export default App;
