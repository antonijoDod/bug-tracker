import { render, screen, fireEvent } from "test";
import ProjectsPage from "./index";

describe("Project page tests", () => {
  const view = render(<ProjectsPage />);

  it("Page is truthy", () => {
    expect(view).toBeTruthy();
  });
});
