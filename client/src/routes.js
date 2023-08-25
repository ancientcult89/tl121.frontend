import {GRADE_ROUTE, LOGIN_ROUTE, ONE_TWO_ONE_DEADLINES_ROUTE, PERSON_ROUTE, REGISTRATION_ROUTE} from "./utils/consts";
import Auth from "./pages/Auth";
import GradeList from "./components/GradeList";
import PersonList from "./components/PersonList";
import OneToOneDeadLineList from "./components/OneToOneDeadLineList";

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
    {
        path: PERSON_ROUTE,
        Component: PersonList
    },
    {
        path: ONE_TWO_ONE_DEADLINES_ROUTE,
        Component: OneToOneDeadLineList
    },
    {
        path: ONE_TWO_ONE_DEADLINES_ROUTE,
        Component: OneToOneDeadLineList
    },
];