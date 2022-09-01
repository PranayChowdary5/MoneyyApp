import React, { useState } from 'react'
import "./CreateBlog.css"
import { Button, Col, Form, Input, Row } from 'antd';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const { TextArea } = Input;



const CreateBlog = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const onFinish = (values) => {
    setLoading(true)
    values.createDate= new Date().toLocaleString()
    axios.post("/blog/create", values)
      .then((res) => {
        setLoading(false)
        navigate(`/`)
      })
      .catch((e) => {
        alert(e)
        setLoading(false)
      })
  };


  return (
    <div className='container min-h'>
      <Row justify="center">
        <Col span={24}>
          <Form
            name="blog"
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: false,
            }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[
                {
                  required: true,
                  message: 'Please enter title',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="TextArea"
              name="description"
              rules={[
                {
                  required: true,
                  message: 'Please enter description',
                },
              ]}
            >
              <TextArea rows={8} />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 12,
                span: 12,
              }}
            >
              <Button type="primary" htmlType="submit" loading={loading} disabled={loading}>
                Create
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>

    </div>
  )
}

export default CreateBlog;