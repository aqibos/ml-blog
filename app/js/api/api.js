import makeApi from './makeApi';

// const liveApi = 'https://ml-blog-api.herokuapp.com';
// const devApi = 'https://ml-blog-api-dev.herokuapp.com';
const liveApi = 'https://ml-blog-api.aqibshah.com';
const devApi = 'https://ml-blog-api-dev.aqibshah.com';
const localApi = 'http://localhost:1338';

// const liveHost = 'ml-blog.herokuapp.com';
// const devHost = 'ml-blog-dev.herokuapp.com';
const liveHost = 'ml-blog.aqibshah.com';
const devHost = 'ml-blog-dev.aqibshah.com';

const isHost = host => window.location.host === host;

const apiUrl = isHost(liveHost) ? liveApi : devApi;
            //  : isHost(devHost)  ? devApi
                                // : localApi;

const api = makeApi(apiUrl);

function normalize(fn) {
  const isSuccess = status => status >= 200 && status <= 299;
  const success = data =>  Promise.resolve({ success: true, data });
  const error = err => ({ success: false, err, errMsg: err.message });

  const apiSuccess = succeedWith => succeedWith.then(success).catch(error);
  const apiFail = failWith => failWith.then(error).catch(error);

  return function(data) {
    return fn(data)
    .then(res => isSuccess(res.status) ? apiSuccess(res.json()) : apiFail(res.json()))
    .catch(err => {
      console.log('catch', err);
      console.log(err.name + err.message);
      return error(err.name + err.message);
    });
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
  logout: normalize(api.logout),

  register: normalize(api.register),
  getMe: normalize(api.getMe)

};
