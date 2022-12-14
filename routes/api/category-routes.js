// The `/api/categories` endpoint
const router = require('express').Router();
const { Category, Product } = require('../../models');

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }],
    });

    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({
      message: "An internal server error occured"
    });
  }

});

// Get category by ID
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{model: Product}],
    });
    if (category){
      res.status(200).json(category);
    } else {
      res.status(404).json({
        message: `No category with ID ${req.params.id} found`
      });
    }
    

  } catch (err) {
    res.status(500).json({
      message: "An internal server error occurred",
    });
  }
});

// create a new category
router.post('/', async (req, res) => {
  try {
    if(!req.body.category_name){
      res.status(400).json({
        message: "Please include a category_name in the request body",
      });
      return;
    }

    //pull name off body to prevent issues with invalid input
    const categoryName = req.body.category_name;

    const newCategory = await Category.create({
      category_name: categoryName
    });

    res.status(201).json(newCategory);

  } catch (err) {
    res.status(500).json({
      message: "An internal server error occurred."
    });
  }
});


// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    if(!req.body.category_name){
      res.status(400).json({
        message: "Please include a category_name in the request body",
      });
    }

    const categoryToUpdate = await Category.findByPk(req.params.id);

    if (categoryToUpdate){

      await Category.update({
        category_name: req.body.category_name,
      }, 
      {
        where: {
          id: req.params.id,
        }
      })

      res.status(200).json({
        message: "Updated Category successfully",
        previous: categoryToUpdate,
        updated: await Category.findByPk(req.params.id)
      });

    } else {
      res.status(404).json({
        message: `No product with ID ${req.params.id} found. Please try again`
      })
    }

  } catch (err) {
    res.status(500).json({
      message: "An internal server error occurred."
    });
  }
});


// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {

    const categoryToDelete = await Category.findByPk(req.params.id);
    if (categoryToDelete){

      await Category.destroy({where: {
        id: req.params.id,
      }});

      res.status(200).json({
        message: `Successfully deleted Category ${categoryToDelete.category_name} with ID ${categoryToDelete.id}`
      })

    } else {
      res.status(404).json({
        message: `Unable to find Category with ID ${req.params.id}`,
      })
    }
    

  } catch (err) {
    res.status(500).json({
      message: "An internal server error occurred.",
    });
  }
});

module.exports = router;
