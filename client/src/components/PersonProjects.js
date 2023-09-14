import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {getPersonList} from "../http/personApi";
import { Space, Spin, Table} from "antd";
import Column from "antd/es/table/Column";
import {getPersonProjects} from "../http/projectApi";

const PersonProjects = () => {
    const {locale} = useContext(Context);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [needUpdate, setNeedUpdate] = useState(true);
    const [items, setItems] = useState(null);
    const [personProjects, setPersonProjects] = useState([]);

    useEffect(  () => {
        getPersonList()
            .then(async data => {
                let personProjectsTmp = [];
                await Promise.all(data.map(async person => {
                    await getPersonProjects(person.personId).then(projects => {
                        let tmp = {
                            personId: person.personId,
                            personName: person.lastName + ' ' + person.firstName,
                            projects: projects,
                            projectsAsString: projects.map(project => project.projectTeamName).join('; '),
                        }
                        personProjectsTmp.push(tmp);
                    })
                }));
                setItems(personProjectsTmp);
                setIsLoading(false);
            });

    }, [needUpdate])

    return (
        <div>
            <Spin tip={locale.locale.Loading} spinning={isLoading}>
                <Table dataSource={items} rowKey={(record) => record.personId } style={{marginTop: 20}}>
                    <Column title={locale.locale.PersonProject.Person} dataIndex="personName" key="personName"/>
                    <Column title={locale.locale.PersonProject.Projects} dataIndex="projectsAsString" key="projectsAsString"/>
                    <Column
                        title={locale.locale.Action}
                        key="action"
                        render={(record) => (
                            <Space size="middle">
                                <a onClick={() => {
                                    setSelectedPerson(record.personId);
                                    setIsLoading(true);
                                }}>
                                    {locale.locale.Edit}
                                </a>
                            </Space>
                        )}
                    />
                </Table>
            </Spin>
        </div>
    );
};

export default observer(PersonProjects);