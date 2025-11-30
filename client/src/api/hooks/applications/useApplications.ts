import { useQuery, useMutation } from '@tanstack/react-query';
import { getApplications, submitApplication } from '../../services/application/application.service';
import { ApplicationFilters } from '../../../types';

// applications hook (with filters)
export const useApplications = (filters: ApplicationFilters = {}) => {
  return useQuery({
    queryKey: ['applications', filters],
    queryFn: () => getApplications(filters),
  });
};

// submit application
export const useSubmitApplication = (onSuccessCallback?: () => void) => {
  return useMutation({
    mutationFn: submitApplication,
    onSuccess: () => {
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
};