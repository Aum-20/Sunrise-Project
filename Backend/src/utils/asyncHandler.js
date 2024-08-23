
/*
This is a middleware function that wraps around async functions to catch any errors that may occur during the execution of the function. 
This is useful for handling errors in async functions that are not caught by the try-catch block. 
This middleware function takes an async function as an argument and returns a new function that calls the async function and catches any errors that may occur. 
If an error occurs, it calls the next function with the error as an argument, which will be handled by the error handling middleware.
*/ 
const asyncHandler = (requestHandler) =>{
    return (req,res,next) =>{
        Promise.resolve(requestHandler(req,res,next))
        .catch((err) => next(err));
    }
}



module.exports = asyncHandler; // Export asyncHandler