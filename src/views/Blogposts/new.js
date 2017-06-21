import React from 'react';
import { Button, Input, Form, withForm } from '../../antd';

const handleFormSubmit = async data => {
    console.log('sending data to api', data);
    // return create('/blogpost', data);
};

const Blogpost = ({ form: { getFieldDecorator, getFieldsValue } }) =>
    <Form
        layout="vertical"
        onSubmit={e => {
            e.preventDefault();
            handleFormSubmit(getFieldsValue());
        }}
    >
        <h1>Create New Blogpost</h1><br />
        <Form.Item label="Title">
            {getFieldDecorator('title')(<Input />)}
        </Form.Item>
        <Button type="primary" htmlType="submit" icon="save">Save</Button>
    </Form>;

export default withForm(Blogpost);
