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
