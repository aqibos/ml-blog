import m from 'mithril';

export default function BlogPreview(params) {

  // TODO: Move to util
  const truncate = (str, size = 150) => {
    const truncatedSize = size - 3;
    return str.length <= truncatedSize ? str : (str.slice(0, truncatedSize) + '...');
  };

  // TODO: Use Moment to clean up date
  const view = () => m('.blog-preview', {
    onclick: () => m.route.set('/blogs?id=' + params.id)
  },
    m('.blog-title', params.title),
    m('.blog-content', truncate(params.content)),
    m('.blog-meta', 'Posted by ' + params.username + ' on ' + new Date(params.datetime).toDateString())
  );

  return { view };

}
