import m from 'mithril';
import stream from 'mithril/stream';
import button from './button';

export default function Nav({ api }) {

  const isLogoutLoading = stream(false);

  const logout = () => {
    // TODO: api.logout
    m.route.set('/login');
  }
  const toHome = () => m.route.set('/home');

  const homeButton = () => button('home', toHome, 'Home');
  const logoutButton = () => button('logout', logout, 'Logout', isLogoutLoading());

  const view = () => m('.nav', [ homeButton(), logoutButton() ]);

  return { view };

}
