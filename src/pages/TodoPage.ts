import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../core/BasePage';

/**
 * TodoPage: Sample Page Object Model (POM) implementation.
 * Encapsulates all selectors and actions for TodoMVC application.
 */
export class TodoPage extends BasePage {
  readonly newTodoInput: Locator;
  readonly todoItems: Locator;
  readonly todoCount: Locator;
  readonly filterAllButton: Locator;
  readonly filterActiveButton: Locator;
  readonly filterCompletedButton: Locator;
  readonly clearCompletedButton: Locator;

  constructor(page: Page) {
    super(page);
    this.newTodoInput = page.getByPlaceholder('What needs to be done?');
    this.todoItems = page.locator('.todo-list li');
    this.todoCount = page.locator('.todo-count');
    this.filterAllButton = page.getByRole('link', { name: 'All' });
    this.filterActiveButton = page.getByRole('link', { name: 'Active' });
    this.filterCompletedButton = page.getByRole('link', { name: 'Completed' });
    this.clearCompletedButton = page.getByRole('button', { name: 'Clear completed' });
  }

  async open(): Promise<void> {
    await this.navigate('https://demo.playwright.dev/todomvc/#/');
  }

  async addTodo(title: string): Promise<void> {
    await this.fill(this.newTodoInput, title, 'New Todo Input');
    await this.pressKey(this.newTodoInput, 'Enter', 'New Todo Input');
  }

  async completeTodo(title: string): Promise<void> {
    const item = this.todoItems.filter({ hasText: title });
    const toggle = item.locator('.toggle');
    await this.click(toggle, `Toggle complete for: "${title}"`);
  }

  async deleteTodo(title: string): Promise<void> {
    const item = this.todoItems.filter({ hasText: title });
    await item.hover();
    const destroyButton = item.locator('.destroy');
    await this.click(destroyButton, `Delete button for: "${title}"`);
  }

  async expectTodoCount(expectedCount: number): Promise<void> {
    await expect(this.todoItems).toHaveCount(expectedCount);
  }

  async expectTodoVisible(title: string): Promise<void> {
    const item = this.todoItems.filter({ hasText: title });
    await expect(item).toBeVisible();
  }

  async expectTodoCompleted(title: string): Promise<void> {
    const item = this.todoItems.filter({ hasText: title });
    await expect(item).toHaveClass(/completed/);
  }
}
