import React from 'react'
import PropTypes from 'prop-types'
import { Layout, Icon, Button, Form, Input } from './antd'

const Login = ({ form: { getFieldDecorator, getFieldsValue }, onLogin }, { router }) =>
    <Layout style={{ textAlign: 'center', padding: '2rem', background: '#404040', minHeight: '100vh' }}>
        <div style={{ background: '#fff', padding: 24, margin: '0 auto', borderRadius: '12px', width: '320px' }}>
            <Form
                onSubmit={e => {
                    e.preventDefault()
                    let { username, password } = getFieldsValue()
                    onLogin(username, password, router)
                }}
            >
                <h1>Admin Login</h1><br />
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your email!' }],
                    })(<Input prefix={<Icon type="mail" style={{ fontSize: 13 }} />} placeholder="Email" />)}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                            type="password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    <Icon type="login" />Log in
                </Button>
            </Form>
        </div>
    </Layout>

Login.contextTypes = {
    router: PropTypes.shape({
        history: PropTypes.shape({
            push: PropTypes.func.isRequired,
            goBack: PropTypes.func.isRequired,
        }).isRequired,
    }).isRequired,
}

export default Form.create()(Login)
