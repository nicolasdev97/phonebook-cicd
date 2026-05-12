import { render, screen } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import App from "./App.jsx";

vi.mock("axios", () => {
  return {
    default: {
      get: vi.fn(() =>
        Promise.resolve({
          data: [],
        }),
      ),
    },
  };
});

test("renders phonebook title", async () => {
  render(<App />);

  expect(await screen.findByText("Phonebook")).toBeDefined();
});
