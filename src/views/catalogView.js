import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import * as albumServices from '../services/albumServices.js';


const catalogTemplate = (albums, user) => html`
        <section id="catalogPage">
            <h1>All Albums</h1>

            ${albums.length > 0
                ? albums.map(item => cardAlbumTemplate(item, user))
                : html`<p>No Albums in Catalog!</p>`
            }

        </section>

`

const cardAlbumTemplate = (album, user) => html`
            <div class="card-box">
                <img src=${album.imgUrl}>
                <div>
                    <div class="text-center">
                        <p class="name">Name: ${album.name}</p>
                        <p class="artist">Artist: ${album.artist}</p>
                        <p class="genre">Genre: ${album.genre}</p>
                        <p class="price">Price: $${album.price}</p>
                        <p class="date">Release Date: ${album.releaseDate}</p>
                    </div>
                    ${user
                        ? html`
                        <div class="btn-group">
                            <a href="/details/${album._id}" id="details">Details</a>
                        </div>`
                        : nothing
                    }
                    
                </div>
            </div>  
`

export const catalogView = (ctx) => {
    albumServices.getAll()
        .then(albums => {
            ctx.render(catalogTemplate(albums, ctx.user))

        })
}