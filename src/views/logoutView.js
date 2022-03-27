import * as authServices from '../services/authServices.js';
import page from '../../node_modules/page/page.mjs';

export const logoutView = (ctx) => {
    authServices.logout().then(() => {
        ctx.page.redirect('/')
    })
}