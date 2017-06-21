import React from 'react';
import { gql, graphql, compose } from 'react-apollo';
import { Button, Input, Form, withForm } from '../../antd';

const withCreateBlogpost = graphql(
    gql` mutation createBlogpost($title: String!) {
        createBlogpost(title: $title) {
            id
            title
            slug
        }
    }`,
    {
        props: ({ mutate, ...props }) => ({
            ...props,
            onCreateBlogpost: ({ title }) => mutate({ variables: { title } }),
        }),
    }
);

const Blogpost = ({ onCreateBlogpost, form: { getFieldDecorator, getFieldsValue } }) =>
    <Form
        layout="vertical"
        onSubmit={e => {
            e.preventDefault();
            onCreateBlogpost(getFieldsValue());
        }}
    >
        <h1>Create New Blogpost</h1><br />
        <Form.Item label="Title">
            {getFieldDecorator('title')(<Input />)}
        </Form.Item>
        <Button type="primary" htmlType="submit" icon="save">Save</Button>
    </Form>;

export default compose(withCreateBlogpost, withForm)(Blogpost);
