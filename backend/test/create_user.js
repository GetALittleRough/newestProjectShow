const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/', {useNewUrlParser: true});
const User = require('../models/user')
const user = new User({
  mail: 'crsong@bupt.edu.cn',
  date: new Date(),
  username: 'crsong@bupt.edu.cn',
  password: 'jason',
  avatar: 'http://localhost:8080/img/theme/team-1-800x800.jpg',
  nickname: '小明',
  workCount: 10,
  registerCount: 5,
  monitorCount: 3,
  age: 27,
  residence: '北京',
  jobTitle: '自由摄影师',
  self_introduction: '大家好，我是一名自由摄影师小明，很高兴能认识大家，希望大家能够喜欢我的作品',
  allimages: [
    {
      url: 'http://localhost:8080/img/theme/team-1-800x800.jpg'
    },
    {
      url: 'http://localhost:8080/img/theme/team-2-800x800.jpg'
    },
    {
      url: 'http://localhost:8080/img/theme/team-3-800x800.jpg'
    },
    {
      url: 'http://localhost:8080/img/theme/team-4-800x800.jpg'
    },
    {
      url: 'http://localhost:8080/img/theme/team-1-800x800.jpg'
    },
    {
      url: 'http://localhost:8080/img/theme/team-2-800x800.jpg'
    },
    {
      url: 'http://localhost:8080/img/theme/team-3-800x800.jpg'
    },
    {
      url: 'http://localhost:8080/img/theme/team-4-800x800.jpg'
    },
    {
      url: 'http://localhost:8080/img/theme/team-1-800x800.jpg'
    },
    {
      url: 'http://localhost:8080/img/theme/team-1-800x800.jpg'
    }
  ],
  registerimages: [
    {
      url: 'http://localhost:8080/img/theme/team-1-800x800.jpg'
    },
    {
      url: 'http://localhost:8080/img/theme/team-2-800x800.jpg'
    },
    {
      url: 'http://localhost:8080/img/theme/team-3-800x800.jpg'
    },
    {
      url: 'http://localhost:8080/img/theme/team-4-800x800.jpg'
    },
    {
      url: 'http://localhost:8080/img/theme/team-1-800x800.jpg'
    },
  ],
  monitorimages: [
    {
      url: 'http://localhost:8080/img/theme/team-1-800x800.jpg'
    },
    {
      url: 'http://localhost:8080/img/theme/team-2-800x800.jpg'
    },
    {
      url: 'http://localhost:8080/img/theme/team-3-800x800.jpg'
    }
  ]
});
user.save(err => {
  if (err) {
    console.error(err)
  }
})