const app  = require("./app.js"); // Import app
require("dotenv").config(); // Load environment variables from .env file

const connectDB =  require("./db/index.js"); // Import connectDB function


// Connect to database
connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log("ERROR: app.on - ", error);
        throw error;
    });

    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})
.catch((err) =>{
    console.log("MONGO db connection failed !!!", err);
});
