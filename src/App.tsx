import React, { useState } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Todo Title"
        value={title}
        onChange={handleInputChange}
        maxLength={256}
      />
    </div>
  );
}

export default App;
