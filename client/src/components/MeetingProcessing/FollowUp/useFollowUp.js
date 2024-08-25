import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../../index";
import useHttpErrorHandling from "../../../hooks/useHttpErrorHandling";
import {useNavigate, useSearchParams} from "react-router-dom";
import {getFollowUp, sendFollowUp} from "../../../http/meetingApi";
import {MEETING_ROUTE} from "../../../utils/consts";


const useFollowUp = () => {
    const {
        httpBadRequestResponseError,
        httpNotFoundRequestResponseError,
        executeErrorHandlers,
    } = useHttpErrorHandling();

    const navigate = useNavigate();
    const {locale} = useContext(Context);
    const [followUp, setFollowUp] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getFollowUp(searchParams.get('meetingId'), searchParams.get('personId')).then(data => setFollowUp(data));
    }, []);

    const sendingFollowUpHandler = () => {
        setIsLoading(true);
        let formData = {
            "meetingId": searchParams.get('meetingId'),
            "personId": searchParams.get('personId'),
        }
        sendFollowUp(formData)
            .then(r => navigate(MEETING_ROUTE))
            .catch(e => {
                executeErrorHandlers(e);
            })
            .finally(() => setIsLoading(false));
    }

    return {
        locale,
        followUp,
        sendingFollowUpHandler,
        httpNotFoundRequestResponseError,
        httpBadRequestResponseError,
        isLoading,
    };
};

export default useFollowUp;