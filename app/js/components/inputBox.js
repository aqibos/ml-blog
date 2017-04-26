import m from 'mithril'

export default function inputBox(name, propFn, type = 'text') {
  return m(`.${name}-input-container`, m('input', {
    type,
    onchange: e => propFn(e.target.value),
    placeholder: name
  }));
}
