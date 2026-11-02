/**
 * Random test data generator utility
 */
export class DataGenerator {
  /**
   * Generate a random string of specified length
   */
  static randomString(length: number = 8): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Generate unique email for test user
   */
  static randomEmail(prefix: string = 'testuser'): string {
    const timestamp = Date.now();
    const random = this.randomString(4);
    return `${prefix}_${timestamp}_${random}@example.com`;
  }

  /**
   * Generate random integer in [min, max] range
   */
  static randomNumber(min: number = 1, max: number = 100): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Generate sample todo title
   */
  static randomTodoTitle(): string {
    const tasks = [
      'Write comprehensive unit tests',
      'Refactor API client module',
      'Review Pull Request #42',
      'Automate smoke test suite',
      'Optimize database queries',
      'Configure CI/CD deployment pipeline',
      'Perform security vulnerability audit',
    ];
    const picked = tasks[Math.floor(Math.random() * tasks.length)];
    return `${picked} - ${this.randomString(4).toUpperCase()}`;
  }
}
