import { PetClient } from '../client/pet.client';
import { Pet } from '../models/pet.model';

export class PetService {
  constructor(private client: PetClient) {}

  create(pet: Pet) {
    return this.client.createPet(pet);
  }

  get(id: number) {
    return this.client.getPet(id);
  }

  update(pet: Pet) {
    return this.client.updatePet(pet);
  }

  delete(id: number) {
    return this.client.deletePet(id);
  }
}