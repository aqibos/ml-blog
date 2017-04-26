import m from 'mithril';
import stream from 'mithril/stream';
import button from './components/button';
import inputBox from './components/inputBox';
import link from './components/link';

export default function Register({ api }) {

  const newUsername = stream('');
  const newPassword = stream('');
  const isRegisterLoading = stream(false);

  const register = () => {
    // TODO: api.register
    m.route.set('/home');
  }

  const login = () => m.route.set('/login');

  // TODO: Already have an account?

  const registerDialog = () => m('.register-dialog', [
    m('.title', 'Register Account'),
    inputBox('username', newUsername),
    inputBox('password', newPassword, 'password'),
    button('register', register, 'Register', isRegisterLoading()),
    link('login', login, 'Already have an account?')
  ]);

  const view = () => m('.register', registerDialog());

  return { view };

}
