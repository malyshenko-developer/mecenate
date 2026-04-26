import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'mobx-react';

import { rootStore } from '../stores/rootStore';

const queryClient = new QueryClient();

export const AppProvider = ({ children }: { children: React.ReactNode }) => (
    <Provider rootStore={rootStore}>
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    </Provider>
);