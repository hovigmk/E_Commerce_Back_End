const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  Category.findAll({
    attributes: ["id", "category_name"],
    include: [
      {
        model: Product,
      },
    ],
  })
    .then((CategoryData) => res.json(CategoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
      },
    ],
  })
    .then((CategoryData) => {
      if (!CategoryData) {
        res
          .status(404)
          .json({ message: "There was no category found for this id." });
        return;
      }
      res.json(CategoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post("/", (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  })
    .then((ProductData) => res.json(ProductData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((CategoryData) => {
      if (!CategoryData) {
        res
          .status(404)
          .json({ message: "There was no category found with this id." });
        return;
      }
      res.json(CategoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  // update a category by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((CategoryData) => {
      if (!CategoryData) {
        res
          .status(404)
          .json({ message: "There was no category found with this id." });
        return;
      }
      res.json(CategoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
