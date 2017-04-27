import m from 'mithril';
import stream from 'mithril/stream';
import button from './button';

export default function Nav({ api }) {

  const isLogoutLoading = stream(false);
  const apiError = stream('');

  const logout = () => {
    api.logout()
    .then(res => {
      if (!res.success) throw res.errMsg;
      m.route.set('/login');
    })
    .catch(err => { console.log(err); apiError(err); m.redraw(); })
  }
  const toHome = () => m.route.set('/home');

  const newBlog = () => m.route.set('/new-blog');

  const homeButton = () => button('home', toHome, 'Home');
  const logoutButton = () => button('logout', logout, 'Logout', isLogoutLoading());
  const newButton = () => button('new', newBlog, 'New');

  const view = () => m('.nav', [ homeButton(), newButton(), logoutButton() ]);

  return { view };

}
