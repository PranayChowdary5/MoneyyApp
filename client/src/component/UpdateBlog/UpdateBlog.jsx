import React, { useEffect, useState } from 'react'
import "./UpdateBlog.css"
import { Button, Col, Form, Input, Row } from 'antd';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import Spinner from '../Spinner/Spinner';
const { TextArea } = Input;



const UpdateBlog = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  const navigate = useNavigate();
  const { id } = useParams();

  const onFinish = (values) => {
    setLoading(true)
    values.updateDate = new Date().toLocaleString()
    axios.put(`/blog/update/${id}`, values)
      .then((res) => {
        setLoading(false)
        navigate(`/`)
      })
      .catch((e) => {
        alert(e)
        setLoading(false)
      })
  };

  useEffect(() => {
    axios.get(`/blog/get/${id}`)
      .then((res) => {
        setData(res.data)
      })
      .catch((e) => {
        console.log(e);
      })
  }, [id]);

  return (
    <div className='container min-h'>
      {
        Object.keys(data).length ?
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
                initialValues={data}
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
                    Update
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row> : <Spinner />
      }


    </div>
  )
}

export default UpdateBlog;