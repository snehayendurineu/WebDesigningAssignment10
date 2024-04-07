const mongoose = require('mongoose');
const  dotenv  = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const mongodb = mongoose.connection;
mongodb.on('error', console.error.bind(console, 'error while connecting to MongoDB:'));
mongodb.once('open', function() {
  console.log('Connected to MongoDB successfully');
});

const userSchema = mongoose.Schema( {
    fullName: {
        type: String,
        required: true,
        validate: /^[a-zA-Z]+(?:[\s.'-][a-zA-Z]+)*$/,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: /^[a-zA-Z0-9.]+@northeastern\.edu$/,
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    imagePath: {
        type: String
    },
    type: {
        type: String,
        required: true,
        enum: ['employee', 'admin']
    }
});

const companySchema = mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    companyImage: {
        type: String,
        required: true
    }
});

const jobSchema = mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    }
});

const user = mongoose.model('user', userSchema);
const company = mongoose.model('Company', companySchema);
const job = mongoose.model('job', jobSchema);

module.exports = {
    user: user,
    company: company,
    job: job
};
