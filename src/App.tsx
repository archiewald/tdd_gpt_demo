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

  const pendingTodos = todos.filter((todo) => !todo.complete);
  const completedTodos = todos.filter((todo) => todo.complete);

  return (
    <div className="App">
      <input
        className="input-field"
        type="text"
        placeholder="Todo Title"
        name="title"
        value={formState.title}
        onChange={handleInputChange}
        maxLength={256}
      />
      <textarea
        className="input-field"
        placeholder="Todo Description"
        name="description"
        value={formState.description}
        onChange={handleInputChange}
        maxLength={1024}
      />
      <button className="add-button" onClick={handleAddTodo}>
        Add Todo
      </button>
      <div className="todo-list" role="list" aria-label="Pending Todo">
        <h2 className="todo-heading">Pending Todo</h2>
        {pendingTodos.map((todo, index) => (
          <div className="todo-item" key={index}>
            <p className="todo-title">{todo.title}</p>
            <p className="todo-description">{todo.description}</p>
            <button
              className="mark-done-button"
              onClick={() => handleMarkAsDone(index)}
            >
              Mark as Done
            </button>
          </div>
        ))}
      </div>
      <div className="todo-list" role="list" aria-label="Completed Todo">
        <h2 className="todo-heading">Completed Todo</h2>
        {completedTodos.map((todo, index) => (
          <div className="todo-item" key={index}>
            <p className="todo-title">{todo.title}</p>
            <p className="todo-description">{todo.description}</p>
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
