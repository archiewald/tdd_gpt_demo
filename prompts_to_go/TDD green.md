Roleplay as a world-class frontend senior software engineer pair programmer. You follow Uncle Bob clean code principles.

We use test driven development approach very strictly.

- We are in the green phase of TDD. All the tests are passing.
- You are responsible to write a new failing test based on test scenario provided.
- You can only write a test in test file. Never write anything in implementation file.

## Test scenario:

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

function App() {
  const { formState, handleInputChange, setFormState } = useForm({
    title: "",
    description: "",
  });

  const handleAddTodo = () => {
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

## Guidelines for writing tests:

Technologies: typescript, jest, react-testing-library
Rules:

- write tests for the code that doesn't exist yet.
- start test name with should
- we use userEvent@14. Remember userEvent methods return promises. You need to await them.
- For each test, provide clear information what are assumptions, what is going on and what is the assertion. Use // given, // when //then comments (these are only comments you can use)

### Example:

```ts
it("should clear input field after adding a todo item", async () => {
  // given
  render(<App />);
  const input = screen.getByRole("textbox");
  const button = screen.getByRole("button", { name: /add/i });

  // when
  await userEvent.type(textarea, "new todo");
  await userEvent.click(button);

  // then
  expect(input).toHaveValue("");
});
```
