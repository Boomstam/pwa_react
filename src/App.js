import React from 'react';
import './App.css';
import { Button }from "react-bootstrap";
import {swRegistration} from "./serviceWorkerRegistration";

function App() {
    const skipWaiting = () => {
        console.log("skip waiting");
        if(swRegistration === undefined) return;
        swRegistration.active?.postMessage({type: "SKIP_WAITING"});
    }
    let interval = undefined;
    const activate = () => {
        console.log("activate");
        if('Notification' in window){
            console.log("notifications possible");
            Notification.requestPermission().then((permission) => {
                console.log("permission: ",  permission);
                if(permission === "granted"){
                    console.log("show notification");
                    interval = setInterval(function() {
                        if(swRegistration === undefined){
                            new Notification("Object La");
                        } else {
                            swRegistration.showNotification("La");
                        }
                    }, 5000);
                }
            });
        } else{
            console.log("notifications not possible");
        }
    }
    const stop = () => {
        console.log("stop");
        if(interval === undefined) return;
        clearInterval(interval);
    }
  return (
    <div className="App">
        <h3>Skip waiting</h3>
        <Button variant="primary" onClick={skipWaiting}>Skip Waiting</Button>
        <h3>Notifications API</h3>
        <Button variant="primary" onClick={activate}>Activate</Button>
        <Button variant="primary" onClick={stop}>Stop</Button>
    </div>
  );
}

export default App;
