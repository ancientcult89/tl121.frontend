import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Row} from "antd";
import {Context} from "../index";
import PersonSelector from "../components/ReferenceSelectors/PersonSelector";
import TaskList from "../components/References/TaskList";

const Tasks = () => {
    const {person} = useContext(Context);

    const selectedPersonHandler = (personId) => {
        person.persons.map(item => {
            if(item.personId === personId)
            {
                person.setSelectedPerson({
                    personId: item.personId,
                    personName: item.lastName + ' ' + item.firstName + ' ' + item.surName
                });
            }
        })
    }

    const clearFilteringTaskList = () => {
        person.setSelectedPerson({
            personId: null,
            personName: ''
        });
    }

    return (
        <div>
            <Row>
                <PersonSelector
                    onSelect={selectedPersonHandler}
                    selectedPersonName={person.selectedPerson.personName}
                    onClear={clearFilteringTaskList}
                    isClearable={true}
                />
            </Row>
            <TaskList personId={person.selectedPerson.personId}/>
        </div>
    );
};

export default observer(Tasks);