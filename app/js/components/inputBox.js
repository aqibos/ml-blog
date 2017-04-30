import m from 'mithril'

export default function inputBox(name, propFn, type = 'text', placeholder = 'Enter Text') {
  return m(`.${name}-input-container`, m('input', {
    type,
    onchange: e => { propFn(e.target.value) },
    placeholder,
    value: propFn()
  }));
}
