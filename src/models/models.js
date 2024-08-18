// import { uri } from "../config/database.js";

// import { Sequelize, DataTypes } from "sequelize";

// const sequelize = new Sequelize(uri);

// //modelo de tabela de usuário
// const User = sequelize.define(
//   "User",
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     firstname: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     surname: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// //modelo de tabela de categoria
// const Category = sequelize.define(
//   "Category",
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     slug: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     use_in_menu: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
//       defaultValue: false,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );
// //modelo de tabela de produto
// const Product = sequelize.define("Product", {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   enabled: {
//     type: DataTypes.BOOLEAN,
//     allowNull: true,
//     defaultValue: false,
//   },
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   slug: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   use_in_menu: {
//     type: DataTypes.BOOLEAN,
//     allowNull: true,
//     defaultValue: false,
//   },
//   stock: {
//     type: DataTypes.INTEGER,
//     allowNull: true,
//     defaultValue: 0,
//   },
//   description: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
//   price: {
//     type: DataTypes.FLOAT,
//     allowNull: false,
//   },
//   price_with_discount: {
//     type: DataTypes.FLOAT,
//     allowNull: false,
//   },
// });
// //modelo de tabela de imagem do produto
// const Image = sequelize.define("Image", {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   product_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: "Product", // Nome da tabela de produtos
//       key: "id",
//     },
//   },
//   enabled: {
//     type: DataTypes.BOOLEAN,
//     allowNull: true,
//     defaultValue: false,
//   },
//   path: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// });

// //modelo de opções de produto
// const ProductOption = sequelize.define("ProductOption", {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   product_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: "Product", // Nome da tabela de produtos
//       key: "id",
//     },
//   },
//   title: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   shape: {
//     type: DataTypes.ENUM("square", "circle"),
//     defaultValue: "square",
//   },
//   radius: {
//     type: DataTypes.INTEGER,
//     defaultValue: false,
//   },
//   type: {
//     type: DataTypes.ENUM("text", "color"),
//     defaultValue: "text",
//   },
//   values: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// });

// //modelo de tabela de produto//categoria
// const ProductCategory = sequelize.define("ProductCategory", {
//   product_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: "Product", // Nome da tabela de produtos
//       key: "id",
//     },
//   },
//   category_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: "Category", // Nome da tabela de categoria
//       key: "id",
//     },
//   },
// });

// // Sincronizar o modelo com o banco de dados
// sequelize.sync();

// export default {
//   User,
//   Category,
//   Product,
//   Image,
//   ProductOption,
//   ProductCategory,
// };
const { Sequelize, DataTypes, QueryTypes } = require("sequelize");
const { uri } = require("../config/database");

const sequelize = new Sequelize(uri);

const User = sequelize.define(
  "User",
  {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

const Category = sequelize.define(
  "Category",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    use_in_menu: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  }
);

const Product = sequelize.define(
  "Product",
  {
    enabled: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    use_in_menu: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    price_with_discount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

const ProductOption = sequelize.define(
  "ProductOption",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Products",
        key: "id",
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shape: {
      type: DataTypes.ENUM("square", "circle"),
      defaultValue: "square",
    },
    radius: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    type: {
      type: DataTypes.ENUM("text", "color"),
      defaultValue: "text",
    },
  },
  {
    timestamps: true,
  }
);
const ProductImage = sequelize.define(
  "ProductImage",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Products",
        key: "id",
      },
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

Product.hasMany(ProductImage, { foreignKey: "product_id" });
ProductImage.belongsTo(Product, { foreignKey: "product_id" });

Product.hasMany(ProductOption, { foreignKey: "product_id" });
ProductOption.belongsTo(Product, { foreignKey: "product_id" });

Category.belongsToMany(Product, {
  through: "ProdutoCategoria",
  foreignKey: "category_id",
});
Product.belongsToMany(Category, {
  through: "ProdutoCategoria",
  foreignKey: "product_id",
});

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

module.exports = {
  User,
  Category,
  Product,
  ProductImage,
  ProductOption,
};
