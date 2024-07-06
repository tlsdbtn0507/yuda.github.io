import { RouterProvider } from 'react-router-dom';
import router from './router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {

  console.log(process.env.NODE_ENV)
  const queryClient = new QueryClient();

  return (
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}/>
      </QueryClientProvider>
  )
}


export default App;
