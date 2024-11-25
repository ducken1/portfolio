import React from 'react';

function JavaScriptProject() {
  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <div style={{ padding: '20px', textAlign: 'center', color: 'black', width: '80%', maxWidth: '800px' }}>
        <h1>JavaScript Project</h1>
        <p>This is the JavaScript project page.</p>
        <p>Here you can include an explanation of your JavaScript project, or maybe a code snippet or demo!</p>
        <pre>
          {`
function greet() {
  console.log("Hello, World!");
}

greet();`}
        </pre>
        <p>Feel free to replace this with a link to your JavaScript project or a detailed description of what this project entails!</p>
      </div>
    </div>
  );
}

export default JavaScriptProject;
