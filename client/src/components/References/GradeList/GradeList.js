import React, { useEffect } from 'react';
import {Button, Space, Table, Popconfirm, Spin} from 'antd';
import {ADD_MODAL, EDIT_MODAL} from "../../../utils/consts";
import GradeModal from "../../modals/GradeModal/GradeModal";
import {observer} from "mobx-react-lite";
import withHttpErrorHandling from "../../../utils/withHttpErrorHandling";
import BackEndErrorBox from "../../Form/ErrorBox/BackEndErrorBox";
import useGradeList from "./useGradeList";

const { Column } = Table;

const GradeList = observer((props) => {
    const {
        httpBadRequestResponseError,
        httpNotFoundRequestResponseError,
        executeErrorHandlers,
        clearBackendErrors,
    } = props;

    const {
        locale,
        getGrades,
        delGrade,
        needUpdate,
        setIsLoading,
        setModalType,
        setModalVisible,
        setSelectedGradeId,
        modalType,
        modalVisible,
        selectedGradeId,
        isLoading,
        grade,
        setNeedUpdate,
    } = useGradeList(executeErrorHandlers, clearBackendErrors);

    useEffect(() => {        
        getGrades();
        setIsLoading(false);
    }, [needUpdate])


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
            <BackEndErrorBox
                httpBadRequestResponseError={httpBadRequestResponseError}
                httpNotFoundRequestResponseError={httpNotFoundRequestResponseError}
            />
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

export default withHttpErrorHandling(GradeList);