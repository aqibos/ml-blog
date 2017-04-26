import m from 'mithril';
import stream from 'mithril/stream';
import Nav from './components/nav';
import inputBox from './components/inputBox';
import textArea from './components/textArea';
import button from './components/button';

export default function NewBlog({ api }) {

  const blogTitle = stream('');
  const blogContent = stream('');
  const isNewBlogLoading = stream(false);

  const createBlog = () => {
    // TODO: api.createBlog
    m.route.set('/home');
  };

  const nav = Nav({ api });

  const pageView = () => m('.page-view', [
    m('.title', 'Create A New Blog'),
    inputBox('blog-title', blogTitle),
    textArea('blog-content', blogContent),
    button('new-blog', createBlog, 'Create Blog',isNewBlogLoading())
  ]);

  const view = () => m('.new-blog', [ m(nav), pageView() ]);

  return { view };
}
