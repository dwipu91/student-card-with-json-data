import { createBrowserRouter } from "react-router-dom";
import Team from "../page/Team";
import Students from "../conponent/students/Students";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Team />,
  },
  {
    path: "/student",
    element: <Students />,
  },
]);

export default router;
