import 'babel-polyfill';
import 'es6-promise/auto'; // IE versions don't support promises

import m from 'mithril';
import Pusher from 'pusher-js';

import api from './api/api';

// Page Components
import Home from './home';
import Login from './login';
import Register from './register';
import Blog from './blog';
import NewBlog from './new_blog';

const pusher = new Pusher('b32a71dbca252fd8e791', { encrypted: true });
const home = Home({ api });

m.route(document.querySelector('#app'), '/', {
  '/': Login({ api }),
  '/login': Login({ api }),
  '/register': Register({ api }),
  '/home': { view: () => m(home) },
  '/blogs': Blog({ api, pusher }),
  '/new-blog': NewBlog({ api })
});
