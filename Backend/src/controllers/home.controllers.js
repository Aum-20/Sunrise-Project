
const home = (req, res) => {
    res.render("home.ejs");
};

const aboutUs = (req,res)=>{
    res.render("about.ejs");
};

const contactUs = (req,res)=>{
    res.render("contact.ejs");
}

module.exports = { home , aboutUs, contactUs }; // Export home controller
