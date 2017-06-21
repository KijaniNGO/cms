import React from 'react'
import { withState, compose } from 'recompose'
import { gql, graphql } from 'react-apollo'
import { format as formatDate } from 'date-fns'
import { Link, withRouter } from 'react-router-dom'
import { Table, Modal, Button, Form, withForm, Input } from '../../antd'

// const PublishBlogpostModal = (blogpost, onPublishBlogpost) => {
//     Modal.confirm({
//         title: `Do you want to publish this blogpost?`,
//         content: `Publishing the blogpost '${blogpost.title}' will make it visible on the internet.`,
//         maskClosable: true,
//         iconType: 'exclamation-circle',
//         okText: 'Publish',
//         onOk: () => onPublishBlogpost({ id: blogpost.id }),
//         onCancel: () => {},
//     })
// }

const DeleteBlogpostModal = (blogpost, onDeleteBlogpost) =>
    Modal.confirm({
        title: `Do you really want to delete this blogpost?`,
        content: `Deleting the blogpost '${blogpost.title}' cannot be undone.`,
        maskClosable: true,
        iconType: 'exclamation-circle',
        okText: 'Delete',
        onOk: () => onDeleteBlogpost({ id: blogpost.id }),
        onCancel: () => {},
    })

const CreateBlogpostModal = withForm(
    ({ visible, onCancel, onCreate, form: { getFieldDecorator, getFieldsValue } }) =>
        <Modal
            visible={visible}
            title="Create New Blogpost"
            okText="Create"
            onCancel={onCancel}
            onOk={() => onCreate(getFieldsValue())}
        >
            <Form layout="vertical">
                <Form.Item label="Give it a Title">
                    {getFieldDecorator('title')(<Input />)}
                </Form.Item>
            </Form>
        </Modal>
)

const blogpostListInfoFragment = gql`
    fragment blogpostListInfo on Blogpost {
        id
        title
        slug
        date: createdAt
    }
`

const blogpostsQuery = gql`
    query {
        blogposts: allBlogposts {
            ...blogpostListInfo
        }
    }
    ${blogpostListInfoFragment}
`

const createBlogpostMutation = gql`
    mutation createBlogpost($title: String!) {
        newBlogpost: createBlogpost(title: $title) {
            ...blogpostListInfo
        }
    }
    ${blogpostListInfoFragment}
`

const deleteBlogpostMutation = gql`
    mutation deleteBlogpost($id: ID!) {
        deletedBlogpost: deleteBlogpost(id: $id) {
            id
        }
    }
`

const withBlogpostsData = graphql(blogpostsQuery)

const withCreateBlogpost = graphql(createBlogpostMutation, {
    props: ({ mutate, ...props }) => ({
        ...props,
        onCreateBlogpost: ({ title }) => mutate({ variables: { title } }),
    }),
    options: {
        update: (proxy, { data: { newBlogpost } }) => {
            let data = proxy.readQuery({ query: blogpostsQuery })
            data.blogposts.push(newBlogpost)
            proxy.writeQuery({ query: blogpostsQuery, data })
        },
    },
})

const withDeleteBlogpost = graphql(deleteBlogpostMutation, {
    props: ({ mutate, ...props }) => ({
        ...props,
        onDeleteBlogpost: ({ id }) => mutate({ variables: { id } }),
    }),
    options: {
        update: (proxy, { data: { deletedBlogpost } }) => {
            let data = proxy.readQuery({ query: blogpostsQuery })
            data.blogposts = data.blogposts.filter(({ id }) => id !== deletedBlogpost.id)
            proxy.writeQuery({ query: blogpostsQuery, data })
        },
    },
})

const withModal = withState('modalVisibility', 'setModalVisibility', false)

const Blogposts = ({
    modalVisibility,
    setModalVisibility,
    onCreateBlogpost,
    onDeleteBlogpost,
    history,
    data: { loading, blogposts },
}) =>
    <div>
        <h1>Blogposts</h1><br />
        <CreateBlogpostModal
            visible={modalVisibility}
            onCancel={() => setModalVisibility(false)}
            onCreate={async ({ title }) => {
                const { data: { newBlogpost } } = await onCreateBlogpost({ title })
                setModalVisibility(false)
                history.push(`/blogposts/${newBlogpost.slug}`)
            }}
        />
        <Table
            pagination={false}
            columns={[
                {
                    title: 'Title',
                    dataIndex: 'title',
                },
                {
                    title: 'Date',
                    dataIndex: 'date',
                    render: date => formatDate(date, 'MMM D, YYYY'),
                },
                {
                    title: 'Action',
                    width: 176,
                    key: 'action',
                    render: (_, blogpost) =>
                        <div>
                            <Link to={`/blogposts/${blogpost.slug}`}>Edit</Link>
                            {/* <span className="ant-divider" />
                            <a onClick={() => PublishBlogpostModal(blogpost, onPublishBlogpost)}>
                                Publish
                            </a> */}
                            <span className="ant-divider" />
                            <a onClick={() => DeleteBlogpostModal(blogpost, onDeleteBlogpost)}>
                                Delete
                            </a>
                        </div>,
                },
            ]}
            dataSource={blogposts && blogposts.map(blogpost => ({ ...blogpost, key: blogpost.id }))}
            footer={() =>
                <div style={{ marginRight: '24px', textAlign: 'right' }}>
                    <Button type="primary" icon="plus" onClick={() => setModalVisibility(true)}>
                        New Post
                    </Button>
                </div>}
        />
        <br />
    </div>

Blogposts.defaultProps = {
    data: { blogposts: [] },
}

export default compose(
    withRouter,
    withModal,
    withBlogpostsData,
    withCreateBlogpost,
    withDeleteBlogpost
)(Blogposts)
