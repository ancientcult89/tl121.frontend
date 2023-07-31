import {CONCRETE_GRADE_ROUTE, GRADE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "./utils/consts";
import Auth from "./pages/Auth";

export const authRoutes = [
    // {
    //     path: GRADE_ROUTE,
    //     Component: Admin,
    // },
    // {
    //     path: CONCRETE_GRADE_ROUTE,
    //     Component: Basket,
    // },
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
];