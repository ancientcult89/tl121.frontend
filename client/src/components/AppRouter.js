import React, {useContext} from 'react';
import {
    GRADE_ROUTE,
    LOGIN_ROUTE, MEETING_PROCESSING_ROUTE, MEETING_ROUTE,
    ONE_TWO_ONE_DEADLINES_ROUTE,
    PERSON_ROUTE,
    PROJECT_ROUTE,
    REGISTRATION_ROUTE
} from "../utils/consts";
import GradeList from "./References/GradeList";
import Auth from "../pages/Auth";
import {Route, Routes} from "react-router-dom";
import {Context} from "../index";
import PersonList from "./References/PersonList";
import OneToOneDeadLineList from "./OneToOneDeadLineList";
import ProjectList from "./References/ProjectList";
import MeetingList from "./References/MeetingList";
import MeetingProcessing from "../pages/MeetingProcessing";

const AppRouter = () => {
    const { user } = useContext(Context);

    return (
        <Routes>
            {user.isAuth && (
                <React.Fragment>
                    <Route
                        key={GRADE_ROUTE}
                        path={GRADE_ROUTE}
                        element={<GradeList />}
                        exact
                    />
                    <Route
                        key={PERSON_ROUTE}
                        path={PERSON_ROUTE}
                        element={<PersonList />}
                        exact
                    />
                    <Route
                        key={ONE_TWO_ONE_DEADLINES_ROUTE}
                        path={ONE_TWO_ONE_DEADLINES_ROUTE}
                        element={<OneToOneDeadLineList />}
                        exact
                    />
                    <Route
                        key={PROJECT_ROUTE}
                        path={PROJECT_ROUTE}
                        element={<ProjectList />}
                        exact
                    />
                    <Route
                        key={MEETING_ROUTE}
                        path={MEETING_ROUTE}
                        element={<MeetingList />}
                        exact
                    />
                    <Route
                        key={MEETING_PROCESSING_ROUTE}
                        path={MEETING_PROCESSING_ROUTE}
                        element={<MeetingProcessing />}
                        exact
                    />
                </React.Fragment>
            )}
            {
                <React.Fragment>
                    <Route
                        key={LOGIN_ROUTE}
                        path={LOGIN_ROUTE}
                        element={<Auth />}
                        exact
                    />
                    <Route
                        key={REGISTRATION_ROUTE}
                        path={REGISTRATION_ROUTE}
                        element={<Auth />}
                        exact
                    />
                </React.Fragment>
            }
            {/* автоматически редирект на главную страницу */}
            <Route path="*" element={<Auth />} />
        </Routes>
    );
};

export default AppRouter;