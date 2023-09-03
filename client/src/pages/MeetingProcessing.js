import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {useLocation} from "react-router-dom";
import {getPerson} from "../http/personApi";
import {getPrevNotesAndFoals} from "../http/meetingApi";
import {Divider} from "antd";
import {Context} from "../index";
import MeetingNotes from "../components/MeetingProcessing/MeetingNotes";
import MeetingGoals from "../components/MeetingProcessing/MeetingGoals";

const MeetingProcessing = () => {
    const {state} = useLocation()
    const {locale} = useContext(Context);
    const [personFullName, setPersonFullName] = useState('');
    const [previousNotesAndGoals, setPreviousNotesAndGoals] = useState('')
    useEffect(() => {
        getPerson(state.personId)
        .then(data => {
                setPersonFullName(data.lastName + ' ' + data.firstName + ' ' + data.surName);
        })

        getPrevNotesAndFoals(state.meetingId, state.personId).then(data => setPreviousNotesAndGoals(data))
        console.log('render')
    }, [])

    return (
        <div>
            <h3>{personFullName}</h3>
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