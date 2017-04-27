import m from 'mithril';
import stream from 'mithril/stream';
// import button from './components/button';
// import inputBox from './components/inputBox';
// import link from './components/link';

export default function Login({ api }) {

  const username = stream('');
  const password = stream('');
  const isLoginLoading = stream(false);
  const apiError = stream('');

  const login = () => {
    isLoginLoading(true);
    apiError('');

    api.login({ username: username(), password: password() })
    .then(res => {
      if (!res.success) throw res.errMsg;

      isLoginLoading(false);
      m.route.set('/home');
      // TODO: Save user info
    })
    .catch(err => {
      apiError(err); isLoginLoading(false); m.redraw();
    });

  };

  const register = () => m.route.set('/register');

  const loadingImg = m('img', { src: 'app/images/loading-bubbles.gif' });
  const loginDialog = () => m('.login-dialog', [
    m('.title', 'Sign In'),
    m('.error', apiError()),
    // inputBox('username', username),
    // inputBox('password', password, 'password'),
    // button('login', login, 'Login', isLoginLoading()),
    // link('register', register, 'Register')

    m('.username-input-container', m('input', {
      onchange: e => { username(e.target.value); },
      placeholder: 'Username'
    })),
    m('.password-input-container', m('input', {
      onchange: e => { password(e.target.value); },
      placeholder: 'Password'
    })),
    m('.login-btn-container', m('button', {
      onclick: login
    }, isLoginLoading() ? loadingImg : 'Login')),

    m('.register-link-container', m('.link', {
      onclick: register
    }, 'I need an account!'))
  ]);

  const view = () => m('.login', loginDialog());

  return { view };

}