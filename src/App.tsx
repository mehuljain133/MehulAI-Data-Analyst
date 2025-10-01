import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './Router'; // Import the routes
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <Router>
      <AppRoutes />
    </Router>
    </QueryClientProvider>
  );
};

export default App;
