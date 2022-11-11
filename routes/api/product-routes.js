// The `/api/products` endpoint
const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');


// get all products
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
      order: ['product_name'],
      include: [{ model: Category }, { model: Tag }],
    });

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong!" });
  }

});

// get one product
router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }],
    });
    res.status(200).json(productData);
  }
  catch (err) {
    res.status(500).json({ message: "Something went wrong!" });
  }
});

// create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', async (req, res) => {
  try {
    //Filter invalid input
    if (
      !req.body.product_name &&
      !req.body.price &&
      !req.body.stock &&
      !req.body.category_id &&
      !req.body.tagIds
    ) {
      res.status(400).json({
        message: "Please provide either a product_name, price, stock, category_id or tagIds field in the body"
      });
      return;
    }

    const productToUpdate = await Product.findByPk(req.params.id);

    if (productToUpdate) {

      await Product.update(req.body, {
        where: { id: req.params.id },
      });

      //If the body contains tags
      if (req.body.tagIds) {
        const productTags = await ProductTag.findAll({
          where: { product_id: req.params.id }
        });
        // is this used?

        //Validate the tag IDs
        for (const tagId of req.body.tagIds) {
          if (!await Tag.findByPk(tagId)) {
            res.status(400).json({
              message: `Invalid tag ID ${tagId} found in request body. Please review your submitted tags.`
            });
            return;
          }
        }

        //Destroy all tags where product id matches
        //Just a note, I do realise that this is not the best way to do this but considering the scale, this is effective
        await ProductTag.destroy({
          where: {
            product_id: req.params.id,
          }
        });

        //structure the objects for bulk creation
        const newTags = req.body.tagIds.map(id => {
          return {
            product_id: req.params.id,
            tag_id: id,
          }
        })

        //Create new product tags
        await ProductTag.bulkCreate(newTags);

        res.status(200).json({
          message: "Product and tags successfully updated.",
          product: await Product.findByPk(req.params.id, {
            include: [{model: Tag}]
          }),
        });
        //Exit function after sending response
        return;

      }



      res.status(200).json({
        message: "Product successfully updated",
        product: await Product.findByPk(req.params.id, {
          include: [{model: Tag}]
        }),
      })

    } else {
      res.status(404).json({
        message: `Unable to find product with ID ${req.params.id}`
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "An internal server error occurred",
    })
  }


});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    const productId = req.params.id;
    const productToRemove = await Product.findByPk(productId);
    if (productToRemove) {
      Product.destroy({
        where: {
          id: productId,
        }
      });

      res.status(200).json({
        message: `Product ${productToRemove.product_name} with ID ${productId} has been deleted`,
      });

    } else {
      res.status(404).json({
        message: "No product by this ID. Please try again with a valid ID",
      })
    }

  } catch (err) {
    res.status(500).json({
      message: "An internal server error occurred."
    })
  }
});

module.exports = router;
