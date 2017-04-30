import m from 'mithril';
import stream from 'mithril/stream';
import button from './components/button';
import inputBox from './components/inputBox';
import link from './components/link';
import { setItem } from './util/session_storage';

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
      return api.login({ username: newUsername(), password: newPassword() })
    })
    .then(res => {
      if (!res.success) throw 'Register succeeded, but login failed. Please try logging in.'
      isRegisterLoading(false);
      setItem('user', res.data);
      m.route.set('/home');
    })
    .catch(err => {
      apiError(err); isRegisterLoading(false); m.redraw();
    });
  }

  const login = () => m.route.set('/login');

  const registerDialog = () => m('.register-dialog', [
    m('.title', 'Register Account'),
    m('.error', apiError()),
    inputBox('username', newUsername, 'text', 'Username'),
    inputBox('password', newPassword, 'password', 'Password'),
    button('register', register, 'Register', isRegisterLoading()),
    link('login', login, 'Already have an account?')
  ]);

  const oncreate = () => { newUsername(''); newPassword(''); apiError(''); m.redraw(); };

  const view = () => m('.register', registerDialog());

  return { oncreate, view };

}