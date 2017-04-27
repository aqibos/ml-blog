import m from 'mithril';
import stream from 'mithril/stream';
import Nav from './components/nav';
import inputBox from './components/inputBox';
import textArea from './components/textArea';
import button from './components/button';

export default function NewBlog({ api }) {

  const blogTitle = stream('');
  const blogContent = stream('');
  const apiError = stream('');
  const isNewBlogLoading = stream(false);

  const createBlog = () => {
    apiError('');
    isNewBlogLoading(true);

    api.createBlog({ title: blogTitle(), content: blogContent() })
    .then(res => {
      if (!res.success) throw res.errMsg;
      isNewBlogLoading(false);
      m.route.set('/home');
    })
    .catch(err => { apiError(err); isNewBlogLoading(false); m.redraw(); });
  };

  const nav = Nav({ api });

  const pageView = () => m('.page-view', [
    m('.title', 'Create A New Blog'),
    m('.error', apiError()),
    inputBox('blog-title', blogTitle),
    textArea('blog-content', blogContent),
    button('new-blog', createBlog, 'Create Blog',isNewBlogLoading())
  ]);

  const oncreate = () => {
    blogTitle(''); blogContent(''); apiError(''); m.redraw();
    isNewBlogLoading(false);
  };

  const view = () => m('.new-blog', [ m(nav), pageView() ]);

  return { oncreate, view };
}
