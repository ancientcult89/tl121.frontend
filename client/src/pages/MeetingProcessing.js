import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {useLocation, useNavigate} from "react-router-dom";
import {getPerson} from "../http/personApi";
import {getPrevNotesAndFoals} from "../http/meetingApi";
import {Button, Divider} from "antd";
import {Context} from "../index";
import MeetingNotes from "../components/MeetingProcessing/MeetingNotes";
import MeetingGoals from "../components/MeetingProcessing/MeetingGoals";
import {MEETING_FOLLOWUP_ROUTE, MEETING_PROCESSING_ROUTE} from "../utils/consts";

const MeetingProcessing = () => {
    const {state} = useLocation();
    const {locale} = useContext(Context);
    const [personFullName, setPersonFullName] = useState('');
    const [previousNotesAndGoals, setPreviousNotesAndGoals] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getPerson(state.personId)
        .then(data => {
                setPersonFullName(data.lastName + ' ' + data.firstName + ' ' + data.surName);
        })

        getPrevNotesAndFoals(state.meetingId, state.personId).then(data => setPreviousNotesAndGoals(data))
    }, [])

    return (
        <div>
            <h3>{personFullName}</h3>
            <Button
                type={"primary"}
                style={{backgroundColor: "green"}}
                onClick={() => navigate(MEETING_FOLLOWUP_ROUTE, {state: {meetingId: state.meetingId, personId: state.personId}})}
            >
                {locale.locale.Meeting.ProcessingContent.GenerateFollowUp}
            </Button>
            <Divider dashed />
            <div>
                <pre>{previousNotesAndGoals}</pre>
            </div>
            <Divider dashed>{locale.locale.Meeting.Notes.Notes}</Divider>
            <MeetingNotes meetingId={state.meetingId}/>
            <Divider dashed>{locale.locale.Meeting.Goals.Goals}</Divider>
            <MeetingGoals meetingId={state.meetingId}/>
        </div>
    );
};

export default observer(MeetingProcessing);