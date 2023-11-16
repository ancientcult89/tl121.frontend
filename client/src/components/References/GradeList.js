import React, {useContext, useEffect, useState} from 'react';
import {Button, Space, Table, Popconfirm, Spin, Alert} from 'antd';
import {Context} from "../../index";
import {deleteGrade, getGradeList} from "../../http/gradeApi";
import {ADD_MODAL, EDIT_MODAL} from "../../utils/consts";
import GradeModal from "../modals/GradeModal";
import {observer} from "mobx-react-lite";
import {unauthRedirect} from "../../utils/unauthRedirect";
import {notFoundHttpRequestHandler} from "../../utils/notFoundHttpRequestHandler";

const { Column } = Table;

const GradeList = observer(() => {
    const {grade, locale} = useContext(Context);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedGradeId, setSelectedGradeId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [httpNotFoundRequestResponseError, setHttpNotFoundRequestResponseError] = useState(null);
    const [needUpdate, setNeedUpdate] = useState(true);

    useEffect(() => {        
        getGrades();
        setIsLoading(false);
    }, [needUpdate])

    function getGrades() {
        getGradeList()
            .then(data => grade.setGrades(data))
            .catch(e => {
                unauthRedirect(e);
            });
    }

    function delGrade(gradeId) {
        setIsLoading(true);
        deleteGrade(gradeId)
            .then(() => getGrades())
            .catch(e => {
                unauthRedirect(e);
                setHttpNotFoundRequestResponseError(notFoundHttpRequestHandler(e));
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    return (
        <div>
            <Button
                type={"primary"}
                onClick={() => {
                    setModalType(ADD_MODAL);
                    setModalVisible(true);
                    setIsLoading(true);
                    setSelectedGradeId(null);
                }}
            >
                {locale.locale.Grade.Add}
            </Button>
            {httpNotFoundRequestResponseError &&
                <div style={{marginTop:5}}>
                    <Alert
                        message={httpNotFoundRequestResponseError}
                        type="error"
                        closable={true}
                        onClick={() => setHttpNotFoundRequestResponseError(null)}
                        showIcon
                    />
                    <p></p>
                </div>
            }
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
                                    setSelectedGradeId(record.gradeId);
                                }}>
                                    {locale.locale.Edit}
                                </a>
                                <Popconfirm
                                    title={locale.locale.Grade.DeleteTitle}
                                    description={locale.locale.Grade.DeleteConfirmation}
                                    onConfirm={() => delGrade(record.gradeId)}
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
            {modalVisible &&
                <GradeModal
                    modalType={modalType}
                    open={modalVisible}
                    onCancel={() => {
                        setNeedUpdate(!needUpdate);
                        setIsLoading(false);
                        setModalVisible(false);
                    }}
                    gradeId={modalVisible ? selectedGradeId : null}
                />
            }
        </div>
    );
});

export default GradeList;