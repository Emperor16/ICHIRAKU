import { SignedIn, SignOutButton, SignedOut, SignInButton } from "@clerk/clerk-react"
import Navbar from "./components/Navbar.jsx"
import { Route, Routes } from "react-router"
import HomePage from "./pages/HomePage.jsx"
import ProductPage from "./pages/ProductPage.jsx"
import ProfilePage from "./pages/ProfilePage.jsx"
import CreatePage from "./pages/CreatePage.jsx"
import EditProductPage from "./pages/EditProductPage.jsx"
import NotFoundPage from "./pages/NotFoundPage.jsx"

function App() {

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/edit/:id" element={<EditProductPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

    </div>
  );
}

export default App;
