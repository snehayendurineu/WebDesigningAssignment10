const db = require('../model/dbConnection');
const userModel = db.user;
const companyModel = db.company;
const jobModel = db.job;
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const addUser = async (req, res) => {
    try{
        const { fullName, email, password, type } = req.body;


        if(!fullName || !password || !email || !type){
            return res.status(400).json({ message: 'Bad request, need fullName, password, email, type'});
        }else if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/) || password.length<6 || password.length>12) {
            return res.status(400).json({ message: 'Invalid email or weak password' });
        }
        else if(!email.match(/^[a-zA-Z0-9.]+@northeastern\.edu$/)){
            return res.status(400).json({message: 'Invalid email or weak password' });
        }
        else if(!fullName.match(/^[a-zA-Z]+(?:[\s.'-][a-zA-Z]+)*$/)){
            return res.status(400).json({message: 'Invalid Full Name'});
        }
        else if(!(type==='employee' || type==='admin')){
             return res.status(400).json({message: 'Invalid user type, it must be either employee or admin'});
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new userModel({ fullName, email, password: hashedPassword, type});
            await user.save();
            res.status(201).json({ message: "User created successfully" });
        }
    }catch(error){
      console.log(error)
      res.status(409).json({ message: 'User already exists' });
    }
}


const getUsers = async (req, res) => {
    try {
        const users = await userModel.find({}, 'fullName email imagePath type');
        res.json(users);
      } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
      }    
};
  
const updateUser = async(req, res)=>{
    try {
        const { fullName, password } = req.body;
    
        if (!fullName.match(/^[a-zA-Z]+(?:[\s.'-][a-zA-Z]+)*$/)) {
          return res.status(400).json({ message: 'Invalid Full Name' });
        }
    
        if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/)) {
          return res.status(400).json({ message: 'Invalid password' });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const user = await userModel.findOneAndUpdate(
          { email: req.body.email },
          { fullName, password: hashedPassword },
          { new: true }
        );
    
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        res.json({ message: 'User details updated successfully' });
      } catch (error) {
        res.status(400).json({ message: 'Invalid full name or password or user already exists in database' });
      }
};


const deleteUser = async (req, res) => {
    try {
      const user = await userModel.findOneAndDelete({ email: req.body.email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join('images');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Only JPEG, PNG, and GIF files are allowed');
    }
  }
}).single('image');

const uploadImage = async (req, res) => {
  try {
    upload(req, res, async function (err) {
    if (err) {
      return res.status(400).json({ message: err });
    }
    if (!req.body.userId || !req.file)
      return res.status(400).json({ message: 'Missing user ID or image file' });
    
    const email = req.body.userId;
    const imagePath = req.file.path;

    const user = await userModel.findOneAndUpdate(
        { email: email },
        { imagePath: imagePath },
        { new: true }
    );
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(201).json({ message: 'Image uploaded successfully', imagePath: imagePath });
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const addCompany = async (req, res) => {
  try {
    upload(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ message: err });
      }
      if (!req.body.companyName || !req.file) {
        return res.status(400).json({ message: 'Missing company name or image file' });
      }
      
      const companyName = req.body.companyName;
      const imagePath = req.file.path;

      const newCompany = new companyModel({
        companyName: companyName,
        companyImage: imagePath
      });

      await newCompany.save();
      
      res.status(201).json({ message: 'Company added successfully', company: newCompany });
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAllCompanies = async (req, res) => {
  try {
      const companies = await companyModel.find();
      res.status(200).json(companies);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

const createJob = async (req, res) => {
  try {
    const { companyName, jobTitle, description, salary } = req.body;

    if(!companyName || !jobTitle || !description || !salary){
        return res.status(400).json({ message: 'Bad request, need companyName, jobTitle, description, salary'});
    }else{
        const job = new jobModel({ companyName, jobTitle, description, salary});
        await job.save();
        res.status(201).json({ message: "Job created successfully" });
    }
  }catch(error){
    console.log(error)
    res.status(409).json({ message: 'Job already exists' });
  }
};

const getJobs = async (req, res) => {
  try {
      const job = await jobModel.find({}, 'companyName jobTitle description salary');
      res.json(job);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }    
};


module.exports = {
    addUser,
    getUsers,
    updateUser,
    deleteUser,
    uploadImage,
    addCompany,
    getAllCompanies,
    createJob,
    getJobs
}
