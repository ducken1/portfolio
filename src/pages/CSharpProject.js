import React, {  } from "react";

function CSharpProject() {


  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      <div className="console-container">
        <span id="text"></span>
        <div className="console-underscore" id="console">
          &#95;
        </div>
      </div>
    </div>
  );
}

export default CSharpProject;
