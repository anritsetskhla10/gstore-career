import { api } from '../api';

export const seedDatabase = async (): Promise<void> => {
  await api.post('/seed');
};