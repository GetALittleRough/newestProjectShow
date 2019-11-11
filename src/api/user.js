import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/users/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/users/getInfo',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/users/logout',
    method: 'post'
  })
}

export function register(data) {
  return request({
    url: 'users/register',
    method: 'post',
    data
  })
}

export function whetherRegister(data) {
  return request({
    url: 'users/whetherRegister',
    method: 'post',
    data
  })
}

export function setInformation(data) {
  return request({
    url: 'users/setInfo',
    method: 'post',
    data
  })
}

export function getImage(data) {
  return request({
    url: 'users/getImage',
    method: 'post',
    data
  })
}

export function uploadAvatar(data) {
  return request({
    url: 'users/handleUpload',
    method: 'post',
    data
  })
}