import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import * as albumServices from '../services/albumServices.js';

const searchTemplate = (user, searchHandler, albums) => html`
    <section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
        <button class="button-list" @click=${searchHandler}>Search</button>
    </div>

    <h2>Results:</h2>

    <!--Show after click Search button-->
    <div class="search-result">
        ${albums.length > 0
            ? albums.map(item => albumTemplate(item, user))
            : html`<p class="no-result">No result.</p>`
        }
    </div>
    </section>
`

const albumTemplate = (album, user) => html`
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
                    </div>
                    `
                    : nothing
                }

            </div>
        </div>  
`

export const searchView = (ctx) => {
    const user = ctx.user;
    const searchHandler = (e) => {
        e.preventDefault();

        const searchText = document.getElementById('search-input').value;

        if(!searchText) {
            alert('Please enter something in the search field')
            return;
        }

        albumServices.search(searchText)
            .then(albums => {
                ctx.render(searchTemplate(user, searchHandler, albums))
            })

    }
    ctx.render(searchTemplate(user, searchHandler, []))
}