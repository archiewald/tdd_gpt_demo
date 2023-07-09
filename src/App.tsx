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

  const setValue = (name: keyof FormFields, value: string) => {
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  return { formState, handleInputChange, setValue };
}

function App() {
  const { formState, handleInputChange, setValue } = useForm({
    title: "",
    description: "",
  });

  const handleAddTodo = () => {
    // TODO: Implement todo saving logic
    // For now, just clear the form
    setValue("title", "");
    setValue("description", "");
  };

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
      <button onClick={handleAddTodo}>Add Todo</button>
    </div>
  );
}

export default App;
