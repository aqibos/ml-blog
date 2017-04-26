import m from 'mithril';
import stream from 'mithril/stream';
import button from './components/button';
import inputBox from './components/inputBox';
import link from './components/link';

export default function Login({ api }) {

  const username = stream('');
  const password = stream('');
  const isLoginLoading = stream(false);

  const login = () => {
    // TODO: api.login
    m.route.set('/home');
  };

  const register = () => {
    // TODO: api.register
    m.route.set('/register');
  };

  const loginDialog = () => m('.login-dialog', [
    m('.title', 'Sign In'),
    inputBox('username', username),
    inputBox('password', password, 'password'),
    button('login', login, 'Login', isLoginLoading()),
    link('register', register, 'Register')
  ]);

  const view = () => m('.login', loginDialog());

  return { view };

}
