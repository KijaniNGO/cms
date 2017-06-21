import React from 'react'
import { gql, graphql, compose } from 'react-apollo'
import { Button, Input, Form, withForm } from '../../antd'

const withBlogpostData = graphql(
    gql` query getBlogpost($slug: String!) {
        blogpost: Blogpost(slug: $slug) {
            id
            title
            date: createdAt
            author {
                id
                firstName
            }
        }
    }`,
    {
        options: ({ slug }) => ({ variables: { slug } }),
    }
)

const Blogpost = ({
    onSaveBlogpost,
    data: { loading, blogpost },
    form: { getFieldDecorator, getFieldsValue },
}) =>
    <Form
        layout="vertical"
        onSubmit={e => {
            e.preventDefault()
            const data = getFieldsValue()
            console.log('saving', data)
            onSaveBlogpost(data)
        }}
    >
        <h1>Edit '{blogpost && blogpost.title}'</h1><br />
        <pre>{JSON.stringify(blogpost, null, 4)}</pre>
        <Form.Item label="Title">
            {getFieldDecorator('title')(<Input />)}
        </Form.Item>
        <Button type="primary" htmlType="submit" icon="save">Save</Button>
    </Form>

export default compose(withBlogpostData, withForm)(Blogpost)
