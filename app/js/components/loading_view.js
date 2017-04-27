import m from 'mithril';

export default function LoadingView() {

  return m('.loading-view', m('img', { src: 'app/images/loading-bubbles.gif' }));

}