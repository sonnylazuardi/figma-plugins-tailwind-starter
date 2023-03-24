import * as React from "react";
import * as ReactDOM from "react-dom";
import "./ui.css";

declare function require(path: string): any;

function App() {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onCreate = () => {
    const count = Number(inputRef.current?.value || 0);
    parent.postMessage(
      { pluginMessage: { type: "create-rectangles", count } },
      "*"
    );
  };

  const onCancel = () => {
    parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
  };

  return (
    <main className="bg-white h-[100vh] flex flex-col justify-center items-center w-full">
      <header className="flex flex-col justify-center items-center mb-4">
        <img src={require("./logo.svg")} />
        <h2 className="text-2xl">Rectangle Creator</h2>
      </header>
      <section className="flex flex-row justify-center items-center space-x-2  mb-4">
        <label htmlFor="input">Count</label>
        <input className="border border-neutral-100 rounded-md p-2" id="input" type="number" min="0" ref={inputRef} />
      </section>
      <footer className="flex flex-row justify-center items-center space-x-2">
        <button className="bg-blue-500 text-white rounded-md py-2 px-3" onClick={onCreate}>
          Create
        </button>
        <button className="border border-neutral-300 rounded-md py-2 px-3" onClick={onCancel}>Cancel</button>
      </footer>
    </main>
  );
}

ReactDOM.render(<App />, document.getElementById("react-page"));
