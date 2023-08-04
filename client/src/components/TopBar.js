import React from 'react';
import {Button, Row} from "antd";

const TopBar = () => {
    return (
        <div style={{background:"black", height: 42}}>
            <Row >
                <div style={{color:"white", fontSize: "20px", marginLeft: 5, marginTop: 5}}>TeamLead Helper</div>
                <Button style={{marginTop: 5, marginLeft: 5}}>Sign in</Button>
                <Button style={{marginTop: 5, marginLeft: 5}}>Register</Button>
                <Button style={{marginTop: 5, marginLeft: 5}}>LogOut</Button>
            </Row>
        </div>
    );
};

export default TopBar;