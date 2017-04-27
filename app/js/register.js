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

  const registerDialog = () => m('.register-dialog', [
    m('.title', 'Register Account'),
    m('.error', apiError()),
    inputBox('username', newUsername),
    inputBox('password', newPassword, 'password'),
    button('register', register, 'Register', isRegisterLoading()),
    link('login', login, 'Already have an account?')
  ]);

  const oncreate = () => { newUsername(''); newPassword(''); apiError(''); m.redraw(); };

  const view = () => m('.register', registerDialog());

  return { oncreate, view };

}