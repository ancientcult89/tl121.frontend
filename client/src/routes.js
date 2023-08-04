import {CONCRETE_GRADE_ROUTE, GRADE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "./utils/consts";
import Auth from "./pages/Auth";
import GradeList from "./components/GradeList";

export const authRoutes = [

];

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth,
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth,
    },
    {
        path: GRADE_ROUTE,
        Component: GradeList,
    },
];