import React from 'react';
import { gql, graphql } from 'react-apollo';

const withBlogpostData = graphql(
    gql`
        query getBlogpost($slug: String!) {
            blogpost: Blogpost(slug: $slug) {
                id
                title
                date: createdAt
                author {
                    id
                    firstName
                }
            }
        }
    `,
    {
        options: ({ slug }) => ({ variables: { slug } }),
    }
);

const Blogpost = ({ data: { loading, blogpost } }) =>
    <div>
        <h1>Edit Blogpost</h1>
        <pre>{JSON.stringify(blogpost, null, 4)}</pre>
    </div>;

export default withBlogpostData(Blogpost);
