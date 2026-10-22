import { render, screen } from "@testing-library/react";
import App from "../App";

const renderApp = async () => {
  const view = render(<App />);
  // Let the first metrics fetch settle so its state update happens inside the test.
  await screen.findByText("CPU");
  return view;
};

describe("page structure", () => {
  // These guard the Lighthouse accessibility fixes.
  test("has exactly one h1 and one main landmark", async () => {
    await renderApp();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getAllByRole("main")).toHaveLength(1);
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  test("headings never skip a level", async () => {
    const { container } = await renderApp();
    const levels = [...container.querySelectorAll("h1, h2, h3, h4, h5, h6")].map((h) => Number(h.tagName[1]));
    expect(levels[0]).toBe(1);
    levels.forEach((level, i) => {
      if (i > 0) expect(level).toBeLessThanOrEqual(levels[i - 1] + 1);
    });
  });

  test("every link has an accessible name", async () => {
    await renderApp();
    for (const link of screen.getAllByRole("link")) expect(link).toHaveAccessibleName();
  });

  test("every in-page link points at a section that exists", async () => {
    const { container } = await renderApp();
    const targets = [...container.querySelectorAll('a[href^="#"]')].map((a) => a.getAttribute("href")!.slice(1));
    // #home is the logo's link back to the top, and has no section of its own.
    for (const id of targets.filter((id) => id !== "home")) {
      expect(container.querySelector(`[id="${id}"]`)).not.toBeNull();
    }
  });
});
