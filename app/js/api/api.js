import makeApi from './makeApi';

// TODO: Setup live and dev API
const liveApi = 'https://ml-blog-api.herokuapp.com';
const devApi = 'https://ml-blog-api-dev.herokuapp.com';
const localApi = 'http://localhost:1338';

const liveHost = 'ml-blog.herokuapp.com';
const devHost = 'ml-blog-dev.herokuapp.com';

const isHost = host => window.location.host === host;

const apiUrl = isHost(liveHost) ? liveApi
             : isHost(devHost)  ? devApi
                                : localApi;

const api = makeApi(apiUrl);

function normalize(fn) {

  const isSuccess = status => status >= 200 && status <= 299;
  const success = data => Promise.resolve({ success: true, data });
  const error = err => ({ success: false, err, errMsg: err.message });

  return function(data) {
    return fn(data)
      .then(res => success(res.data))
      .catch(err =>
        error.response ? error(err.response.data) :
        error.request  ? error({ errMsg: 'No response was received from the server.' }) :
                         error(err)
      );
  };
}

module.exports = {

  blogs: normalize(api.getBlogs),
  createBlog: normalize(api.postBlog),
  editBlog: normalize(api.putBlog),
  deleteBlog: normalize(api.deleteBlog),

  comments: normalize(api.getComments),
  createComment: normalize(api.postComment),
  editComment: normalize(api.putComment),
  deleteComment: normalize(api.deleteComment),

  login: normalize(api.login),
  logout: normalize(api.logout)

};
