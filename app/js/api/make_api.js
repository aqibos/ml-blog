// import axios from 'axios';
// axios.defaults.headers.post['Content-type'] = 'application/json';
import 'whatwg-fetch';
import { curry } from 'ramda';

module.exports = (root) => {

  // FETCH IMPLEMENTATION
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });

  const get = url => qs => fetch(url + (qs || ''), {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    headers
  });

  const post = url => body => fetch(url, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers,
    body: JSON.stringify(body)
  });

  const del = url => body => fetch(url, {
    method: 'DELETE',
    mode: 'cors',
    credentials: 'include',
    headers,
    body: JSON.stringify(body)
  });

  const put = url => body => fetch(url, {
    method: 'PUT',
    mode: 'cors',
    credentials: 'include',
    headers,
    body: JSON.stringify(body)
  });

  return {
    getBlogs: get(`${root}/blogs`),
    postBlog: post(`${root}/blogs`),
    deleteBlog: del(`${root}/blogs`),
    putBlog: put(`${root}/blogs`),

    getComments: get(`${root}/comments`),
    postComment: post(`${root}/comments`),
    deleteComment: del(`${root}/comments`),
    putComment: put(`${root}/comments`),

    login: post(`${root}/login`),
    logout: del(`${root}/logout`),

    register: post(`${root}/users`),
    getMe: get(`${root}/users/me`)
  };
}

  // const httpRequestBuilder = (httpMethod, url, data) => ({
  //   method: httpMethod,
  //   url,
  //   data,
  //   withCredentials: true
  // });

  // const get = url => querystring => axios({
  //   method: 'GET',
  //   url: url + (querystring || ''),
  //   withCredentials: true
  // });
  // const post =
  //   // (url, data) => axios(httpRequestBuilder('POST', url, data))
  //   url => data => axios({
  //     method: 'POST',
  //     url,
  //     data,
  //     withCredentials: true
  //   });
  // const del =
  //   // (url, data) => axios(httpRequestBuilder('DELETE', url, data))
  //   url => data => axios({
  //     method: 'DELETE',
  //     url,
  //     data,
  //     withCredentials: true
  //   });
  // const put =
  //   // (url, data) => axios(httpRequestBuilder('PUT', url, data))
  //   url => data => axios({
  //     method: 'PUT',
  //     url,
  //     data,
  //     withCredentials: true
  //   });
