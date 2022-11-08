// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');



//A Category has many products
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
})

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
})

//Connect to transaction tables
Tag.hasMany(ProductTag, {
  foreignKey: 'product_id',
  onDelete: 'CASCADE',
});

Product.hasMany(ProductTag, {
  foreignKey: 'product_id',
  onDelete: 'CASCADE',
});

//Define relationship
Tag.belongsToMany(Product, { through: ProductTag});
Product.belongsToMany(Tag, { through: ProductTag});


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
