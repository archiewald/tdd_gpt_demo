import { useState, ChangeEvent } from "react";
import "./App.css";

type FormFields = {
  title: string;
  description: string;
};

type TodoItem = {
  title: string;
  description: string;
};

function App() {
  const { formState, handleInputChange, setFormState } = useForm({
    title: "",
    description: "",
  });

  const { todos, addTodo } = useTodos();

  const handleAddTodo = () => {
    addTodo(formState);
    setFormState({ title: "", description: "" });
  };

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
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <h2>{todo.title}</h2>
            <p>{todo.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

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

function useTodos() {
  const [todos, setTodos] = useState<Array<TodoItem>>([]);

  const addTodo = (todo: TodoItem) => {
    setTodos((prevTodos) => [...prevTodos, todo]);
  };

  return { todos, addTodo };
}
