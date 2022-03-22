import { render, screen } from "test";

import Footer from "./Footer";

describe("Footer tests", () => {
  const view = render(<Footer />);

  it("Expect Bug trucker ©2022 Created by Antonijo D be in document", () => {
    expect(
      screen.getByText("Bug trucker ©2022 Created by Antonijo D")
    ).toBeInTheDocument();
  });

  it("Footer is correctly rendered", () => {
    expect(view).toBeTruthy();
  });
});
