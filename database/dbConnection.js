import { Sequelize } from "sequelize";
// database connection
const sequelize = new Sequelize(
  "b7jezndgz0nmy1ukhua9",
  "ulp2b6evshfzojhj",
  "GYfeq0Rx1fdV7iLMB7Bg",
  {
    host: "b7jezndgz0nmy1ukhua9-mysql.services.clever-cloud.com",
    dialect: "mysql",
  }
);

// testing connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
export default sequelize;
