import React, {useContext, useEffect, useState} from 'react';
import {Button, Space, Table, Popconfirm} from 'antd';
import {Context} from "../index";
import {deleteGrade, getGradeList} from "../http/gradeApi";
import {ADD_MODAL, EDIT_MODAL} from "../utils/consts";
import GradeModal from "./modals/GradeModal";
const { Column } = Table;

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
                                Edit
                            </a>
                            <Popconfirm
                                title="Delete the Grade"
                                description="Are you sure to delete this Grade?"
                                onConfirm={() => {
                                    deleteGrade(record.gradeId).then(() => {
                                        getGradeList().then(data => {
                                            grade.setGrades(data);
                                        });
                                    })
                                }}
                                okText="Yes"
                                cancelText="No"
                            >
                            <a>
                                Delete</a>
                            </Popconfirm>
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