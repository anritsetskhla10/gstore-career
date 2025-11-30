import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getVacancies, getAllVacancies, createVacancy, deleteVacancy } from '../../services/vacancies/vacancy.service';
import { seedDatabase } from '../../services/system/system.service';
import { Vacancy } from '../../../types';

// public vacancies hook (filtered)
export const useVacancies = () => {
  return useQuery({
    queryKey: ['vacancies'],
    queryFn: getVacancies,
  });
};

// admin panel hook (all vacancies)
export const useAllVacancies = () => {
  return useQuery({
    queryKey: ['admin-vacancies'],
    queryFn: getAllVacancies,
  });
};

// create vacancy
export const useCreateVacancy = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (newVacancy: Omit<Vacancy, 'id' | 'createdAt'>) => createVacancy(newVacancy),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vacancies'] });
      queryClient.invalidateQueries({ queryKey: ['admin-vacancies'] });
    },
  });
};

// delete vacancy
export const useDeleteVacancy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteVacancy(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vacancies'] });
      queryClient.invalidateQueries({ queryKey: ['admin-vacancies'] });
    },
  });
};

// Seeding
export const useSeedDatabase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: seedDatabase,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vacancies'] });
    },
  });
};