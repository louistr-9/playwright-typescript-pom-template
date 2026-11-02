import { APIRequestContext, APIResponse } from '@playwright/test';
import { BaseApiClient } from '../core/BaseApiClient';

export interface CreateUserPayload {
  name: string;
  job: string;
}

/**
 * UserApi: Sample Service Object Model (SOM) implementation.
 * Encapsulates REST API endpoints for User management.
 */
export class UserApi extends BaseApiClient {
  constructor(request: APIRequestContext, baseUrl: string) {
    super(request, baseUrl);
  }

  async getUsers(page: number = 1): Promise<APIResponse> {
    return await this.get('users', {
      params: { page },
    });
  }

  async getUserById(id: number): Promise<APIResponse> {
    return await this.get(`users/${id}`);
  }

  async createUser(payload: CreateUserPayload): Promise<APIResponse> {
    return await this.post('users', {
      data: payload,
    });
  }

  async updateUser(id: number, payload: Partial<CreateUserPayload>): Promise<APIResponse> {
    return await this.put(`users/${id}`, {
      data: payload,
    });
  }

  async deleteUser(id: number): Promise<APIResponse> {
    return await this.delete(`users/${id}`);
  }
}

