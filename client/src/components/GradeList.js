import React, {useContext, useEffect, useState} from 'react';
import {Button, Space, Table, Tag} from 'antd';
import {Context} from "../index";
import {getGradeList} from "../http/gradeApi";
import {ADD_MODAL, EDIT_MODAL} from "../utils/consts";
import GradeModal from "./modals/GradeModal";
const { Column } = Table;
const dataNew = [
    {
        key: '1',
        gradeName: 'Junior',
        lastName: 'Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        gradeName: 'Jim',
        lastName: 'Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        gradeName: 'Joe',
        lastName: 'Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];
const GradeList = () => {
    const {grade} = useContext(Context);
    const [modalVisible, setModalVisible] = useState(false)
    const [modalType, setModalType] = useState(null);
    const [selectedGrade, setSelectedGrade] = useState(null);
    useEffect(() => {
        getGradeList().then(data => {
            grade.setGrades(data);
        });
    }, [grade])


    return (
        <div>
            <Button
                type={"primary"}
                onClick={() => {
                    setModalType(ADD_MODAL);
                    setModalVisible(true);
                    setSelectedGrade(null);
                }}
            >
                    Add Grade
            </Button>
            <Table dataSource={grade.grades} style={{marginTop:20}}>

                <Column title="Grade Name" dataIndex="gradeName" key="key" />
                <Column
                    title="Action"
                    key="action"
                    render={(_, record) => (
                        <Space size="middle">
                            <a onClick={() => {
                                setModalType(EDIT_MODAL);
                                setModalVisible(true);
                                setSelectedGrade(record.gradeId);
                            }}>
                                Edit {/*record.gradeName*/}
                            </a>
                            <a>Delete</a>
                        </Space>
                    )}
                />
            </Table>
            <GradeModal
                modalType={modalType}
                open={modalVisible} onCancel={() => setModalVisible(false)}
                gradeId={selectedGrade}
            />
        </div>

    );
};

export default GradeList;