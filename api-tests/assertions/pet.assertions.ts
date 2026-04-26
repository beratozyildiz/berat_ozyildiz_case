import { expect, APIResponse } from '@playwright/test';

export class PetAssertions {

  static async success(res: APIResponse) {
    expect(res.status()).toBeGreaterThanOrEqual(200);
    expect(res.status()).toBeLessThan(300);
  }

  static async notFound(res: APIResponse) {
    expect(res.status()).toBe(404);
  }

  static async hasValidSchema(res: APIResponse) {
    const body = await res.json();

    expect(body).toMatchObject({
      id: expect.any(Number),
      photoUrls: expect.any(Array),
    });
  }
  
  static responseTimeUnder(duration: number, ms: number) {
    expect(duration).toBeLessThan(ms);
  }
}