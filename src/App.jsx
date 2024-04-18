import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import "./App.jsx";
function App() {
  return (
    <>
      <main className="mx-auto">
        <Header />
        <Outlet />
      </main>
    </>
  );
}

export default App;
