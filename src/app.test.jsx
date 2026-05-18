import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

test("renders blog title", () => {
  render(<App />);
  expect(screen.getByText(/my blog/i)).toBeInTheDocument();
});

test("renders about section", () => {
  render(<App />);
  expect(
    screen.getByText(/this is a blog about/i)
  ).toBeInTheDocument();
});

test("renders articles", () => {
  render(<App />);
  expect(
    screen.getByRole("heading", { name: /first post/i })
  ).toBeInTheDocument();

  expect(
    screen.getByRole("heading", { name: /second post/i })
  ).toBeInTheDocument();
 
});