import React, { useState, ChangeEvent } from "react";
import "./App.css";

function App() {
  const { todos, handleMarkAsDone, setTodos } = useTodosState();
  const { formState, handleInputChange, setFormState } = useForm({
    title: "",
    description: "",
  });

  const handleAddTodo = () => {
    setTodos((prevTodos) => [...prevTodos, { ...formState, complete: false }]);
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
      <div role="list" aria-label="Completed Todo">
        {completedTodos.map((todo, index) => (
          <div key={index}>
            <p>{todo.title}</p>
            <p>{todo.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

type FormFields = {
  title: string;
  description: string;
};

type Todo = FormFields & { complete: boolean };

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

function useTodosState(initialState: Todo[] = []) {
  const [todos, setTodos] = useState<Todo[]>(initialState);

  const handleMarkAsDone = (index: number) => {
    const newTodos = [...todos];
    // Here we toggle the complete state of the todo
    newTodos[index] = { ...newTodos[index], complete: true };
    setTodos(newTodos);
  };

  return { todos, handleMarkAsDone, setTodos };
}
