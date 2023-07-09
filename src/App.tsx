import React, { useState, ChangeEvent } from "react";
import "./App.css";

type FormFields = {
  title: string;
  description: string;
};

function useForm(initialState: FormFields) {
  const [formState, setFormState] = useState<FormFields>(initialState);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  return { formState, handleInputChange };
}

function App() {
  const { formState, handleInputChange } = useForm({
    title: "",
    description: "",
  });

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Todo Title"
        name="title"
        value={formState.title}
        onChange={handleInputChange}
        maxLength={256}
      />
      <textarea
        placeholder="Todo Description"
        name="description"
        value={formState.description}
        onChange={handleInputChange}
        maxLength={1024}
      />
    </div>
  );
}

export default App;
