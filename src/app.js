import page from '../node_modules/page/page.mjs';
import { authMiddleware } from './middleWares/authMiddleware.js';
import { renderContentMiddleware, renderNavigationMiddleware } from './middleWares/renderMiddleware.js';
import { catalogView } from './views/catalogView.js';
import { createView } from './views/createView.js';
import { deleteView } from './views/deleteView.js';
import { detailsView } from './views/detailsView.js';
import { editView } from './views/editView.js';
import { homeView } from './views/homeView.js';
import { loginView } from './views/loginView.js';
import { logoutView } from './views/logoutView.js';
import { registerView } from './views/registerView.js';
import { searchView } from './views/searchView.js';

page(authMiddleware)
page(renderNavigationMiddleware);
page(renderContentMiddleware)

page('/', homeView);
page('/login', loginView);
page('/logout', logoutView);
page('/register', registerView);
page('/catalog', catalogView);
page('/create', createView);
page('/search', searchView);
page('/delete/:albumId', deleteView);
page('/details/:albumId', detailsView);
page('/edit/:albumId', editView);








page.start();