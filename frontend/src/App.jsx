import { NavLink, Route, Routes } from "react-router-dom";
import ProductListPage from "./pages/ProductListPage.jsx";
import ProductManagementPage from "./pages/ProductManagementPage.jsx";
import CartSummary from "./components/CartSummary.jsx";
import { ToastProvider } from "./components/ToastProvider.jsx";

const App = () => {
  return (
    <ToastProvider>
      <div className="app">
        <header className="header">
          <div>
            <h1>Product Manager</h1>
            <p className="muted">
              Enterprise-ready catalog with fast product operations.
            </p>
          </div>
          <nav className="nav">
            <NavLink to="/" end>
              Products
            </NavLink>
            <NavLink to="/manage">Manage</NavLink>
          </nav>
        </header>

        <main className="main">
          <Routes>
            <Route path="/" element={<ProductListPage />} />
            <Route path="/manage" element={<ProductManagementPage />} />
          </Routes>
          <aside className="sidebar">
            <CartSummary />
          </aside>
        </main>
      </div>
    </ToastProvider>
  );
};

export default App;
