import React from 'react';

function CSharpProject() {
  return (
    <div style={{ height: '100vh',width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <div style={{ padding: '20px', textAlign: 'center', color: 'black', width: '80%', maxWidth: '800px' }}>
        <h1>C# Project</h1>
        <p>This is the C# project page.</p>
        <p>Here you can include an explanation of your C# project, or maybe a code snippet or demo!</p>
        <pre>
          {`
using System;
namespace HelloWorld {
  class Program {
    static void Main() {
      Console.WriteLine("Hello, World!");
    }
  }
}`}
        </pre>
        <p>Feel free to replace this with a link to your C# project or a detailed description of what this project entails!</p>
      </div>
    </div>
  );
}

export default CSharpProject;
