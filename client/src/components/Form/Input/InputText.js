import React from 'react';
import {Alert, Form, Input} from "antd";

const InputText = ({ onChange, value, error, localisation }) => {

    return (
        <div>
            {error &&
                <div>
                    <Alert
                        message={error}
                        type="error"
                        showIcon
                    />
                    <p></p>
                </div>
            }
            <Form.Item label={localisation}>
                <Input
                    value={value}
                    onChange={e => {onChange(e.target.value)}}
                />
            </Form.Item>
        </div>
    );
};

export default InputText;