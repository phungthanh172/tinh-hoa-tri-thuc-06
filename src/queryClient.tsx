
import React from 'react';
import { QueryClient as TanstackQueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new TanstackQueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

interface QueryClientProps {
  children: React.ReactNode;
}

export const QueryClient: React.FC<QueryClientProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};
