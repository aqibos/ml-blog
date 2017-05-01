import m from 'mithril'

export default function textArea(name, propFn, placeholder = 'Enter Text Here') {
  return m(`.${name}-text-area`, m('textarea', {
    onchange: e => propFn(e.target.value),
    placeholder,
    value: propFn()
  }));
}
