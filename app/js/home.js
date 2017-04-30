import m from 'mithril';
import stream from 'mithril/stream';
import BlogPreview from './components/blog-preview';
import LoadingView from './components/loading_view';
import Nav from './components/nav';
import button from './components/button';
import { isEmpty } from 'ramda';

export default function Home({ api }) {
  const nav = Nav({ api, onHome: () => { start(0); loadBlogs(0); } });
  const blogList = stream([]);
  const isLoadingBlogs = stream(true);
  const apiError = stream('');
  const blogCount = stream(0);
  const start = stream(0);

  const blogs = () => isEmpty(blogList())
    ? m('.blog-list', 'There are no blogs here.')
    : m('.blog-list', blogList().map(b => m(BlogPreview(b))));

  // Lifecycle Methods

  const newBlog = () => m.route.set('/new-blog');
  const newButton = () => button('new', newBlog, 'New');

  const viewOlder = () => {
    isLoadingBlogs(true); m.redraw();
    start(start() + 1);
    loadBlogs(start);
  }

  const viewNewer = () => {
    isLoadingBlogs(true); m.redraw();
    if (start() > 0) start(start() - 1);
    loadBlogs(start);
  }

  const viewOlderButton = () => ((start() + 1) * 20) < blogCount()
  ? button('view-older', viewOlder, 'View Older →') : [];

  const viewNewerButton = () => start() > 0
  ? button('view-newer', viewNewer, '← View Newer') : [];

  function loadBlogs(blogStart = 0) {
    isLoadingBlogs(true); m.redraw();
    api.blogs('?start=' + blogStart)
    .then(res => {
      if (!res.success) throw res.errMsg;
      isLoadingBlogs(false);
      blogCount(res.data.blogCount);
      blogList(res.data.blogs);
      m.redraw();
    })
    .catch(err => { console.log('catch', err); isLoadingBlogs(false); apiError(err); m.redraw(); });
  }

  const oncreate = () => {
    start(0); m.redraw();
    loadBlogs(start());
  };

  const pageView = () => m('.page-view', [
    m('.title', 'Blogs'),
    newButton(),
    blogs(),
    m('.pagination', [ viewNewerButton(), viewOlderButton() ])
  ]);

  const view = () => {
    console.log('view', start(), blogCount());
    return m('.home', [
      m(nav),
      isLoadingBlogs() ? LoadingView() : pageView()
    ])
  };

  return { oncreate, view };
}
