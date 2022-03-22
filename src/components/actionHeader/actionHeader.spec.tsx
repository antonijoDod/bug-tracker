import { render, screen, fireEvent } from "test";
import ActionHeader from "./ActionHeader";

const handleDrawerOpen = () => {};
const handleDrawerClose = () => {};

describe("Testing action header", () => {
  render(
    <ActionHeader
      title="Projects"
      subTitle="All projects"
      visible={true}
      drawerTitle="Add new project"
      children="This is children"
      handleDrawerOpen={handleDrawerOpen}
      handleDrawerClose={handleDrawerClose}
    />
  );

  describe("Testing open / close drawer", () => {
    it("When click on new button, open drawer and show form text Add new project", () => {
      fireEvent.click(screen.getByText("New"));
      expect(screen.getByText("Add new project")).toBeInTheDocument();
    });
  });
});
