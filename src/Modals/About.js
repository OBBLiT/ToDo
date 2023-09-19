import React from "react";

function About({ showAbout, setShowAbout }) {
  return (
    <div
      style={{
        position: "fixed",
        zIndex: 4,
        alignSelf: "center",
        height: "100vh",
        width: "100vw",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
      }}
    >
      <main
        style={{
          position: "fixed",
          display: "flex",
          flexFlow: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: "linear-gradient(90deg, #aeffb0 10%, #085f6f 90%) ",
          paddingBottom: "5vmin",
          width: "50vw",
          border: "solid #003038 0.7vmin",
          borderRadius: "3vmin",
          gap: "1vmin",
          fontSize: "3.3vmin",
          fontFamily: "fantasy",
          padding: "2vmin",
          fontWeight: "500",
          color: "#00252c",
        }}
        id="addTodo"
      >
        <span
          onClick={() => {
            setShowAbout(false);
          }}
          id="closeANT"
        >
          X
        </span>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "95%",
            alignSelf: "center",
            marginBottom: "3vmin",
            fontSize: "2vmin",
          }}
        >
          <h1>
            {`Made by `}
            <a href="https://linkedin.com/in/obblit/">OBBLiT</a>
          </h1>
        </div>

        <div style={{ display: "flex", justifyContent: "space-around", width: "100%", alignItems: "center" }}></div>
      </main>
    </div>
  );
}

export default About;
