const express = require('express');

const BlogDetail = require('../modal/blogDetail');

const router = express.Router();

router.get('/get', async (req, res) => {
  try {
    const data = await BlogDetail.find({});
    res.json(data);
  } catch (e) {
    res.json({ err: "Something went wrong" });
  }
});

router.get('/get/:id', async (req, res) => {
  try {
    const data = await BlogDetail.findOne({ _id: req.params.id });
    res.json(data);
  } catch (e) {
    res.json({ err: "Something went wrong" });
  }
});

router.post('/create', async (req, res) => {
  try {
    const data = await BlogDetail.create(req.body);
    res.json({ message: "Data saved successfully" });

  } catch (e) {
    res.json({ err: "Something went wrong" });
  }
});

router.put('/update/:id', async (req, res) => {
  try {
    await BlogDetail.findOneAndUpdate({ _id: req.params.id }, req.body);
    res.json({ message: "Seccessfully updated" });
  } catch (error) {
    res.json({ err: "Something went wrong" });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    await BlogDetail.findOneAndDelete({ _id: req.params.id });
    res.json({ message: "Seccessfully deleted" });
  } catch (e) {
    res.json({ err: "Something went wrong" });
  }
});


router.put('/review/create/:id', async (req, res) => {
  try {
    await BlogDetail.findOneAndUpdate({ _id: req.params.id },
      {$push: {review: req.body}});
    res.json({ message: "Seccessfully updated" });
  } catch (error) {
    res.json({ err: "Something went wrong" });
  }
});

router.put('/review/delete/:id', async (req, res) => {
  try {
    await BlogDetail.findOneAndUpdate({ _id: req.params.id },
      {$pull: {review: {_id: req.body.reviewId}}});
    res.json({ message: "Seccessfully updated" });
  } catch (error) {
    res.json({ err: "Something went wrong" });
  }
});

module.exports = router;
