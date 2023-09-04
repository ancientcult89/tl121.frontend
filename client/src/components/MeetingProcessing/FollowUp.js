import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {useLocation, useNavigate} from "react-router-dom";
import {Button} from "antd";
import {MEETING_FOLLOWUP_ROUTE, MEETING_ROUTE} from "../../utils/consts";
import {Context} from "../../index";
import {getFollowUp, sendFollowUp} from "../../http/meetingApi";

const FollowUp = () => {
    const {state} = useLocation();
    const navigate = useNavigate();
    const {locale} = useContext(Context);
    const [followUp, setFollowUp] = useState('');
    useEffect(() => {
        getFollowUp(state.meetingId, state.personId).then(data => setFollowUp(data));
    }, []);

    const senFolloUpHandler = () => {
        let formData = {
            "meetingId": state.meetingId,
            "personId": state.personId,
        }
        sendFollowUp(formData).then(r => navigate(MEETING_ROUTE));
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