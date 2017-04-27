import m from 'mithril';
import stream from 'mithril/stream';
import Comment from './components/comment';
import Nav from './components/nav';
import LoadingView from './components/loading_view';
import textArea from './components/textArea';
import button from './components/button';
import { curry } from 'ramda';

export default function Blog({ api }) {

  const nav = Nav({ api });
  const isBlogLoading = stream(true);
  const blogDetails = stream({});
  const commentList = stream([]);
  const newComment = stream('');
  const apiError = stream('');
  const isNewCommentLoading = stream(false);

  let commentListComponents = [];

  const handleApiError = curry((loadingPropFn, err) => {
    apiError(err);
    loadingPropFn(false);
    m.redraw();
  });

  const loadBlog = blogId => {
    api.blogs('?id=' + blogId)
    .then(res => {
      if (!res.success) throw res.errMsg;
      blogDetails(res.data);
      loadComments(blogId);
    })
    .catch(handleApiError(isBlogLoading));
  };

  const loadComments = blogId => {
    api.comments('?blogId=' + blogId)
    .then(res => {
      if (!res.success) throw res.errMsg;
      commentList(res.data);
      commentListComponents = res.data.map(c => Comment({ params: c, api }));
      isBlogLoading(false);
      m.redraw();
    })
    .catch(handleApiError(isBlogLoading));
  };

  const createComment = () => {
    apiError('');
    const blogId = m.route.param('id');
    api.createComment({ blogId, content: newComment() })
    .then(res => {
      if (!res.success) throw res.errMsg;
      newComment('');
      isNewCommentLoading(false);
      loadComments(blogId);
    })
    .catch(handleApiError(isNewCommentLoading))
  }

  const blog = () => m('.blog-full', [
    m('.blog-title', blogDetails().title),
    m('.blog-meta', 'Posted by ' + blogDetails().username + ' on ' + new Date(blogDetails().datetime).toDateString()),
    m('.blog-content', blogDetails().content)
  ]);

  const comments = () => m('.blog-comment-list', commentListComponents.map(m));

  const newCommentBox = () => textArea('new-comment', newComment, 'Add a comment');
  const newCommentButton = () => button('new-comment', createComment, 'Add Comment', isNewCommentLoading());
  const newCommentContainer = () => m('.new-comment-container', [ newCommentBox(), newCommentButton() ]);

  const pageView = () => m('.page-view', [
    blog(),
    m('.comment-title', `Comments (${commentList().length})` ),
    comments(),
    m('.error', apiError()),
    newCommentContainer()
  ]);

  const oncreate = () => {
    apiError(''); isBlogLoading(true); m.redraw();

    const blogId = m.route.param('id');
    if (blogId) { loadBlog(blogId); }
    else m.route.set('/home');
  };

  const view = () => m('.blog',
    m(nav),
    isBlogLoading() ? LoadingView() : pageView()
  );

  return { oncreate, view };

}