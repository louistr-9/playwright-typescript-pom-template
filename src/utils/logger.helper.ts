/**
 * Logging utility for clear, traceable test execution logs
 */
export class Logger {
  private static formatTime(): string {
    return new Date().toISOString().split('T')[1].replace('Z', '');
  }

  static info(message: string): void {
    console.log(`\x1b[36m[INFO  ${this.formatTime()}]\x1b[0m ${message}`);
  }

  static step(stepName: string): void {
    console.log(`\x1b[35m[STEP  ${this.formatTime()}]\x1b[0m 🔹 ${stepName}`);
  }

  static api(method: string, url: string, status?: number): void {
    const statusText = status ? ` [Status: ${status}]` : '';
    console.log(`\x1b[33m[API   ${this.formatTime()}]\x1b[0m 🌐 ${method.toUpperCase()} ${url}${statusText}`);
  }

  static success(message: string): void {
    console.log(`\x1b[32m[PASS  ${this.formatTime()}]\x1b[0m ✅ ${message}`);
  }

  static error(message: string, error?: unknown): void {
    console.error(`\x1b[31m[ERROR ${this.formatTime()}]\x1b[0m ❌ ${message}`, error ?? '');
  }
}
