import { render, screen, fireEvent } from "test";

import LoginPage from "./LoginPage";

describe("Login page tests", () => {
  render(<LoginPage />);
  it("If you provide bad credentials show errors", () => {
    fireEvent.click(screen.getByText("LOGIN"));
  });
});
