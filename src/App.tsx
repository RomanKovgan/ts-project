import "./App.css";
import AlertContainer from "./components/Alert/Alert";
import { Router } from "./Router";
import { AlertProvider } from "./providers/AlertProvider/alertProvider";

function App() {
  return (
    <AlertProvider>
      <AlertContainer />
      <Router />
    </AlertProvider>
  );
}

export default App;
