import React from 'react'
import PropTypes from 'prop-types'
import { startCase, upperFirst } from 'lodash'
import { Link, withRouter } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Icon, Button } from '../antd'

import Logo from '../components/Logo'

const getRootRoutes = routes => {
    return Object.keys(routes)
        .filter(route => {
            let parts = route.split('/')
            return (
                (parts.length === 2 && parts[1] !== '') || (parts.length === 3 && parts[3] === '')
            )
        })
        .map(route => ({ name: upperFirst(route.split('/')[1]), href: route }))
}

const Wrapper = withRouter(({ children, routes, onLogout, history }) =>
    <Layout style={{ minHeight: '100vh' }}>
        <Layout.Sider collapsible collapsedWidth="42" breakpoint="sm">
            <Menu
                onClick={({ key }) => {
                    switch (key) {
                        case 'WEBSITE':
                            return (window.location.href = 'http://kijani.ngo')
                        case 'LOGOUT':
                            return onLogout()
                        default:
                            return history.push(key)
                    }
                }}
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['/' + history.location.pathname.split('/')[1]]}
            >
                <Menu.Item key="WEBSITE" style={{ height: '72px', marginLeft: '10px' }}>
                    <Logo width="123px" withName />
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="/">
                    <Icon type="home" />Home
                </Menu.Item>
                {getRootRoutes(routes).map(route =>
                    <Menu.Item key={route.href}>
                        <Icon type="bars" />{route.name}
                    </Menu.Item>
                )}
                <Menu.Divider />
                <Menu.Item key="LOGOUT">
                    <Icon type="logout" />Log out
                </Menu.Item>
            </Menu>
        </Layout.Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Button onClick={() => history.goBack()} icon="left-circle-o" />
                <Breadcrumb style={{ margin: '12px 0', width: '80%' }}>
                    {history.location.pathname.split('/').map((item, i, arr) =>
                        <Breadcrumb.Item key={item}>
                            <Link to={arr.slice(0, i + 1).join('/') + '/'}>{startCase(item)}</Link>
                        </Breadcrumb.Item>
                    )}
                </Breadcrumb>
            </div>
            <Layout.Content style={{ background: '#fff', padding: 24, margin: 0 }}>
                {children}
            </Layout.Content>
        </Layout>
    </Layout>
)

Wrapper.propTypes = {
    onLogout: PropTypes.func.isRequired,
}

export default Wrapper
