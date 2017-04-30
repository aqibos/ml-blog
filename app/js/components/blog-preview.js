import m from 'mithril';
import { dateWithTime } from '../util/format';
import { truncate } from '../util/util_functions';

export default function BlogPreview(params) {

  const view = () => m('.blog-preview', {
    onclick: () => m.route.set('/blogs?id=' + params.id)
  },
    m('.blog-title', params.title),
    m('.blog-content', truncate(params.content)),
    m('.blog-meta', 'Posted by ' + params.username + ' on ' + dateWithTime(params.datetime))
  );

  return { view };

}
