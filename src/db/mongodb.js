const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
            .then(() => console.log("mongodb connected succefully"))
            .catch((error) => console.log("mongodb deta not coonect :" + error))
    } catch (error) {
        console.log("mongodb deta not coonect :" + error)
    }
}

module.exports = connectDB