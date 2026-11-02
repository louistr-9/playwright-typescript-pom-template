import { test, expect } from '../../src/fixtures/pageFixtures';
import { DataGenerator } from '../../src/utils/data.generator';

test.describe('ReqRes API - Service Object Model (SOM) Test Suite', () => {
  test('TC01: GET /users - Should retrieve list of users with pagination', async ({ userApi }) => {
    const response = await userApi.getUsers(1);
    await userApi.assertStatus(response, 200);

    const body = await response.json();
    expect(body).toHaveProperty('page', 1);
    expect(Array.isArray(body.data)).toBeTruthy();
    expect(body.data.length).toBeGreaterThan(0);
    expect(body.data[0]).toHaveProperty('id');
    expect(body.data[0]).toHaveProperty('email');
  });

  test('TC02: GET /users/:id - Should retrieve a single user by ID', async ({ userApi }) => {
    const response = await userApi.getUserById(2);
    await userApi.assertStatus(response, 200);

    const body = await response.json();
    expect(body.data).toHaveProperty('id', 2);
    expect(body.data).toHaveProperty('email');
  });

  test('TC03: POST /users - Should create a new user with generated data', async ({ userApi }) => {
    const payload = {
      name: `User_${DataGenerator.randomString(5)}`,
      job: 'QA Automation Engineer',
    };

    const response = await userApi.createUser(payload);
    await userApi.assertStatus(response, 201);

    const body = await response.json();
    expect(body).toHaveProperty('name', payload.name);
    expect(body).toHaveProperty('job', payload.job);
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('createdAt');
  });

  test('TC04: DELETE /users/:id - Should return 204 No Content upon deletion', async ({ userApi }) => {
    const response = await userApi.deleteUser(2);
    await userApi.assertStatus(response, 204);
  });
});
