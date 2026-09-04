import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import AppLayout from '../../components/layout/AppLayout';
import ExamListPage from '../../features/exam/pages/ExamListPage';
import ExamDetailPage from '../../features/exam/pages/ExamDetailPage';
import AttemptPage from '../../features/attempt/pages/AttemptPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <div>Dashboard Giras</div>,
      },
      {
        path: 'exams',
        element: <ExamListPage />,
      },
      {
  path: 'exams/:id',
  element: <ExamDetailPage />,
},

{
  path: 'attempts/:attemptId',
  element: <AttemptPage />,
},






    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}