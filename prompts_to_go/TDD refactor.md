Roleplay as a world-class frontend senior software engineer pair programmer. You follow Uncle Bob clean code principles.

We use test driven development approach very strictly.

- We are in the refactor phase of TDD. All the tests are passing.
- You are responsible to refactor the code to make it more readable and maintainable.
- You are provided with instructions on how to refactor the code. Follow them strictly.
- Write only in the implementation file. Never write anything in test file.

## Refactoring instructions

```

```

## Test file:

```tsx
import userEvent from "@testing-library/user-event";
import { screen, render } from "@testing-library/react";
import App from "./App";

beforeEach(() => {
  userEvent.setup();
});

describe("Add Todo Feature", () => {
  it("should allow user to input a title for the new todo item, not exceeding 256 characters", async () => {
    // given
    render(<App />);
    const input = screen.getByPlaceholderText("Todo Title");

    // when
    await userEvent.type(input, "a".repeat(256) + "b");

    // then
    expect(input).toHaveValue("a".repeat(256));
  });

  it("should allow user to add an optional description to the new todo item, not exceeding 1024 characters", async () => {
    // given
    render(<App />);
    const textarea = screen.getByPlaceholderText("Todo Description");

    // when
    await userEvent.type(textarea, "a".repeat(1025));

    // then
    expect(textarea).toHaveValue("a".repeat(1024));
  });

  it("should clear the form when clicking 'Add Todo' button", async () => {
    // given
    render(<App />);
    const titleInput = screen.getByPlaceholderText("Todo Title");
    const descriptionInput = screen.getByPlaceholderText("Todo Description");
    const addButton = screen.getByRole("button", { name: /add todo/i });

    // when
    await userEvent.type(titleInput, "Learn Jest");
    await userEvent.type(descriptionInput, "It's a very useful testing tool");
    await userEvent.click(addButton);

    // then
    // We expect the form fields to be cleared after saving a todo
    expect(titleInput).toHaveValue("");
    expect(descriptionInput).toHaveValue("");
  });

  it("should add a new todo item to the 'Pending Todo' list when the 'Add Todo' button is clicked", async () => {
    // given
    render(<App />);
    const titleInput = screen.getByPlaceholderText("Todo Title");
    const descriptionInput = screen.getByPlaceholderText("Todo Description");
    const addButton = screen.getByRole("button", { name: /add todo/i });

    // when
    await userEvent.type(titleInput, "Learn TDD");
    await userEvent.type(
      descriptionInput,
      "A test-driven development approach"
    );
    await userEvent.click(addButton);

    // then
    const todoItems = screen.getAllByRole("listitem");

    expect(todoItems).toHaveLength(1);
    expect(todoItems[0]).toHaveTextContent("Learn TDD");
    expect(todoItems[0]).toHaveTextContent(
      "A test-driven development approach"
    );
  });
});
```

## Implementation file:

```tsx
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

  const [todos, setTodos] = useState<Array<TodoItem>>([]);

  const handleAddTodo = () => {
    setTodos((prevTodos) => [...prevTodos, formState]);
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
```

## Guidelines for writing code:

Technologies: typescript, react
Rules:

- don't use comments
- instead use descriptive naming
- favor function declarations over arrow functions
