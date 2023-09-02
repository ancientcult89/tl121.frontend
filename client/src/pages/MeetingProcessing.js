import React, {useRef, useState} from 'react';
import {observer} from "mobx-react-lite";
import {useLocation} from "react-router-dom";
import {getPerson} from "../http/personApi";

const MeetingProcessing = () => {
    const {state} = useLocation()
    const [personFullName, setPersonFullName] = useState('');
    getPerson(state.personId)
        .then(data => {
            setPersonFullName(data.lastName + ' ' + data.firstName + ' ' + data.surName);
        })
    console.log(personFullName)

    return (
        <div>
            <h3>{personFullName}</h3>
            {state.meetingId + ' ' + state.personId}
        </div>
    );
};

export default observer(MeetingProcessing);