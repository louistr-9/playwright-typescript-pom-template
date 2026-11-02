/**
 * Environment variables helper with safe fallbacks
 */
export class Env {
  static get baseURL(): string {
    return process.env.BASE_URL || 'https://demo.playwright.dev/todomvc';
  }

  static get apiBaseURL(): string {
    return process.env.API_BASE_URL || 'https://reqres.in/api';
  }

  static get isCI(): boolean {
    return process.env.CI === 'true';
  }

  static get(key: string, defaultValue: string = ''): string {
    return process.env[key] || defaultValue;
  }
}
