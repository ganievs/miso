import { StrictMode } from "react";
import './App.css'
import ProvidersList from "./Providers/Providers";

function App() {

  return (
    <StrictMode>
      <div>
        <h1 className="Providers">Providers</h1>
        <ProvidersList/>
      </div>
    </StrictMode>
  );
}

export default App
