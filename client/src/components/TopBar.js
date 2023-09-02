import React, {useContext} from 'react';
import {Button, Col, Row} from "antd";
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, VERSION} from "../utils/consts";
import {observer} from "mobx-react-lite";

const TopBar = observer(() => {
    const {locale, user} = useContext(Context)
    const navigate = useNavigate();

    const logOut = () => {
        localStorage.setItem('token', '');
        user.setIsAuth(false);
        user.setUser(null);
        navigate(LOGIN_ROUTE);
    }
    const marginTopButtons = 8;
    const signIn = () => {
        navigate(LOGIN_ROUTE);
    }

    return (
        <div style={{background:"rgb(0, 33, 64)", height: 47}}>
            <Row>
                <Col span={4} >
                    <div style={{color:"white", fontSize: "25px", marginLeft: 5, marginTop: 5} } align="right">
                        TeamLead Helper ({VERSION})
                    </div>
                </Col>
                <Col span={19}>
                    <div align="right">
                        {user.isAuth &&
                            <Button style={{marginTop: marginTopButtons, marginLeft: 5}}  onClick={logOut}>{locale.locale.LogOut}</Button>
                        }
                        {!user.isAuth &&
                            <div>
                                <Button
                                    style={{marginTop: marginTopButtons, marginLeft: 5}}
                                    onClick={signIn}
                                >
                                    {locale.locale.SignIn}
                                </Button>
                                <Button style={{marginTop: marginTopButtons, marginLeft: 5}}>
                                    {locale.locale.Register}
                                </Button>
                            </div>
                        }
                    </div>
                </Col>
            </Row>
        </div>
    );
});

export default TopBar;