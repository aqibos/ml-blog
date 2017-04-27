import m from 'mithril';
import axios from 'axios';

export default function Test({ }) {

  const login = () => {
    // api.login({ username: 'aqib', password: '' })
    return axios({
      method: 'POST',
      url: 'http://localhost:1338/login',
      data: { username: 'aqib', password: ''},
      withCredentials: true
    })
    .then(res => { console.log(res); })
    .catch(err => { console.log(err); });
  }

  const view = () => m('button', { onclick: login }, 'Click')

  return { view };

}