import { render, screen, fireEvent } from "test";
import Projects from "./Projects";

describe("Project page tests", () => {
  const view = render(<Projects />);

  it("Page is truthy", () => {
    expect(view).toBeTruthy();
  });
});
