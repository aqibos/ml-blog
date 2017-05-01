import m from 'mithril';
import stream from 'mithril/stream';
import Comment from './components/comment';
import Nav from './components/nav';
import LoadingView from './components/loading_view';
import textArea from './components/text_area';
import button from './components/button';
import { curry } from 'ramda';
import { getItem } from './util/session_storage';
import { dateWithTime } from './util/format';
import { isLoggedIn } from './util/login_helper';

export default function Blog({ api, pusher }) {

  // State
  const nav = Nav({ api });
  const isBlogLoading = stream(true);
  const blogDetails = stream({});
  const newComment = stream('');
  const apiError = stream('');
  const isNewCommentLoading = stream(false);
  const isDeleteBlogLoading = stream(false);
  let commentListComponents = stream([]);

  // Controller functions

  const handleApiError = curry((loadingPropFn, err) => {
    apiError(err);
    loadingPropFn(false);
    m.redraw();
  });

  const handleApiSuccess = curry((dataPropFn, res) => {
    const blogId = m.route.param('id');
    if (!res.success) throw res.errMsg;
    dataPropFn(res.data);
    loadComments(blogId);
  });

  const loadBlog = blogId => {
    api.blogs('?id=' + blogId)
    .then(handleApiSuccess(blogDetails))
    .catch(handleApiError(isBlogLoading));
  };

  const loadComments = blogId => {
    api.comments('?blogId=' + blogId)
    .then(res => {
      if (!res.success) throw res.errMsg;
      commentListComponents(res.data.map(c => Comment({
        api, params: c, editFn: editComment, deleteFn: deleteComment
      })));
      isBlogLoading(false);
      m.redraw();
    })
    .catch(handleApiError(isBlogLoading));
  };

  const editBlog = () => {
    const blogId = m.route.param('id');
    m.route.set('/new-blog?id=' + blogId);
  };

  const deleteBlog = () => {
    isDeleteBlogLoading(true);
    const blogId = m.route.param('id');
    api.deleteBlog({ blogId })
    .then(res => {
      if (!res.success) throw res.errMsg;
      isDeleteBlogLoading(false);
      m.route.set('/home')
    })
    .catch(err => { apiError(''); isDeleteBlogLoading(false); m.redraw(); })
  };

  const resetCommentInput = () => {
    newComment('');
    isNewCommentLoading(false);
  }

  const commentFn = (fn, params, loadingPropFn, successFn) => {
    loadingPropFn(true); apiError('');
    fn(params)
    .then(handleApiSuccess(successFn))
    .catch(handleApiError(loadingPropFn));
  }

  const createComment = () => {
    const blogId = m.route.param('id');
    return commentFn(
      api.createComment, { blogId, content: newComment() }, isNewCommentLoading, resetCommentInput
    );
  }

  const deleteComment = (commentId, loadingPropFn) => commentFn(
    api.deleteComment, { commentId }, loadingPropFn, loadingPropFn
  );

  const editComment = (commentId, content, loadingPropFn) => commentFn(
    api.editComment, { commentId, content }, loadingPropFn, loadingPropFn
  );

  const listenOnPusher = blogId => {
    const channel = pusher.subscribe('blog-' + blogId);
    channel.bind('new-comment', function() { loadComments(blogId); });
  }

  // UI helpers

  const blogActions = () => {
    const isOwner = getItem('user') && blogDetails().username === getItem('user').username;
    if (!isOwner) return [];
    return m('.blog-actions', [
      button('edit-blog', editBlog, 'Edit'),
      button('delete-blog', deleteBlog, 'Delete', isDeleteBlogLoading())
    ]);
  };

  const blog = () => m('.blog-full', [
    m('.blog-title', blogDetails().title),
    m('.blog-meta', 'Posted by ' + blogDetails().username + ' on ' + dateWithTime(blogDetails().datetime)),
    m('.blog-content', blogDetails().content),
    blogActions()
  ]);

  const comments = () => m('.blog-comment-list', commentListComponents().map(m));

  const newCommentBox = () => textArea('new-comment', newComment, 'Add a comment');
  const newCommentButton = () => button('new-comment', createComment, 'Add Comment', isNewCommentLoading());
  const newCommentContainer = () => isLoggedIn()
  ? m('.new-comment-container', [ newCommentBox(), newCommentButton() ])
  : [];

  const pageView = () => m('.page-view', [
    blog(),
    m('.comment-title', `Comments (${commentListComponents().length})` ),
    comments(),
    m('.error', apiError()),
    newCommentContainer()
  ]);

  // Lifecycle functions

  const oncreate = () => {
    apiError(''); isBlogLoading(true); m.redraw();

    const blogId = m.route.param('id');
    listenOnPusher(blogId);
    if (blogId) { loadBlog(blogId); }
    else m.route.set('/home');
  };

  const view = () => m('.blog',
    m(nav),
    isBlogLoading() ? LoadingView() : pageView()
  );

  return { oncreate, view };

}