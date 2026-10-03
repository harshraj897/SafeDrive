
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Accidents from "./pages/Accidents";
import Vehicles from "./pages/Vehicles";
import Contacts from "./pages/Contacts";
import MapPage from "./pages/Map";
import Settings from "./pages/Settings";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="accidents" element={<Accidents />} />
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="map" element={<MapPage />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;