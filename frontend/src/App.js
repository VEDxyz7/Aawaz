import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GroceryDashboard from "@/pages/GroceryDashboard";
import LandingPage from "@/pages/LandingPage";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<GroceryDashboard />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;