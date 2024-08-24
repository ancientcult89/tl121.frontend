import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../../index";
import {unauthRedirect} from "../../../utils/unauthRedirect";
import {getProjectList} from "../../../http/projectApi";

const useProjectSelector = (onSelect) => {
    const {project, locale} = useContext(Context);
    const [projectLoaded, setProjectLoaded] = useState(false);
    const [projectDropdownItems,setProjectDropdownItems] = useState([]);

    useEffect(() => {
        getProjectList()
            .then(data => {
                project.setProjects(data)
            })
            .catch(e => {
                unauthRedirect(e);
            })
            .finally(() => {
                const items = [];
                project.projects.map((project) => {
                    items.push({
                        label: (
                            <div onClick={() => onSelect(project.projectTeamId)}>
                                {project.projectTeamName}
                            </div>
                        ),
                        key: project.projectTeamId
                    });
                });
                setProjectDropdownItems(items);
                setProjectLoaded(true);
            });
    }, []);

    return {
        locale,
        projectLoaded,
        projectDropdownItems,
    };
};

export default useProjectSelector;