import { ChakraProvider, theme } from '@chakra-ui/react';
import { Footer, Header } from 'components';
import { HomePage } from 'pages';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import './index.css';

const queryClient = new QueryClient();

function App() {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Header />
        <HomePage />
        <Footer />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
