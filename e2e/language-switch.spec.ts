import { expect, test } from "@playwright/test";

test("a visitor lands in Polish and switches a topic to English and back", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/pl$/);

  await page.goto("/pl/optimization/image");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("next/image");
  await expect(page.getByText("Leniwe ładowanie, srcset, priorytet i LCP.")).toBeVisible();

  await page.getByRole("navigation", { name: "Język" }).getByRole("link", { name: "EN" }).click();
  await expect(page).toHaveURL(/\/en\/optimization\/image$/);
  await expect(page.getByText("Lazy loading, srcset, priority, and LCP.")).toBeVisible();

  await page.getByRole("navigation", { name: "Language" }).getByRole("link", { name: "PL" }).click();
  await expect(page).toHaveURL(/\/pl\/optimization\/image$/);
});

test("a demo has a collapsed Under the hood panel that opens with real evidence", async ({ page }) => {
  await page.goto("/pl/optimization/font/demo");

  const panel = page.getByText("Pod maską");
  await expect(panel).toBeVisible();
  await expect(page.getByText("Struktura folderu")).toBeHidden();

  await panel.click();
  await expect(page.getByText("Struktura folderu")).toBeVisible();
  await expect(page.getByText("Żądane pliki fontów (na żywo)")).toBeVisible();
});
