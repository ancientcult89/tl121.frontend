import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {useNavigate, useSearchParams} from "react-router-dom";
import {getPerson} from "../http/personApi";
import {getPrevNotesAndFoals} from "../http/meetingApi";
import {Button, Divider} from "antd";
import {Context} from "../index";
import MeetingNotes from "../components/MeetingProcessing/MeetingNotes/MeetingNotes";
import MeetingGoals from "../components/MeetingProcessing/MeetingGoals/MeetingGoals";
import {MEETING_FOLLOWUP_ROUTE} from "../utils/consts";
import {unauthRedirect} from "../utils/unauthRedirect";
import TaskList from "../components/References/TaskList";

const MeetingProcessing = () => {
    const {locale} = useContext(Context);
    const [personFullName, setPersonFullName] = useState('');
    const [previousNotesAndGoals, setPreviousNotesAndGoals] = useState('');
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        getPerson(searchParams.get('personId'))
            .then(data => {
                    setPersonFullName(data.lastName + ' ' + data.firstName + ' ' + data.surName);
            })
            .catch(e => {
                unauthRedirect(e);
            });

        getPrevNotesAndFoals(searchParams.get('meetingId'), searchParams.get('personId'))
            .then(data => setPreviousNotesAndGoals(data))
            .catch(e => {
                unauthRedirect(e);
            });
    }, [])

    return (
        <div>
            <h3>{personFullName}</h3>
            <Button
                type={"primary"}
                style={{backgroundColor: "green"}}
                onClick={() => navigate(MEETING_FOLLOWUP_ROUTE  + '/?meetingId=' + searchParams.get('meetingId') + '&personId=' + searchParams.get('personId'))}
            >
                {locale.locale.Meeting.ProcessingContent.GenerateFollowUp}
            </Button>
            <Divider dashed />
            <div>
                <pre>{previousNotesAndGoals}</pre>
            </div>
            <TaskList personId={searchParams.get('personId')} showPersonField={false} currentMeetingId={searchParams.get('meetingId')}/>
            <Divider dashed>{locale.locale.Meeting.Notes.Notes}</Divider>
            <MeetingNotes meetingId={searchParams.get('meetingId')}/>
            <Divider dashed>{locale.locale.Meeting.Goals.Goals}</Divider>
            <MeetingGoals meetingId={searchParams.get('meetingId')}/>
        </div>
    );
};

export default observer(MeetingProcessing);