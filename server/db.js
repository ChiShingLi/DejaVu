import mongoose from "mongoose";

// DB module
export const DbConnection = () => {
    mongoose.connect(process.env.DB_PATH)
        .then((res) => {
            console.log("DB connection successful.")
        }).catch((err) => {
            console.log(`Error connecting to the database: ${err}`);
        })
}
