const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: [{model:Product}]
    });

    res.status(200).json(tags);

  } catch (err) {
    res.status(500).json({
      message: "An internal server error occurred.",
    });
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [{model: Product}],
    });

    if (tag){
      res.status(200).json(tag);
    } else {
      res.status(404).json({
        message: `No tag with ID ${req.params.id} found`,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "An internal server error occured",
    });
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    if(!req.body.tag_name){
      res.status(400).json({
        message: "Please include a tag_name in the request body"
      });
      return;
    }

    const newTag = await Tag.create({
      tag_name: req.body.tag_name,
    });

    res.status(201).json(newTag);


  } catch (err) {
    res.status(500).json({
      message: "An internal server error occurred",
    });
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
