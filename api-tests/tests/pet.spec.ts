import { test, expect } from '@playwright/test';
import { PetClient } from '../client/pet.client';
import { PetService } from '../services/pet.service';
import { PetFactory } from '../utils/pet.factory';
import { PetAssertions } from '../assertions/pet.assertions';
import { Logger } from '../utils/logger';

test.describe('Pet API CRUD @api @smoke', () => {

  test('✅ Full CRUD flow', async ({ request }) => {
    const service = new PetService(new PetClient(request));
    const pet = PetFactory.create();

    await test.step('Create pet', async () => {
      const start = Date.now();

      const res = await service.create(pet);

      const duration = Date.now() - start;

      await Logger.logResponse('CREATE', res);
      console.log(`⏱️ RESPONSE TIME: ${duration}ms`);

      await PetAssertions.success(res);
      await PetAssertions.hasValidSchema(res);
      PetAssertions.responseTimeUnder(duration, 1000);
    });

    await test.step('Get pet', async () => {
      const start = Date.now();

      const res = await service.get(pet.id);

      const duration = Date.now() - start;

      await Logger.logResponse('GET', res);
      console.log(`⏱️ RESPONSE TIME: ${duration}ms`);

      await PetAssertions.success(res);
      await PetAssertions.hasValidSchema(res);
      PetAssertions.responseTimeUnder(duration, 1000);
    });

    await test.step('Update pet', async () => {
      const start = Date.now();

      const res = await service.update({ ...pet, name: 'updated-dog' });

      const duration = Date.now() - start;

      await Logger.logResponse('UPDATE', res);
      console.log(`⏱️ RESPONSE TIME: ${duration}ms`);

      await PetAssertions.success(res);
      PetAssertions.responseTimeUnder(duration, 1000);
    });

    await test.step('Delete pet', async () => {
      const start = Date.now();

      const res = await service.delete(pet.id);

      const duration = Date.now() - start;

      await Logger.logResponse('DELETE', res);
      console.log(`⏱️ RESPONSE TIME: ${duration}ms`);

      await PetAssertions.success(res);
      PetAssertions.responseTimeUnder(duration, 1000);
    });

    await test.step('Verify deletion', async () => {
      const start = Date.now();

      const res = await service.get(pet.id);

      const duration = Date.now() - start;

      await Logger.logResponse('VERIFY DELETE', res);
      console.log(`⏱️ RESPONSE TIME: ${duration}ms`);

      await PetAssertions.notFound(res);
      PetAssertions.responseTimeUnder(duration, 1000);
    });
  });

  test('❌ Get non-existing pet @negative', async ({ request }) => {
    const service = new PetService(new PetClient(request));

    const start = Date.now();
    const res = await service.get(999999999);
    const duration = Date.now() - start;

    await Logger.logResponse('GET NON-EXISTING', res);
    console.log(`⏱️ RESPONSE TIME: ${duration}ms`);

    await PetAssertions.notFound(res);
    PetAssertions.responseTimeUnder(duration, 1000);
  });

  test('❌ Delete non-existing pet @negative', async ({ request }) => {
    const service = new PetService(new PetClient(request));

    const start = Date.now();
    const res = await service.delete(999999999);
    const duration = Date.now() - start;

    await Logger.logResponse('DELETE NON-EXISTING', res);
    console.log(`⏱️ RESPONSE TIME: ${duration}ms`);

    await PetAssertions.notFound(res);
    PetAssertions.responseTimeUnder(duration, 1000);
  });

  test('❌ Invalid create (soft validation) @negative', async ({ request }) => {
    const client = new PetClient(request);

    const start = Date.now();
    const res = await client.createPet(PetFactory.invalid());
    const duration = Date.now() - start;

    const body = await res.json();

    console.log('\n📌 INVALID CREATE');
    console.log('➡️ STATUS:', res.status());
    console.log('➡️ BODY:', body);
    console.log(`⏱️ RESPONSE TIME: ${duration}ms`);
    console.log('⚠️ API accepted invalid payload and generated defaults');

    expect(body).toHaveProperty('id');
    expect(body).not.toHaveProperty('name');
    expect(body.photoUrls.length).toBe(0);

    PetAssertions.responseTimeUnder(duration, 1000);
  });

});