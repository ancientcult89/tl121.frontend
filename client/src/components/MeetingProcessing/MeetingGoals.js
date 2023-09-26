import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import TextArea from "antd/es/input/TextArea";
import {Button, Popconfirm, Space, Table} from "antd";
import {
    createMeetingGoal, deleteMeetingGoal,
    getMeetingGoals,
    updateMeetingGoal,
} from "../../http/meetingApi";
import Column from "antd/es/table/Column";
import {unauthRedirect} from "../../utils/unauthRedirect";

const MeetingGoals = ({meetingId}) => {
    const {locale} = useContext(Context);
    const [goals, setGoals] = useState([]);
    const [goalText, setGoalText] = useState('');
    const [goalCompleteDescription, setGoalCompleteDescription] = useState('');
    const [editedMeetingGoalId, setEditedMeetingGoalId] = useState(null);
    const [isEditedGoal, setIsEditedGoal] = useState(false)

    useEffect(() => {
        getMeetingGoals(meetingId)
            .then(data => setGoals(data))
            .catch(e => {
                unauthRedirect(e);
            });
    }, []);

    const onSelectEditedGoalHandle = (meetingGoalId, goalContent, completedDescription) => {
        setEditedMeetingGoalId(meetingGoalId);
        setGoalText(goalContent);
        setGoalCompleteDescription(completedDescription)
        setIsEditedGoal(true);
    }

    const editGoalHandle = () => {
        let formData = {
            "meetingGoalDescription": goalText,
            "meetingId": meetingId,
            "meetingGoalId": editedMeetingGoalId,
            "completeDescription": goalCompleteDescription
        }

        updateMeetingGoal(formData).then(updatedGoal => {
            setGoals(goals.map(item => item.meetingGoalId === editedMeetingGoalId ? {...updatedGoal} : item));
        });

        setEditedMeetingGoalId(null);
        setGoalText('')
        setIsEditedGoal(false);
    }

    const deleteGoalHandle = (meetingId, meetingGoalId) => {
        deleteMeetingGoal(meetingId, meetingGoalId)
            .then(() =>
                getMeetingGoals(meetingId)
                    .then(data => setGoals(data))
            );
    }

    const addNoteHandle = () => {
        if(goalText == null || goalText === '')
            return;
        
        let formData = {
            "meetingGoalDescription": goalText,
            "meetingId": meetingId,
            "meetingGoalId": null
        }
        createMeetingGoal(formData).then(newMeetingGoal => {
            setGoals([...goals, newMeetingGoal]);
        })
        setGoalText('');
    }

    return (
        <div>
            <Table dataSource={goals} rowKey={(record) => record.meetingGoalId} pagination={false}>
                <Column
                    title={locale.locale.Meeting.Goals.Goal}
                    key={"1"}
                    render={(record) => (
                        <div>{record.meetingGoalDescription}</div>
                    )}
                />
                <Column
                    title={locale.locale.Action}
                    key={"2"}
                    render={(record) => (
                        <Space size="middle">
                            <a onClick={() => onSelectEditedGoalHandle(record.meetingGoalId, record.meetingGoalDescription, record.completeDescription)}>
                                {locale.locale.Edit}
                            </a>
                            <Popconfirm
                                title={locale.locale.Meeting.Goals.DeleteTitle}
                                description={locale.locale.Meeting.Goals.DeleteConfirmation}
                                onConfirm={() => deleteGoalHandle(record.meetingId, record.meetingGoalId)}
                                okText={locale.locale.Ok}
                                cancelText={locale.locale.NO}
                            >
                                <a>
                                    {locale.locale.Delete}
                                </a>
                            </Popconfirm>
                        </Space>
                    )}
                />
            </Table>
            <div style={{marginTop:5}}/>
            <TextArea rows={2} onChange={(e) => {setGoalText(e.target.value)}} value={goalText}/>
            {!isEditedGoal &&
                <Button type={"primary"} style={{marginTop: 5}} onClick={() => addNoteHandle()}>
                    {locale.locale.Meeting.Goals.AddGoal}
                </Button>
            }
            {isEditedGoal &&
                <Button type={"primary"} style={{marginTop: 5, backgroundColor:"green"}} onClick={() => editGoalHandle()}>
                    {locale.locale.Meeting.Goals.EditGoal}
                </Button>
            }
        </div>
    );
};

export default observer(MeetingGoals);