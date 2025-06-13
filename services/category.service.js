const Category = require("../models/category.model");
const fileServices = require("./file.service");

exports.createCategory = async (req) => {
  try {
    const { name } = req.body;
    const exist = await Category.findOne(name);
    if (exist) {
      throw new Error("Bu kategori zaten mevcut");
    }
    const newCategory = new Category({ name: name });
    await newCategory.save();
    return newCategory;
  } catch (error) {
    throw new Error(error);
  }
};

exports.uploadCategoryImage = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const str = await fileServices.uploadImage(req, res);
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { image: str },
      { new: true }
    );
    return updatedCategory;
  } catch (error) {
    throw new Error(error);
  }
};

exports.getCategoryById = async (req) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findById(categoryId);

    return category;
  } catch (error) {
    throw new Error(error);
  }
};

exports.getCategoryByName = async (req) => {
  try {
    const { name } = req.params;
    const category = await Category.find(name);

    return category;
  } catch (error) {
    throw new Error(error);
  }
};

exports.getCategoryBySlug = async (req) => {
  try {
    const { slug } = req.params;
    const category = await Category.find(slug);

    return category;
  } catch (error) {
    throw new Error(error);
  }
};

exports.getAllCategories = async (req) => {
  try {
    const categories = await Category.find();
    return categories;
  } catch (error) {
    throw new Error(error);
  }
};

exports.getSubCategories = async (req) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findById(categoryId);
    //promiseall ile subcategorynin kendi dökümanı çekilebilir
    return category.subCategories;
  } catch (error) {
    throw new Error(error);
  }
};

exports.addSubCategory = async (req) => {
  try {
    const { categoryId } = req.params;
    const { subCategory } = req.body;
    const category = await Category.findById(categoryId);
    category.subCategories.push(subCategory);
    await category.save();
    return category;
  } catch (error) {
    throw new Error(error);
  }
};

//aynı anda birden fazla altkategori eklemek için updateSubCategories servisi ekle
//deleteSubCategory ekle