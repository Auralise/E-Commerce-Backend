// The `/api/tags` endpoint
const router = require('express').Router();
const e = require('express');
const { Tag, Product, ProductTag } = require('../../models');

//Get all tags
router.get('/', async (req, res) => {
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

//Get specific tag
router.get('/:id', async (req, res) => {
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

//New tag
router.post('/', async (req, res) => {
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

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    if(!req.body.tag_name){
      res.status(400).json({
        message: "Please include a tag_name in the request body",
      });
      return;
    }

    const tagToUpdate = await Tag.findByPk(req.params.id);
    if (tagToUpdate){
      await Tag.update({
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id,
        }
      });

      res.status(200).json({
        message: "Updated Tag successfully",
        previous: tagToUpdate,
        updated: await Tag.findByPk(req.params.id)
      });

    } else {
      res.status(404).json({
        message: `No tag with ID ${req.params.id} was found`
      })
    }


  } catch (err) {
    res.status(500).json({
      message: "An internal server error occurred"
    });
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagToDelete = await Tag.findByPk(req.params.id);
    if(tagToDelete){
      
      await Tag.destroy({where: {
        id: req.params.id,
      }});

      res.status(200).json({
        message: `Successfully deleted Tag ${tagToDelete.tag_name} with ID ${tagToDelete.id}`
      })

    } else {
      res.status(404).json({
        message: `No tag with ID ${req.params.id} found`
      })
    }
  } catch (err) {
    res.status(500).json({
      message: "An internal server error has occured."
    })
  }
});

module.exports = router;
