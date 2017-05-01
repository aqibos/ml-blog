import m from 'mithril';
import stream from 'mithril/stream';
import button from './components/button';
import inputBox from './components/inputBox';
import link from './components/link';
import { setItem } from './util/session_storage';
import { omit } from 'ramda';

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
      setItem('user', omit(['password'], res.data));
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
    inputBox('username', username, 'text', 'Username'),
    inputBox('password', password, 'password', 'Password'),
    button('login', login, 'Login', isLoginLoading()),
    link('register', register, 'Register')
  ]);

  const oncreate = () => { username(''); password(''); apiError(''); m.redraw(); };

  const view = () => m('.login', loginDialog());

  return { oncreate, view };

}