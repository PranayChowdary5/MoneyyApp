import { Routes, Route } from "react-router-dom"
import Header from './component/Header/Header'
import Footer from './component/Footer/Footer'
import HomePage from './component/HomePage/HomePage'
import CreateBlog from "./component/CreateBlog/CreateBlog";
import UpdateBlog from "./component/UpdateBlog/UpdateBlog";
import DetailBlog from "./component/DetailBlog/DetailBlog";


import './App.css';
import 'antd/dist/antd.css';


function App() {
  return (
    <>
    <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog/create" element={<CreateBlog />} />
        <Route path="/blog/update/:id" element={<UpdateBlog />} />
        <Route path="/blog/detail/:id" element={<DetailBlog />} />
        {/* <Route path="bill/:id" element={<BillDetail />} /> */}
      </Routes>
    <Footer />

    </>
  );
}

export default App;
