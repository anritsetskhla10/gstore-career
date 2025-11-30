import { api } from '../api';
import { Application, ApplicationFilters } from '../../../types';

export const getApplications = async ({ filter, sort }: ApplicationFilters): Promise<Application[]> => {
  const params = new URLSearchParams();
  if (filter) params.append('vacancyId', filter);
  if (sort) params.append('sort', sort);
  
  const { data } = await api.get<Application[]>(`/applications?${params.toString()}`);
  return data;
};

export const submitApplication = async (formData: FormData): Promise<Application> => {
  const { data } = await api.post<Application>('/apply', formData);
  return data;
};