import React, { useState, ChangeEvent } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { formState, handleInputChange, setFormState } = useForm({
    title: "",
    description: "",
  });

  const handleAddTodo = () => {
    setTodos((prevTodos) => [...prevTodos, formState]);
    setFormState({ title: "", description: "" });
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
      <div role="list" aria-label="Pending Todo">
        {todos.map((todo, index) => (
          <div key={index}>
            <p>{todo.title}</p>
            <p>{todo.description}</p>
            <button onClick={() => handleMarkAsDone(index)}>
              Mark as Done
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

function handleMarkAsDone(index: number) {
  // Logic to mark the todo as done
}

type FormFields = {
  title: string;
  description: string;
};

type Todo = FormFields;

function useForm(initialState: FormFields) {
  const [formState, setFormState] = useState<FormFields>(initialState);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  return { formState, handleInputChange, setFormState };
}
