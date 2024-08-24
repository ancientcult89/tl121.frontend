import {observer} from "mobx-react-lite";
import { Button, Form, Modal, Popconfirm, Row, Space, Table} from "antd";
import Column from "antd/es/table/Column";
import ProjectSelector from "../../ReferenceSelectors/ProjectSelector/ProjectSelector";
import BackEndErrorBox from "../../Form/ErrorBox/BackEndErrorBox";
import ErrorBox from "../../Form/ErrorBox/ErrorBox";
import usePersonProjectsModal from "./usePersonProjectsModal";

const PersonProjectsModal = (props) => {
    const {
        open,
        onCancel,
        person,
    } = props;

    const {
        locale,
        handleOk,
        httpNotFoundRequestResponseError,
        httpBadRequestResponseError,
        selectProjectTypeHandler,
        selectedProjectName,
        errorType,
        projects,
        delPersonProject,
        personNameError,
    } = usePersonProjectsModal(props);

    return (
        <Modal
            title={locale.locale.Project.Add}
            open={open}
            onOk={onCancel}
            onCancel={onCancel}
        >
            <BackEndErrorBox
                httpBadRequestResponseError={httpBadRequestResponseError}
                httpNotFoundRequestResponseError={httpNotFoundRequestResponseError}
            />
            <Form
                labelCol={{ span: 8 }}
            >
                <Row style={{marginTop:20}}>
                    <Button
                        type={"primary"}
                        onClick={handleOk}
                        style={{marginRight:5}}
                    >
                        {locale.locale.PersonProject.Add}
                    </Button>
                    <ProjectSelector
                        onSelect={selectProjectTypeHandler}
                        selectedProjectName={selectedProjectName}
                    />
                </Row>
            </Form>
            <ErrorBox error={personNameError} errorType={errorType} closable/>
            <Table dataSource={projects} rowKey={(record) => record.projectTeamId }>
                <Column title={locale.locale.Project.ProjectName} dataIndex="projectTeamName" key="1" />
                <Column
                    title={locale.locale.Action}
                    key="2"
                    render={(record) => (
                        <Space size="middle">
                            <Popconfirm
                                title={locale.locale.Project.DeleteTitle}
                                description={locale.locale.Project.DeleteConfirmation}
                                onConfirm={() => {
                                    delPersonProject(person.personId, record.projectTeamId);
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
        </Modal>
    );
};

export default observer(PersonProjectsModal);