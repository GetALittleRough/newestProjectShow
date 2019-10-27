const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/', {useNewUrlParser: true});
const User = require('../models/user')
const user = new User({
  username: 'crsong@bupt.edu.cn',
  password: 'jason',
  avatar: 'http://localhost:8080/img/theme/team-1-800x800.jpg',
  nickname: '宋承儒'
});
user.save(err => {
  if (err) {
    console.error(err)
  }
})