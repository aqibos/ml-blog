import m from 'mithril';
import stream from 'mithril/stream';
import BlogPreview from './components/blog_preview';
import LoadingView from './components/loading_view';
import Nav from './components/nav';
import button from './components/button';
import { isEmpty } from 'ramda';
import { isLoggedIn } from './util/login_helper';

export default function Home({ api }) {
  const nav = Nav({ api, onHome: () => { start(0); loadBlogs(0); } });
  const isLoadingBlogs = stream(true);
  const apiError = stream('');
  const blogList = stream([]);
  const blogCount = stream(0);
  const blogLimit = stream(0);
  const start = stream(0);

  const newBlog = () => m.route.set('/new-blog');

  function loadBlogs(blogStart = 0) {
    isLoadingBlogs(true); m.redraw();
    api.blogs('?start=' + blogStart)
    .then(res => {
      if (!res.success) throw res.errMsg;
      blogLimit(res.data.blogLimit);
      blogCount(res.data.blogCount);
      blogList(res.data.blogs);
      isLoadingBlogs(false);
      m.redraw();
    })
    .catch(err => { console.log('catch', err); isLoadingBlogs(false); apiError(err); m.redraw(); });
  }

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

  // UI Helpers
  const newBlogButton = () => isLoggedIn() ? button('new', newBlog, 'New') : [];

  const viewOlderButton = () => {
    // console.log('Blog Limit', blogLimit());
    // console.log('Blog Count', blogCount());
    const moreBlogsLeft = ((start() + 1) * blogLimit()) < blogCount();
    return moreBlogsLeft ? button('view-older', viewOlder, 'View Older →') : [];
  }

  const viewNewerButton = () => start() > 0
  ? button('view-newer', viewNewer, '← View Newer') : [];

  const blogs = () => isEmpty(blogList())
    ? m('.blog-list', 'There are no blogs here.')
    : m('.blog-list', blogList().map(b => m(BlogPreview(b))));

  const pageView = () => m('.page-view', [
    m('.title', 'Blogs'),
    newBlogButton(),
    blogs(),
    m('.pagination', [ viewNewerButton(), viewOlderButton() ])
  ]);

  // Lifecycle Methods

  const oncreate = () => {
    start(0); m.redraw();
    loadBlogs(start());
  };

  const view = () => {
    return m('.home', [
      m(nav),
      isLoadingBlogs() ? LoadingView() : pageView()
    ])
  };

  return { oncreate, view };
}
