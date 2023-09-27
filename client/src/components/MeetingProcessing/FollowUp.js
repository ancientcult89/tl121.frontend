import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {useNavigate, useSearchParams} from "react-router-dom";
import {Button} from "antd";
import {MEETING_ROUTE} from "../../utils/consts";
import {Context} from "../../index";
import {getFollowUp, sendFollowUp} from "../../http/meetingApi";
import {unauthRedirect} from "../../utils/unauthRedirect";

const FollowUp = () => {
    const navigate = useNavigate();
    const {locale} = useContext(Context);
    const [followUp, setFollowUp] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        getFollowUp(searchParams.get('meetingId'), searchParams.get('personId')).then(data => setFollowUp(data));
    }, []);

    const senFolloUpHandler = () => {
        let formData = {
            "meetingId": searchParams.get('meetingId'),
            "personId": searchParams.get('personId'),
        }
        sendFollowUp(formData)
            .then(r => navigate(MEETING_ROUTE))
            .catch(e => {
                unauthRedirect(e);
            });
    }

    return (
        <div>
            <pre>{followUp}</pre>
            <Button
                type={"primary"}
                style={{backgroundColor: "green"}}
                onClick={senFolloUpHandler}
            >
                {locale.locale.Meeting.ProcessingContent.SendFollowUp}
            </Button>
        </div>
    );
};

export default observer(FollowUp);