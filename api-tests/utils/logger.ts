import { APIResponse } from '@playwright/test';

export class Logger {
  static async logResponse(label: string, response: APIResponse) {
    const status = response.status();
    const url = response.url();

    let body;
    try {
      body = await response.json();
    } catch {
      body = 'No JSON body';
    }

    console.log(`\n📌 ${label}`);
    console.log(`➡️ URL: ${url}`);
    console.log(`➡️ STATUS: ${status}`);
    console.log(`➡️ BODY:`, body);
  }
}