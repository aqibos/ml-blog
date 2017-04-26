import m from 'mithril';

export default function link (name, onclick, text = 'Link') {
  return m(`.${name}-link-container`, m('.link', { onclick }, text));
}
