import "./App.css";
import { usePrivy } from "@privy-io/react-auth";
import ListingsPage from "./listings"; // Ensure this import is correct

function App() {
  const { ready, authenticated, user, login, logout } = usePrivy();

  // Wait until the Privy client is ready before taking any actions
  if (!ready) {
    return null;
  }

  return (
    <div className="gradient-background">
    <div className="App">
      <header className="App-header">
        {ready && authenticated ? (
          <div>
            {/* <textarea
              readOnly
              value={JSON.stringify(user, null, 2)}
              style={{ width: "600px", height: "250px", borderRadius: "6px" }}
            />
            <br /> */}
            {/* <button
              onClick={logout}
              style={{
                marginTop: "20px",
                padding: "12px",
                backgroundColor: "#069478",
                color: "#FFF",
                border: "none",
                borderRadius: "6px",
              }}
            >
              Log Out
            </button> */}
            <ListingsPage /> {/* Show ListingsPage when authenticated */}
          </div>
        ) : (
          <>
            <button
              onClick={login}
              style={{
                padding: "12px",
                backgroundColor: "#069478",
                color: "#FFF",
                border: "none",
                borderRadius: "6px",
              }}
            >
              Log In
            </button>
          </>
        )}
      </header>
    </div>
    </div>
  );
}

export default App;
