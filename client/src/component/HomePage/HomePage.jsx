import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./HomePage.css"
import Spinner from '../Spinner/Spinner';
import { Button, Col, Row } from 'antd';


const HomePage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [resData, setResData] = useState(false);
    const navigate = useNavigate();

    const deleteClickHandler = (e, id) => {
        e.stopPropagation();
        setLoading(true)
        axios.delete(`/blog/delete/${id}`)
            .then(() => {
                setLoading(false);
            })
            .catch((e) => {
                alert(e)
                setLoading(false);
                console.log(e);
            })
    }

    const updateClickHandler = (e, id) => {
        e.stopPropagation();
        navigate(`/blog/update/${id}`)
    }


    console.log(data);

    useEffect(() => {
        axios.get("/blog/get")
            .then((res) => {
                if (!res?.data.length) setResData(true)
                if (res?.data.length) {
                    setResData(false)
                    setData(res.data)
                }
            })
            .catch((e) => {
                console.log(e);
            })
    }, [loading]);

    if (resData) {
        return (
            <div className='container min-h'>
                <Row justify="end">
                    <Col>
                        <Button type="primary" size="large" style={{ marginBottom: "28px" }} onClick={() => navigate("/blog/create")}>
                            Create
                        </Button>
                    </Col>
                </Row>
                <h1 style={{textAlign: "center"}}>No blog found, Please create</h1>

            </div>
        )
    }

    return (
        <div className='container min-h'>
            <Row justify="end">
                <Col>
                    <Button type="primary" size="large" style={{ marginBottom: "28px" }} onClick={() => navigate("/blog/create")}>
                        Create
                    </Button>
                </Col>
            </Row>
            <div className='card-container'>
                {
                    data.length ? data.map((el, index) => {
                        return (
                            <div key={index} className='detail-card' onClick={() => navigate(`/blog/detail/${el._id}`)}>
                                <h2>{el?.title.substring(0, 70)}{el?.title.length < 70 ? '' : '...'}</h2>
                                <p>{el?.description.substring(0, 400)}{el?.description.length < 400 ? '' : '...'}</p>
                                <p>Created at: <strong>{el?.createDate}</strong></p>
                                {el?.updateDate ? <p>Updated at: <strong>{el?.updateDate}</strong></p> : ""}
                                <p>Review: <strong>{el?.review.length}</strong></p>


                                <Row justify="space-between" style={{ marginTop: "20px" }}>
                                    <Col>
                                        <Button type="primary" size="large" loading={loading} disabled={loading} onClick={(e) => updateClickHandler(e, el._id)}>
                                            Update
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button type="primary" danger size="large" loading={loading} disabled={loading} onClick={(e) => deleteClickHandler(e, el._id)}>
                                            Delete
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                        )
                    }) : <Spinner />
                }
            </div>
        </div>

    );
}

export default HomePage