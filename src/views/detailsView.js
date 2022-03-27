import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import * as albumServices from '../services/albumServices.js';
import * as authServices from '../services/authServices.js';

const detailsTemplate = (album, userId) => html`
    <section id="detailsPage">
    <div class="wrapper">
        <div class="albumCover">
            <img src=${album.imgUrl}>
        </div>
        <div class="albumInfo">
            <div class="albumText">

                <h1>Name: ${album.name}</h1>
                <h3>Artist: ${album.artist}</h3>
                <h4>Genre: ${album.genre}</h4>
                <h4>Price: $${album.price}</h4>
                <h4>Date: ${album.releaseDate}</h4>
                <p>Description: ${album.description}</p>
            </div>

            ${userId == album._ownerId
                ? html`
                <div class="actionBtn">
                    <a href="/edit/${album._id}" class="edit">Edit</a>
                    <a href="/delete/${album._id}" class="remove">Delete</a>
                </div>
                `
                : nothing
            }

        </div>
    </div>
    </section>
`

export const detailsView = (ctx) => {
    const albumId = ctx.params.albumId;
    const userId = authServices.getUserId();

    albumServices.getOne(albumId)
        .then(album => {
            ctx.render(detailsTemplate(album, userId))
        })
}