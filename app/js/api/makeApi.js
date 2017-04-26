import axios from 'axios';
import { curry } from 'ramda';
axios.defaults.headers.post['Content-type'] = 'application/json';

export default function makeApi(root) {

  const httpRequestBuilder = (httpMethod, url, data) => ({
    method: httpMethod,
    url,
    data,
    withCredentials: true
  });

  const get = curry((url, querystring) => axios({
    method: 'GET',
    url: url + (querystring || ''),
    withCredentials: true
  }));
  const post = curry(
    (url, data) => axios(httpRequestBuilder('POST', url, data))
  );
  const del = curry(
    (url, data) => axios(httpRequestBuilder('DELETE', url, data))
  );
  const put = curry(
    (url, data) => axios(httpRequestBuilder('PUT', url, data))
  );

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
    logout: del(`${root}/logout`)
  };
}
