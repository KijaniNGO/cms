import React from 'react';
import { gql, withApollo } from 'react-apollo';

// const createUserQuery = gql`
//     mutation ($email: String!, $password: String!) {
//         createUser(authProvider: {
//             email: {
//                 email: $email,
//                 password: $password
//             }
//         }) {
//             id
//         }
//     }
// `

// const deleteUserQuery = gql`
//     mutation ($id: ID!) {
//         deleteUser(id: $id) {
//             id
//         }
//     }
// `

class AuthProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = { authorized: false, loading: true };
        this.login = this.login.bind(this);
    }
    async componentWillMount() {
        const { data } = await this.props.client.query({
            query: gql`
                query {
                    user { id }
                }
            `,
            fetchPolicy: 'network-only',
        });
        if (data.user) {
            this.setState({ authorized: true, loading: false });
        } else {
            this.setState({ authorized: false, loading: false });
        }
    }
    static logout() {
        window.localStorage.removeItem('graphcoolToken');
        window.location.reload();
    }
    async login(email, password, remember) {
        try {
            const { data } = await this.props.client.mutate({
                mutation: gql`
                    mutation ($email: String!, $password: String!) {
                        signinUser(email: {email: $email, password: $password}) {
                            token
                        }
                    }
                `,
                variables: { email, password },
            });
            if (remember) {
                window.localStorage.setItem('graphcoolToken', data.signinUser.token);
            }
            this.setState({ authorized: true });
            return true;
        } catch (e) {
            this.setState({ authorized: false });
            return false;
        }
    }
    render() {
        const Login = this.props.loginComponent;
        const Loading = this.props.loadingComponent;
        if (this.state.loading) {
            return <Loading />;
        } else {
            if (this.state.authorized) {
                return this.props.children;
            } else {
                return <Login onLogin={this.login} />;
            }
        }
    }
}

export default withApollo(AuthProvider);
