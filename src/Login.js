import React from 'react'
import PropTypes from 'prop-types'
import { Layout, Icon, Button, Form, Input, withForm } from './antd'
import Logo from 'Logo'

const hasErrors = fieldsError => {
    console.log('fieldsError', fieldsError)
    return Object.keys(fieldsError).some(field => fieldsError[field])
}

const Login = withForm(({ form, onLogin }) =>
    <Layout
        style={{
            textAlign: 'center',
            padding: '2rem',
            background: '#404040',
            minHeight: '100vh'
        }}>
        <div
            style={{
                background: '#fff',
                padding: 24,
                margin: '0 auto',
                borderRadius: '12px',
                width: '320px'
            }}>
            <Form
                onSubmit={async e => {
                    e.preventDefault()
                    let { email, password } = form.getFieldsValue()
                    const success = await onLogin(email, password)
                }}>
                <Logo style={{ height: '80px', marginBottom: '10px' }} />
                <h1>Admin Login</h1><br />
                <Form.Item>
                    {form.getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Please input your email!' }]
                    })(
                        <Input
                            prefix={<Icon type="mail" style={{ fontSize: 13 }} />}
                            placeholder="Email"
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    {form.getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }]
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                            type="password"
                            placeholder="Password"
                        />
                    )}
                </Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    disabled={hasErrors(form.getFieldsError())}>
                    <Icon type="login" />Log in
                </Button>
            </Form>
        </div>
    </Layout>
)

Login.propTypes = {
    onLogin: PropTypes.func.isRequired
}

export default Login
