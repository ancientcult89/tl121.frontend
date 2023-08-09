import React, {useContext, useEffect, useState} from 'react';
import {Button, Space, Table, Popconfirm, Spin} from 'antd';
import {Context} from "../index";
import {deleteGrade, getGradeList} from "../http/gradeApi";
import {ADD_MODAL, EDIT_MODAL} from "../utils/consts";
import GradeModal from "./modals/GradeModal";
const { Column } = Table;

const GradeList = () => {
    const {grade, locale} = useContext(Context);
    const [modalVisible, setModalVisible] = useState(false)
    const [modalType, setModalType] = useState(null);
    const [selectedGrade, setSelectedGrade] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        getGradeList()
            .then(data => grade.setGrades(data))
            .catch()
            .finally(() => setIsLoading(false));
    }, [])


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
                {locale.locale.Grade.Add}
            </Button>
            <Spin tip={locale.locale.Loading} spinning={isLoading}>
                <Table dataSource={grade.grades} style={{marginTop:20}}>

                    <Column title={locale.locale.Grade.GradeName} dataIndex="gradeName" key="gradeName" />
                    <Column
                        title={locale.locale.Action}
                        key="action"
                        render={(_, record) => (
                            <Space size="middle">
                                <a onClick={() => {
                                    setModalType(EDIT_MODAL);
                                    setModalVisible(true);
                                    setSelectedGrade(record.gradeId);
                                }}>
                                    {locale.locale.Edit}
                                </a>
                                <Popconfirm
                                    title={locale.locale.Grade.DeleteTitle}
                                    description={locale.locale.Grade.DeleteConfirmation}
                                    onConfirm={() => {
                                        deleteGrade(record.gradeId).then(() => {
                                            getGradeList().then(data => {
                                                grade.setGrades(data);
                                            });
                                        })
                                    }}
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
            </Spin>
            <GradeModal
                modalType={modalType}
                open={modalVisible} onCancel={() => setModalVisible(false)}
                gradeId={selectedGrade}
            />
        </div>

    );
};

export default GradeList;