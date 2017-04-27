import m from 'mithril';
import stream from 'mithril/stream';
import BlogPreview from './components/blog-preview';
import LoadingView from './components/loading_view';
import Nav from './components/nav';

export default function Home({ api }) {

  const nav = Nav({ api });
  const blogList = stream([]);
  const isLoadingBlogs = stream(true);
  const apiError = stream('');

  const blogs = () => m('.blog-list',
    // id, username, title, content, datetime
    blogList().map(b => m(BlogPreview(b)))
  );

  // Lifecycle Methods

  const oncreate = () => {
    api.blogs()
    .then(res => {
      console.log('res', res);

      if (!res.success) throw res.errMsg;
      isLoadingBlogs(false);
      blogList(res.data);
      m.redraw();
    })
    .catch(err => { console.log('catch', err); isLoadingBlogs(false); apiError(err); m.redraw(); });
  };

  const pageView = () => m('.page-view', [ m('.title', 'Blogs'), blogs() ]);

  const view = () => m('.home', [
    m(nav),
    isLoadingBlogs() ? LoadingView() : pageView()
  ]);

  return { oncreate, view };

}
