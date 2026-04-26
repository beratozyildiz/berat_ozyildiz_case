import { APIRequestContext, APIResponse } from '@playwright/test';
import { Pet } from '../models/pet.model';

export class PetClient {
  constructor(private request: APIRequestContext) {}

  private readonly baseURL = 'https://petstore.swagger.io/v2';

  createPet(data: Pet): Promise<APIResponse> {
    return this.request.post(`${this.baseURL}/pet`, { data });
  }

  getPet(id: number): Promise<APIResponse> {
    return this.request.get(`${this.baseURL}/pet/${id}`);
  }

  updatePet(data: Pet): Promise<APIResponse> {
    return this.request.put(`${this.baseURL}/pet`, { data });
  }

  deletePet(id: number): Promise<APIResponse> {
    return this.request.delete(`${this.baseURL}/pet/${id}`);
  }
}