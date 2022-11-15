var db = require("../config/dbconfig");

const listDatabases = async (req, res, next) => {
  var query = "SELECT * FROM shopping_cart;";
  var data = await db.query(query);
  res.json({
    message: data,
  });
  next();
};

module.exports = { listDatabases };
