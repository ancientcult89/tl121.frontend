import React, {useContext, useEffect, useState} from 'react';
import {Button, Space, Table, Popconfirm, Spin} from 'antd';
import {Context} from "../../index";
import {deleteGrade, getGradeList} from "../../http/gradeApi";
import {ADD_MODAL, EDIT_MODAL} from "../../utils/consts";
import GradeModal from "../modals/GradeModal";
import {observer} from "mobx-react-lite";

const { Column } = Table;

const GradeList = observer(() => {
    const {grade, locale} = useContext(Context);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedGrade, setSelectedGrade] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [needUpdate, setNeedUpdate] = useState(true);

    useEffect(() => {        
        getGradeList()
            .then(data => grade.setGrades(data))
            .catch()
            .finally(() => setIsLoading(false));            
    }, [needUpdate])

    return (
        <div>
            <Button
                type={"primary"}
                onClick={() => {
                    setModalType(ADD_MODAL);
                    setModalVisible(true);
                    setIsLoading(true);
                    setSelectedGrade(null);
                }}
            >
                {locale.locale.Grade.Add}
            </Button>
            <Spin tip={locale.locale.Loading} spinning={isLoading}>
                <Table dataSource={grade.grades} rowKey={(record) => record.gradeId } style={{marginTop:20}}>
                    <Column title={locale.locale.Grade.GradeName} dataIndex="gradeName" key="1" />
                    <Column
                        title={locale.locale.Action}
                        key="2"
                        render={(record) => (
                            <Space size="middle">
                                <a onClick={() => {
                                    setModalType(EDIT_MODAL);
                                    setIsLoading(true);
                                    setModalVisible(true);
                                    setSelectedGrade(record.gradeId);
                                }}>
                                    {locale.locale.Edit}
                                </a>
                                <Popconfirm
                                    title={locale.locale.Grade.DeleteTitle}
                                    description={locale.locale.Grade.DeleteConfirmation}
                                    onConfirm={() => {
                                        setIsLoading(true);
                                        deleteGrade(record.gradeId).then(() => {
                                            getGradeList().then(data => {
                                                grade.setGrades(data);
                                                setNeedUpdate(!needUpdate);
                                            })
                                            .finally(() => setIsLoading(false));
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
            open={modalVisible}
            onCancel={() => {
                setNeedUpdate(!needUpdate);
                setIsLoading(false);
                setModalVisible(false);
            }}
                gradeId={modalVisible ? selectedGrade : null}
            />
        </div>
    );
});

export default GradeList;