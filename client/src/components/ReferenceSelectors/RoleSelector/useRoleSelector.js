import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../../index";
import {unauthRedirect} from "../../../utils/unauthRedirect";
import {getProjectList} from "../../../http/projectApi";
import {getRoleList} from "../../../http/roleApi";

const useRoleSelector = (onSelect) => {
    const {role, locale} = useContext(Context);
    const [roleLoaded, setRoleLoaded] = useState(false);
    const [roleDropdownItems,setRoleDropdownItems] = useState([]);

    useEffect(() => {
        getRoleList()
            .then(data => {
                role.setRoles(data);
            })
            .catch(e => {
                unauthRedirect(e);
            })
            .finally(() => {
                const items = [];
                role.roles.map((role) => {
                    items.push({
                        label: (
                            <div onClick={() => onSelect(role.roleId)}>
                                {role.roleName}
                            </div>
                        ),
                        key: role.roleId
                    });
                });
                setRoleDropdownItems(items);
                setRoleLoaded(true);
            });
    }, []);

    return {
        locale,
        roleLoaded,
        roleDropdownItems,
    };
};

export default useRoleSelector;