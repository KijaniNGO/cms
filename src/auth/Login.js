import React from 'react'
import PropTypes from 'prop-types'
import { Layout, Icon, Button, Form, Input, withForm, Checkbox } from '../antd'
import Logo from '../components/Logo'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = { failed: false }
        this.submit = this.submit.bind(this)
        this.hasErrors = this.hasErrors.bind(this)
    }
    componentDidMount() {
        this.props.form.validateFields()
    }
    hasErrors() {
        const errors = this.props.form.getFieldsError()
        return Object.keys(errors).some(field => errors[field])
    }
    async submit(e) {
        e.preventDefault()
        const { form, onLogin } = this.props
        await form.validateFields(async (err, { email, password, remember }) => {
            if (!err) {
                const success = await onLogin(email, password, remember)
                if (!success) {
                    this.setState({ failed: true })
                    form.resetFields(['password'])
                }
            }
        })
    }
    render() {
        const { form } = this.props
        const emailError = form.isFieldTouched('email') && form.getFieldError('email')
        const passwordError = this.state.failed
            ? !form.isFieldTouched('password') && 'Wrong Email or Password'
            : form.isFieldTouched('password') && form.getFieldError('password')
        return (
            <Layout
                style={{
                    padding: '2rem',
                    background: '#404040',
                    minHeight: '100vh',
                }}
            >
                <div
                    style={{
                        background: '#fff',
                        padding: 24,
                        margin: '0 auto',
                        borderRadius: '12px',
                        width: '320px',
                    }}
                >
                    <Form onSubmit={this.submit}>
                        <Logo style={{ height: '80px', marginBottom: '10px' }} />
                        <h1 style={{ textAlign: 'center' }}>
                            Admin Login
                        </h1>
                        <br />
                        <Form.Item
                            validateStatus={emailError ? 'error' : ''}
                            help={emailError || ''}
                        >
                            {form.getFieldDecorator('email', {
                                rules: [{ required: true, message: 'Please input your email!' }],
                            })(
                                <Input
                                    prefix={<Icon type="mail" style={{ fontSize: 13 }} />}
                                    placeholder="Email"
                                />
                            )}
                        </Form.Item>
                        <Form.Item
                            validateStatus={passwordError ? 'error' : ''}
                            help={passwordError || ''}
                        >
                            {form.getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                                    type="password"
                                    placeholder="Password"
                                />
                            )}
                        </Form.Item>
                        <Form.Item style={{ marginBottom: '0.5rem', padding: '0 0.5rem' }}>
                            {form.getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(<Checkbox>Remember me</Checkbox>)}
                            <a
                                className="login-form-forgot"
                                href="mailto:admin@kijani.ngo"
                                style={{ float: 'right' }}
                            >
                                Forgot password
                            </a>
                        </Form.Item>
                        <div style={{ textAlign: 'center' }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                disabled={this.hasErrors()}
                                style={{ minWidth: '100%' }}
                            >
                                <Icon type="login" />Log in
                            </Button>
                        </div>
                        <p style={{ marginTop: '0.5rem', textAlign: 'center' }}>
                            <a href="mailto:admin@kijani.ngo">Request access</a>
                        </p>
                    </Form>
                </div>
            </Layout>
        )
    }
}

Login.propTypes = {
    onLogin: PropTypes.func.isRequired,
}

export default withForm(Login)
