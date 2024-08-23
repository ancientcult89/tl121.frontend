import React, {useContext, useState} from "react";
import {Context} from "../../../index";
import {getGradeList} from "../../../http/gradeApi";
import {unauthRedirect} from "../../../utils/unauthRedirect";

const useGradeSelector = (onSelect) => {
    const {grade, locale} = useContext(Context);
    const [gradeLoaded, setGradeLoaded] = useState(false);
    const [gradeDropdownItems,setGradeDropdownItems] = useState([]);

    function getData() {
        getGradeList()
            .then(data => {
                grade.setGrades(data);
            })
            .catch(e => {
                unauthRedirect(e);
            })
            .finally(() => {
                const items = [];
                grade.grades.map((grade) => {
                    items.push({
                        label: (
                            <div onClick={() => onSelect(grade.gradeId)}>
                                {grade.gradeName}
                            </div>
                        ),
                        key: grade.gradeId
                    });
                });
                setGradeDropdownItems(items);
                setGradeLoaded(true);
            });
    }

    return {
        locale,
        gradeLoaded,
        gradeDropdownItems,
        getData,
    };
};

export default useGradeSelector;