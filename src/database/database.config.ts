import mongoose from "mongoose";

export async function connect() {

    try {
        mongoose.connect(process.env.MURI!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("Database connected")
        })

        connection.on('error', (error) => {
            console.log("error" + error)
            process.exit();
        })

    } catch (error) {
        console.log(error);
    }
}