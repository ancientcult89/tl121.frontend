import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {useLocation} from "react-router-dom";
import {getPerson} from "../http/personApi";
import {getPrevNotesAndFoals} from "../http/meetingApi";

const MeetingProcessing = () => {
    const {state} = useLocation()
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
            <div>
                <pre>{previousNotesAndGoals}</pre>
            </div>
        </div>
    );
};

export default observer(MeetingProcessing);