import React from 'react'
import { Layout, Spin } from '../antd'

export default () =>
    <Layout
        style={{
            textAlign: 'center',
            padding: '2rem',
            background: '#404040',
            minHeight: '100vh',
        }}
    >
        <Spin size="large" tip={<p><br />Loading...</p>} delay={0} style={{ marginTop: '100px' }} />
    </Layout>
