import 'babel-polyfill';
import m from 'mithril';

import api from './api/api';

// Page Components
import Home from './home';
import Login from './login';
import Register from './register';
import Blog from './blog';
import NewBlog from './new_blog';

import Test from './test';

m.route(document.querySelector('#app'), '/', {
  '/': Login({ api }),
  '/login': Login({ api }),
  '/register': Register({ api }),
  '/home': Home({ api }),
  '/blogs': Blog({ api }),
  '/new-blog': NewBlog({ api }),
  '/test': Test({ })
});
