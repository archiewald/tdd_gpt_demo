import userEvent from "@testing-library/user-event";
import { screen, render, within } from "@testing-library/react";
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

  it("should allow user to save the new todo item by clicking on the 'Add Todo' button", async () => {
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

  it("should display the new todo item on the 'Pending Todo' list upon successful saving", async () => {
    // given
    render(<App />);
    const titleInput = screen.getByPlaceholderText("Todo Title");
    const descriptionInput = screen.getByPlaceholderText("Todo Description");
    const button = screen.getByRole("button", { name: /add todo/i });

    // when
    await userEvent.type(titleInput, "New Todo");
    await userEvent.type(descriptionInput, "Todo description");
    await userEvent.click(button);

    // then
    const pendingTodoList = screen.getByRole("list", { name: /pending todo/i });
    const todoTitle = within(pendingTodoList).getByText("New Todo");
    const todoDescription =
      within(pendingTodoList).getByText("Todo description");

    expect(todoTitle).toBeInTheDocument();
    expect(todoDescription).toBeInTheDocument();
  });
});

describe("Mark Todo as Done Feature", () => {
  it("should allow user to mark a todo item as done", async () => {
    // given
    render(<App />);
    await addTodo("New Todo", "Todo description");

    // when
    await markAsDone("New Todo");

    // then
    const completedTodoList = screen.getByRole("list", {
      name: /completed todo/i,
    });
    const todoTitle = within(completedTodoList).getByText("New Todo");
    expect(todoTitle).toBeInTheDocument();
  });

  it("should move multiple todo items to the 'Completed Todo' list upon marking them as done", async () => {
    // given
    render(<App />);
    await addTodo("Eat breakfast");
    await addTodo("Eat lunch");

    // when
    await markAsDone("Eat breakfast");
    await markAsDone("Eat lunch");

    // then
    const completedTodoList = screen.getByRole("list", {
      name: /completed todo/i,
    });
    const breakfastTodoTitle =
      within(completedTodoList).getByText("Eat breakfast");
    const lunchTodoTitle = within(completedTodoList).getByText("Eat lunch");

    expect(breakfastTodoTitle).toBeInTheDocument();
    expect(lunchTodoTitle).toBeInTheDocument();
  });
});

const addTodo = async (title: string, description = " ") => {
  const titleInput = screen.getByPlaceholderText("Todo Title");
  const descriptionInput = screen.getByPlaceholderText("Todo Description");
  const addButton = screen.getByRole("button", { name: /add todo/i });

  await userEvent.type(titleInput, title);
  await userEvent.type(descriptionInput, description);
  await userEvent.click(addButton);
};

const markAsDone = async (title: string) => {
  const pendingTodoList = screen.getByRole("list", { name: /pending todo/i });
  const markAsDoneButtons = within(pendingTodoList).getAllByRole("button", {
    name: /mark as done/i,
  });
  const todoItems = within(pendingTodoList).getAllByText(title);

  const todoIndex = todoItems.findIndex((item) => item.textContent === title);

  if (todoIndex !== -1) {
    await userEvent.click(markAsDoneButtons[todoIndex]);
  }
};
