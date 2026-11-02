import { test as base, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';
import { UserApi } from '../api/UserApi';
import { Env } from '../utils/env.helper';

/**
 * Fixture Types: Declare all injectable page objects and API services
 */
export type TestFixtures = {
  todoPage: TodoPage;
  userApi: UserApi;
};

/**
 * Custom Playwright test runner with auto-injected Page Objects and API Services.
 * Eliminates manual `new Page(page)` instantiations across all test specs.
 */
export const test = base.extend<TestFixtures>({
  todoPage: async ({ page }, use) => {
    const todoPage = new TodoPage(page);
    await use(todoPage);
  },

  userApi: async ({ request }, use) => {
    const userApi = new UserApi(request, Env.apiBaseURL);
    await use(userApi);
  },
});

export { expect };

