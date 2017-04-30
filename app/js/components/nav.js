import m from 'mithril';
import stream from 'mithril/stream';
import button from './button';
import { removeItem } from '../util/session_storage';

export default function Nav({ api, onHome }) {

  const isLogoutLoading = stream(false);
  const apiError = stream('');

  const logout = () => {
    api.logout()
    .then(res => {
      if (!res.success) throw res.errMsg;
      removeItem('user');
      m.route.set('/login');
    })
    .catch(err => { console.log(err); apiError(err); m.redraw(); })
  }
  const defaultOnHome = () => m.route.set('/home?st=0');
  const toHome = onHome || defaultOnHome;

  const homeButton = () => button('home', toHome, 'Home');
  const logoutButton = () => button('logout', logout, 'Logout', isLogoutLoading());

  const view = () => m('.nav', [ homeButton(), logoutButton() ]);

  return { view };

}
