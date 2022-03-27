import * as albumServices from '../services/albumServices.js';
import page from '../../node_modules/page/page.mjs';

export const deleteView = (ctx) => {
    const albumId = ctx.params.albumId;

    albumServices.deleteAlbum(albumId)
        .then(() => {
            ctx.page.redirect('/catalog')
        })

}