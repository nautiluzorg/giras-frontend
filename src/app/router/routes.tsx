import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import ExamListPage from "@/domains/assessment/exam/pages/ExamListPage";
import ExamDetailPage from "@/domains/assessment/exam/pages/ExamDetailPage";
import AttemptPage from "@/domains/assessment/attempt/pages/AttemptPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <div>Dashboard Giras</div>,
      },
      {
        path: "exams",
        element: <ExamListPage />,
      },
      {
        path: "exams/:id",
        element: <ExamDetailPage />,
      },

      {
        path: "attempts/:attemptId",
        element: <AttemptPage />,
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
