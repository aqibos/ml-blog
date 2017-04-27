import m from 'mithril';
import stream from 'mithril/stream';
import button from './components/button';
import inputBox from './components/inputBox';
import link from './components/link';

export default function Register({ api }) {

  const newUsername = stream('');
  const newPassword = stream('');
  const isRegisterLoading = stream(false);
  const apiError = stream('');

  const register = () => {
    console.log('someone is calling me');
    isRegisterLoading(true);
    apiError('');

    api.register({ username: newUsername(), password: newPassword() })
    .then(res => {
      if (!res.success) throw res.errMsg;

      isRegisterLoading(false);
      m.route.set('/home');
      // TODO: Save user info
    })
    .catch(err => {
      apiError(err); isRegisterLoading(false); m.redraw();
    });
  }

  const login = () => m.route.set('/login');

  // UI
  // const usernameInput = () =>
  //   inputBox('username', newUsername);
  // const passwordInput = () =>
  //   inputBox('password', newUsername, 'password');
  // const registerButton = () =>
  //   button('register', register, 'Register', isRegisterLoading());
  // const loginLink = () =>
  //   link('login', login, 'Already have an account?');
  const loadingImg = m('img', { src: 'app/images/loading-bubbles.gif' });
  const registerDialog = () => m('.register-dialog', [
    m('.title', 'Register Account'),
    m('.error', apiError()),
    m('.username-input-container', m('input', {
      onchange: e => { newUsername(e.target.value); },
      placeholder: 'Username'
    })),
    m('.password-input-container', m('input', {
      onchange: e => { newPassword(e.target.value); },
      placeholder: 'Password'
    })),
    m('.register-btn-container', m('button', {
      onclick: register
    }, isRegisterLoading() ? loadingImg : 'Register Account')),

    m('.login-link-container', m('.link', {
      onclick: login
    }, 'Already have an account?'))
  ]);

  const view = () => {
    console.log('Username', newUsername());
    console.log('Password', newPassword());
    return m('.register', registerDialog());
  }

  return { view };

}
