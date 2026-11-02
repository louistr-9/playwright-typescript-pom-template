import { test, expect } from '../../src/fixtures/pageFixtures';
import { DataGenerator } from '../../src/utils/data.generator';

test.describe('TodoMVC - Page Object Model (POM) E2E Test Suite', () => {
  test.beforeEach(async ({ todoPage }) => {
    await todoPage.open();
  });

  test('TC01: Should add new todo items successfully', async ({ todoPage }) => {
    const task1 = DataGenerator.randomTodoTitle();
    const task2 = DataGenerator.randomTodoTitle();

    await todoPage.addTodo(task1);
    await todoPage.addTodo(task2);

    await todoPage.expectTodoCount(2);
    await todoPage.expectTodoVisible(task1);
    await todoPage.expectTodoVisible(task2);
  });

  test('TC02: Should complete a todo item and filter active/completed', async ({ todoPage }) => {
    const task = DataGenerator.randomTodoTitle();

    await todoPage.addTodo(task);
    await todoPage.completeTodo(task);

    await todoPage.expectTodoCompleted(task);
  });

  test('TC03: Should delete a todo item', async ({ todoPage }) => {
    const task = DataGenerator.randomTodoTitle();

    await todoPage.addTodo(task);
    await todoPage.expectTodoCount(1);

    await todoPage.deleteTodo(task);
    await todoPage.expectTodoCount(0);
  });
});
