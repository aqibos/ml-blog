import m from 'mithril';
import stream from 'mithril/stream';
import BlogPreview from './components/blog-preview';
import LoadingView from './components/loading_view';
import Nav from './components/nav';
import button from './components/button';

export default function Home({ api }) {
  const nav = Nav({ api, onHome: loadBlogs });
  const blogList = stream([]);
  const isLoadingBlogs = stream(true);
  const apiError = stream('');

  const blogs = () => m('.blog-list',
    blogList().map(b => m(BlogPreview(b)))
  );

  // Lifecycle Methods

  const newBlog = () => m.route.set('/new-blog');
  const newButton = () => button('new', newBlog, 'New');

  const viewOlder = () => {
    isLoadingBlogs(true); m.redraw();
    let blogStart = m.route.param('st');
    console.log('Blog Start Before', blogStart, Number.isNaN(parseInt(blogStart)));

    if (blogStart) {
      if (Number.isNaN(parseInt(blogStart))) blogStart = 1;
      else blogStart = parseInt(blogStart) + 1;
      m.route.set('/home?st=' + blogStart);
    } else {
      m.route.set('/home?st=' + 1);
    }
    loadBlogs(blogStart);
  }
  const viewOlderButton = () => blogList().length === 20
  ? button('view-older', viewOlder, 'View Older') : [];

  function loadBlogs(blogStart = 0) {
    m.route.set('/home?st=' + blogStart);
    isLoadingBlogs(true); m.redraw();
    api.blogs('?start=' + blogStart)
    .then(res => {
      if (!res.success) throw res.errMsg;
      isLoadingBlogs(false);
      blogList(res.data);
      m.redraw();
    })
    .catch(err => { console.log('catch', err); isLoadingBlogs(false); apiError(err); m.redraw(); });
  }

  const oncreate = () => {
    let blogStart = m.route.param('st');
    loadBlogs(blogStart);
  };

  const pageView = () => m('.page-view', [
    m('.title', 'Blogs'),
    newButton(),
    blogs(),
    viewOlderButton()
  ]);

  const view = () => m('.home', [
    m(nav),
    isLoadingBlogs() ? LoadingView() : pageView()
  ]);

  return { oncreate, view };
}
