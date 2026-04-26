import { Pet } from '../models/pet.model';

export class PetFactory {
  static create(overrides?: Partial<Pet>): Pet {
    return {
      id: Date.now(),
      name: 'doggie',
      photoUrls: ['test'],
      status: 'available',
      ...overrides
    };
  }

  static invalid(): any {
    return {};
  }
}