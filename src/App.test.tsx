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

  it.todo(
    "should remove the todo item from 'Pending Todo' list and add it to 'Completed Todo' list upon successful marking"
  );
  it.todo(
    "should display an appropriate error message if the marking process encounters an error"
  );
});

describe("Delete Todo Feature", () => {
  it.todo(
    "should provide each todo item (in both 'Pending Todo' and 'Completed Todo' lists) an option to delete"
  );
  it.todo(
    "should ask user for a confirmation before the deletion process is completed"
  );
  it.todo("should allow user to confirm and delete a todo item");
  it.todo(
    "should permanently remove the todo item from the list (whether 'Pending Todo' or 'Completed Todo') upon successful deletion"
  );
  it.todo(
    "should display an appropriate error message if the deletion process encounters an error"
  );
});

const addTodo = async (title: string, description: string) => {
  const titleInput = screen.getByPlaceholderText("Todo Title");
  const descriptionInput = screen.getByPlaceholderText("Todo Description");
  const addButton = screen.getByRole("button", { name: /add todo/i });

  await userEvent.type(titleInput, title);
  await userEvent.type(descriptionInput, description);
  await userEvent.click(addButton);
};

const markAsDone = async (title: string) => {
  const pendingTodoList = screen.getByRole("list", { name: /pending todo/i });
  const markAsDoneButton = within(pendingTodoList).getByRole("button", {
    name: /mark as done/i,
  });

  await userEvent.click(markAsDoneButton);
};
