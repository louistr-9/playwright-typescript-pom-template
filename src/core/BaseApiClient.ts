import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import { Logger } from '../utils/logger.helper';

export interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  data?: unknown;
  token?: string;
}

/**
 * BaseApiClient: Service Object Model (SOM) wrapper around Playwright APIRequestContext.
 * Manages request headers, authentication bearer tokens, response time measurement,
 * and comprehensive API call logging.
 */
export abstract class BaseApiClient {
  readonly request: APIRequestContext;
  readonly baseUrl: string;

  constructor(request: APIRequestContext, baseUrl: string) {
    this.request = request;
    this.baseUrl = baseUrl;
  }

  protected buildUrl(endpoint: string): string {
    if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
      return endpoint;
    }
    const cleanBase = this.baseUrl.replace(/\/+$/, '');
    const cleanEndpoint = endpoint.replace(/^\/+/, '');
    return `${cleanBase}/${cleanEndpoint}`;
  }

  protected buildHeaders(options?: RequestOptions): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(options?.headers || {}),
    };
    if (options?.token) {
      headers['Authorization'] = `Bearer ${options.token}`;
    }
    return headers;
  }

  async get(endpoint: string, options?: RequestOptions): Promise<APIResponse> {
    const url = this.buildUrl(endpoint);
    Logger.api('GET', url);
    const startTime = Date.now();
    const response = await this.request.get(url, {
      headers: this.buildHeaders(options),
      params: options?.params,
    });
    const duration = Date.now() - startTime;
    Logger.info(`Response received in ${duration}ms [Status: ${response.status()}]`);
    return response;
  }

  async post(endpoint: string, options?: RequestOptions): Promise<APIResponse> {
    const url = this.buildUrl(endpoint);
    Logger.api('POST', url);
    const startTime = Date.now();
    const response = await this.request.post(url, {
      headers: this.buildHeaders(options),
      params: options?.params,
      data: options?.data,
    });
    const duration = Date.now() - startTime;
    Logger.info(`Response received in ${duration}ms [Status: ${response.status()}]`);
    return response;
  }

  async put(endpoint: string, options?: RequestOptions): Promise<APIResponse> {
    const url = this.buildUrl(endpoint);
    Logger.api('PUT', url);
    const response = await this.request.put(url, {
      headers: this.buildHeaders(options),
      data: options?.data,
    });
    return response;
  }

  async delete(endpoint: string, options?: RequestOptions): Promise<APIResponse> {
    const url = this.buildUrl(endpoint);
    Logger.api('DELETE', url);
    const response = await this.request.delete(url, {
      headers: this.buildHeaders(options),
      data: options?.data,
    });
    return response;
  }

  /**
   * Helper to verify response status with informative error output
   */
  async assertStatus(response: APIResponse, expectedStatus: number): Promise<void> {
    const actualStatus = response.status();
    if (actualStatus !== expectedStatus) {
      const body = await response.text().catch(() => '');
      Logger.error(`Expected status ${expectedStatus} but got ${actualStatus}. Body: ${body}`);
    }
    expect(response.status()).toBe(expectedStatus);
  }
}
