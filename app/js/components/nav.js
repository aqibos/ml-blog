import m from 'mithril';
import stream from 'mithril/stream';
import button from './button';
import { removeItem } from '../util/session_storage';
import { isLoggedIn } from '../util/login_helper';

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
  const login = () => m.route.set('/login');
  const defaultOnHome = () => m.route.set('/home');
  const toHome = onHome || defaultOnHome;

  const loginButton = () => button('login', login, 'Login');
  const homeButton = () => button('home', toHome, 'Home');
  const logoutButton = () => button('logout', logout, 'Logout', isLogoutLoading());

  const view = () => m('.nav', [
    homeButton(),
    isLoggedIn() ? logoutButton() : loginButton()
  ]);

  return { view };

}
