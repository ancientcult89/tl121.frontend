import {observer} from "mobx-react-lite";
import TextArea from "antd/es/input/TextArea";
import {Button, Checkbox, Popconfirm, Space, Table} from "antd";
import Column from "antd/es/table/Column";
import useMeetingNotes from "./useMeetingNotes";

const MeetingNotes = ({meetingId}) => {
    const {
        locale,
        notes,
        onSelectEditedNoteHandle,
        deleteNoteHandle,
        setNoteText,
        noteText,
        noteFeedbackState,
        setNoteFeedbackState,
        isEditedNote,
        addNoteHandle,
        editNoteHandle,
    } = useMeetingNotes(meetingId);

    return (
        <div>
            <Table dataSource={notes} rowKey={(record) => record.meetingNoteId} pagination={false}>
                <Column
                    title={locale.locale.Meeting.Notes.Note}
                    key={"1"}
                    render={(record) => (
                        <div>{record.meetingNoteContent}</div>
                    )}
                />
                <Column
                    title={locale.locale.Meeting.PartOfFollowUp}
                    key={"2"}
                    render={(record) => (
                        <Checkbox checked={record.feedbackRequired}></Checkbox>
                    )}
                />
                <Column
                    title={locale.locale.Action}
                    key={"3"}
                    render={(record) => (
                        <Space size="middle">
                            <a onClick={() => onSelectEditedNoteHandle(record.meetingNoteId, record.meetingNoteContent, record.feedbackRequired)}>
                                {locale.locale.Edit}
                            </a>
                            <Popconfirm
                                title={locale.locale.Meeting.Notes.DeleteTitle}
                                description={locale.locale.Meeting.Notes.DeleteConfirmation}
                                onConfirm={() => deleteNoteHandle(record.meetingId, record.meetingNoteId)}
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
            <TextArea rows={2} onChange={(e) => {setNoteText(e.target.value)}} value={noteText}/>
            <div style={{marginTop: 5}}>
                <Checkbox
                    checked={noteFeedbackState}
                    onChange={(e) => setNoteFeedbackState(e.target.checked)}
                >
                    {locale.locale.Meeting.PartOfFollowUp}
                </Checkbox>
            </div>
            {!isEditedNote &&
                <Button type={"primary"} style={{marginTop: 5}} onClick={() => addNoteHandle()}>
                    {locale.locale.Meeting.Notes.AddNote}
                </Button>
            }
            {isEditedNote &&
                <Button type={"primary"} style={{marginTop: 5, backgroundColor:"green"}} onClick={() => editNoteHandle()}>
                    {locale.locale.Meeting.Notes.EditNote}
                </Button>
            }
        </div>
    );
};

export default observer(MeetingNotes);