import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Alert, Button, Popconfirm, Space, Spin, Table} from "antd";
import {ADD_MODAL, EDIT_MODAL} from "../../utils/consts";
import {Context} from "../../index";
import {deleteProject, getProjectList} from "../../http/projectApi";
import ProjectModal from "../modals/ProjectModal";
import {unauthRedirect} from "../../utils/unauthRedirect";
import {notFoundHttpRequestHandler} from "../../utils/notFoundHttpRequestHandler";

const { Column } = Table;

const ProjectList = observer(() => {
    const {project, locale} = useContext(Context);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [needUpdate, setNeedUpdate] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [httpNotFoundRequestResponseError, setHttpNotFoundRequestResponseError] = useState(null);

    useEffect(() => {
        getProjects();
        setIsLoading(false);
    }, [needUpdate])

    function getProjects() {
        getProjectList()
            .then(data => project.setProjects(data))
            .catch(e => {
                unauthRedirect(e);
            })
    }

    function delProject(projectId) {
        setIsLoading(true);
        deleteProject(projectId)
            .then(() => getProjects())
            .catch(e => {
                unauthRedirect(e);
                setHttpNotFoundRequestResponseError(notFoundHttpRequestHandler(e));
            })
            .finally(() => setIsLoading(false));
    }

    return (
        <div>
            <Button
                type={"primary"}
                onClick={() => {
                    setModalType(ADD_MODAL);
                    setModalVisible(true);
                    setSelectedProjectId(null);
                    setIsLoading(true);
                }}
            >
                {locale.locale.Project.Add}
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
                <Table dataSource={project.projects} rowKey={(record) => record.projectTeamId } style={{marginTop: 20}}>
                    <Column title={locale.locale.Project.ProjectName} dataIndex="projectTeamName" key="projectName"/>
                    <Column
                        title={locale.locale.Action}
                        key="action"
                        render={(record) => (
                            <Space size="middle">
                                <a onClick={() => {
                                    setModalType(EDIT_MODAL);
                                    setSelectedProjectId(record.projectTeamId);
                                    setIsLoading(true);
                                    setModalVisible(true);
                                }}>
                                    {locale.locale.Edit}
                                </a>
                                <Popconfirm
                                    title={locale.locale.Project.DeleteTitle}
                                    description={locale.locale.Project.DeleteConfirmation}
                                    onConfirm={() => delProject(record.projectTeamId)}
                                    okText={locale.locale.OK}
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
                <ProjectModal
                    modalType={modalType}
                    open={modalVisible}
                    onCancel={() => {
                        setNeedUpdate(!needUpdate);
                        setIsLoading(false);
                        setModalVisible(false);
                    }}
                    projectId={modalVisible ? selectedProjectId : null}
                />
            }
        </div>
    );
});

export default ProjectList;