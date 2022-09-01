import React, { useEffect, useState } from 'react'
import "./DetailBlog.css"
import { Button, Col, Form, Input, Row } from 'antd';
import axios from 'axios';
import { useParams } from "react-router-dom";
import Spinner from '../Spinner/Spinner';
const { TextArea } = Input;



const DetailBlog = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({});
  const [reviewForm, setReviewForm] = useState(false);


  const { id } = useParams();

  const addReview = () => {
    setReviewForm(!reviewForm)
  }

  const onFinish = (values) => {
    setLoading(true)
    values.updateDate = new Date().toLocaleString();
    values.createDate = new Date().toLocaleString();

    axios.put(`/blog/review/create/${id}`, values)
      .then((res) => {
        setLoading(false);
        setReviewForm(false);
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
  }, [id, loading]);

  const deleteClickHandler = (e, reviewId) => {
    e.stopPropagation();
    setLoading(true)
    console.log(reviewId);
    axios.put(`/blog/review/delete/${id}`, { reviewId })
      .then((res) => {
        setLoading(false);
      })
      .catch((e) => {
        alert(e)
        setLoading(false)
      })
  }

  return (
    <div className='container min-h'>
      {
        Object.keys(data).length ?
          <div>
            <h1>{data?.title}</h1>
            <p>{data?.description}</p>
            <p>Created at: <strong>{data?.createDate}</strong></p>
            {data?.updateDate ? <p>Updated at: <strong>{data?.updateDate}</strong></p> : ""}

            <Row justify="space-between" style={{ margin: "24px" }}>
              <Col>
                <Button type="primary" size="large" onClick={() => addReview()}>
                  Add Review
                </Button>
              </Col>
            </Row>

            {
              reviewForm ?
                <Row justify="center">
                  <Col span={24}>
                    <Form
                      name="review"
                      labelCol={{
                        span: 2,
                      }}
                      wrapperCol={{
                        span: 8,
                      }}
                      onFinish={onFinish}
                      autoComplete="off"
                    >
                      <Form.Item
                        label="Name"
                        name="userId"
                        rules={[
                          {
                            required: true,
                            message: 'Please enter Name',
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        label="Description"
                        name="reviewDescription"
                        rules={[
                          {
                            required: true,
                            message: 'Please enter description',
                          },
                        ]}
                      >
                        <TextArea rows={4} />
                      </Form.Item>

                      <Form.Item
                        wrapperCol={{
                          offset: 5,
                          span: 4,
                        }} s
                      >
                        <Button type="primary" htmlType="submit" loading={loading} disabled={loading}>
                          Add Review
                        </Button>
                      </Form.Item>
                    </Form>
                  </Col>
                </Row> : ""
            }
            <div className='review-container'>
              {
                data?.review ? data?.review?.map((el, index) => {
                  return (
                    <div key={index} className='review-card'>
                      <h3>{el?.userId}</h3>
                      <p>{el?.reviewDescription}</p>
                      <p>Created at: <strong>{el?.createDate}</strong></p>
                      <Row style={{ marginTop: "20px" }}>
                        <Col>
                          <Button type="primary" danger loading={loading} disabled={loading} onClick={(e) => deleteClickHandler(e, el._id)}>
                            Delete
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  )
                }) : ""

              }
            </div>
          </div>
          : <Spinner />
      }


    </div>
  )
}

export default DetailBlog;