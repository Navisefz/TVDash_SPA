import React, { useState, useEffect } from "react";
import "./Chat.css";
import Message from "./Message";
import axios from "axios";
import {
  HubConnectionBuilder,
  LogLevel,
  HttpTransportType
} from "@microsoft/signalr";

export default () => {
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [connection, setConnection] = useState();

  useEffect(async () => {
    const socketConnection = new HubConnectionBuilder()
      .configureLogging(LogLevel.Debug)
      .withUrl("https://localhost:44313/imageHub", {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets
      })
      .build();
    await socketConnection.start();
    setConnection(socketConnection);

   
    
  }, []);
   const floor = new URLSearchParams(window.location.search).get('floor');
   axios
    // .get(`https://localhost:44313/api/Image/?floor=10`)
   
    .get(`https://localhost:44313/api/Image/?floor=${floor}`)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
  useEffect( () => {
   
      console.log(err);
    });
    
  }, [messages]);

  connection &&
    connection.on("message", message => {
      setMessages([...messages, message]);
    
    
    });
function refresh(msg) {
    connection && connection.invoke("message", msg);
   
}
   
  return (
    <div className="wrapper">
     
       
            <button
              className="btn btn-primary btn-sm"
              onClick={_ => {
                const msg = {
                  id: Math.random() * 10,
                  message,
                  userName: userName
                };
                setMessages([...messages, msg]);
                setMessage("");

                refresh(msg)
                
              }}
            >
              Send
            </button>
          </div>
        
      
   
  );
};