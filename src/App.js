import React, { useState, useEffect, useRef } from "react";
import "./App.scss";

// System
import axios from "axios";
import { Card } from "primereact/card";
import { Image } from "primereact/image";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";

// Assets
import placeholder1 from "./assets/placeholder1.png";
import useWindowScrollPosition from "./hooks/useScroll";

function App() {
  const [showSecondComponent, setShowSecondComponent] = useState(false);

  const nameRef = useRef();
  const surnameRef = useRef();

  const emailRef = useRef();
  const problemRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const secondComponentOffset =
        document.getElementById("second-component")?.offsetTop || 0;
      setShowSecondComponent(scrollPosition >= secondComponentOffset - 300);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger once on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTop = useWindowScrollPosition();

  const handleEmailSend = () => {
    return axios.post("https://email-app.adaptable.app/send", {
      from: emailRef?.current?.value,
      subject: `დახმარების მოთხოვნა - ${emailRef?.current?.value}`,
      text: `ვისგან: ${nameRef?.current?.value} ${surnameRef?.current?.value} პრობლემა:${problemRef?.current?.value}`,
    });
  };

  return (
    <div className="app">
      <div className="HeaderContainer">
        <Image src={placeholder1} alt="Image" width={"42px"} height="42px" />
        <p className="m-0">უბრალოდ ტექსტი ადგილის შესავსებად</p>
      </div>
      <div className="WelcomeContainer">
        <Card className="Card" title="ჩვენ შესახებ">
          <p className="m-0">
            ახსნა რა შეიძლება იყოს და რას ვაკეთებთ ჩვენ (ტექსტს მერე დავწერ)
          </p>
        </Card>
        <Image src={placeholder1} alt="Image" width={"1000px"} height="600px" />
      </div>
      <div className="FormContainer">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEmailSend();
            console.log("Submitted", e.currentTarget.nodeValue);
          }}
          className="InputContainer"
        >
          <h1>რა ტიპის დახმარება გსურთ?</h1>
          <div className="NameSurname">
            <InputText
              className="p-inputtext-lg"
              type="text"
              placeholder="სახელი"
              required
              ref={nameRef}
            />
            <InputText
              className="p-inputtext-lg"
              type="text"
              placeholder="გვარი"
              required
              ref={surnameRef}
            />
          </div>
          <InputText
            className="p-inputtext-lg"
            type="email"
            placeholder="E-mail"
            required
            ref={emailRef}
          />
          <InputTextarea
            type="text"
            placeholder="აღწერეთ თქვენი პრობლემა"
            required
            className="p-inputtext-lg MultipleInput"
            autoResize
            ref={problemRef}
          />
          <Button type="submit">გაგზავნა</Button>
        </form>
        <Image src={placeholder1} alt="Image" width={"1000px"} height="600px" />
      </div>
    </div>
  );
}

export default App;
