import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Association from './pages/Association';
import Missions from './pages/Missions';
import Contact from './pages/Contact';
import Donation from './pages/Donation';
import MentionsLegales from './pages/MentionsLegales';

// Routes de l'application
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'association',
        element: <Association />,
      },
      {
        path: 'missions',
        element: <Missions />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'don',
        element: <Donation />,
      },
      {
        path: 'mentions-legales',
        element: <MentionsLegales />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
