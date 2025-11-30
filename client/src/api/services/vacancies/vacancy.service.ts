import { api } from '../api';
import { Vacancy } from '../../../types';

export const getVacancies = async (): Promise<Vacancy[]> => {
  const { data } = await api.get<Vacancy[]>('/vacancies');
  return data.filter(v => !v.deadline || new Date(v.deadline) > new Date());
};

export const getAllVacancies = async (): Promise<Vacancy[]> => {
  const { data } = await api.get<Vacancy[]>('/vacancies');
  return data;
};

export const createVacancy = async (vacancy: Omit<Vacancy, 'id' | 'createdAt'>): Promise<Vacancy> => {
  const { data } = await api.post<Vacancy>('/vacancies', vacancy);
  return data;
};

export const deleteVacancy = async (id: number): Promise<void> => {
  await api.delete(`/vacancies/${id}`);
};