import React, { useState } from "react";
import ReactDOM from "react-dom";
import { View, intercalate } from "./view";

import "./styles.css";

function App() {
  const [count, setCount] = useState(0);

  const pageTitle = View(({ title, PTKey }) => <h1>{title}</h1>);
  const message = View(({ message, MKey }) => <p>{message}</p>);
  const copyrightNotice = View(({ author, year }) => (
    <p>
      © {author} {year}
    </p>
  ));

  const seperator = (sep) => View(({ SKey }) => <span>{sep}</span>);

  const pageMessage = pageTitle.concat(message);
  const withIntercalate = intercalate(seperator("/"), [
    pageTitle,
    message,
    copyrightNotice
  ]);

  console.log(withIntercalate);
  var res2 = withIntercalate.fold({
    title: "Title",
    PTKey: "PTKey",
    message: "Message",
    MKey: "MKey",
    author: "Mike",
    year: "3332"
  });

  var res = pageMessage.fold({
    title: "Title",
    PTKey: "PTKey",
    message: "Message",
    MKey: "MKey"
  });

  console.log(res);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>You clicked {count} times!</h2>

      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      {res}
      {res2}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
