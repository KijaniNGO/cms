import React from 'react';
import { gql, graphql } from 'react-apollo';
import { format as formatDate } from 'date-fns';
import { Link } from 'react-router-dom';
import { Table, Modal, Button } from '../../antd';

const onDelete = (blogpost, setBlogposts) => {
    Modal.confirm({
        title: `Do you really want to delete this blogpost?`,
        content: `Deleting the blogpost '${blogpost.title}' cannot be undone.`,
        maskClosable: true,
        iconType: 'exclamation-circle',
        okText: 'Delete',
        onOk() {
            return (async () => {
                // let deleted = await remove(`/blogpost/${blogpost._id}`);
                // let { blogposts } = await get('/blogpost');
                // setBlogposts(blogposts);
                // return deleted;
            })();
        },
        onCancel() {},
    });
};

const onPublish = blogpost => {
    Modal.confirm({
        title: `Do you want to publish this blogpost?`,
        content: `Publishing the blogpost '${blogpost.title}' will make it visible on the internet.`,
        maskClosable: true,
        iconType: 'exclamation-circle',
        okText: 'Publish',
        onOk() {
            return (async () => {
                // let published = await put(`/blogpost/${blogpost._id}`);
                // let { blogposts } = await get('/blogpost');
                // setBlogposts(blogposts);
                // return published;
            })();
        },
        onCancel() {},
    });
};

const blogpostQuery = graphql(gql`
    query {
        blogposts: allBlogposts {
            id
            title
            slug
            date: createdAt
        }
    }
`);

const Blogposts = ({ data: { loading, blogposts } }) =>
    loading
        ? <div>loading</div>
        : <div>
              <h1>Blogposts</h1><br />
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
                                  <span className="ant-divider" />
                                  <a onClick={() => onPublish(blogpost)}>Publish</a>
                                  <span className="ant-divider" />
                                  <a onClick={() => onDelete(blogpost)}>Delete</a>
                              </div>,
                      },
                  ]}
                  dataSource={blogposts.map(blogpost => ({ ...blogpost, key: blogpost.id }))}
                  footer={() =>
                      <div style={{ marginRight: '24px', textAlign: 'right' }}>
                          <Link to="/blogposts/new">
                              <Button type="primary" icon="plus">
                                  New Post
                              </Button>
                          </Link>
                      </div>}
              />
              <br />
          </div>;

Blogposts.defaultProps = {
    blogposts: [],
};

export default blogpostQuery(Blogposts);
