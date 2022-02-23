import React from 'react';
import './App.css';
import { Button }from "react-bootstrap";
import {swRegistration} from "./serviceWorkerRegistration";

function App() {
    const skipWaiting = () => {
        console.log("skip waiting: ", swRegistration);
        if(swRegistration === undefined) return;
        swRegistration.active?.postMessage({type: "SKIP_WAITING"});
    }
  return (
    <div className="App">
      <Button variant="primary" onClick={skipWaiting}>Skip Waiting</Button>
    </div>
  );
}

export default App;
