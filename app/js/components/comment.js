import m from 'mithril';

export default function Comment(params) {

  const view = () => m('.comment', {
    onclick: () => {}
    // TODO: Delete or edit
  },
    m('.comment-content', params.content),
    m('.comment-meta', 'Posted by ' + params.username + ' on ' + new Date(params.datetime).toDateString())
  );

  return { view };

}

