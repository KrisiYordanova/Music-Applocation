import { html } from "../../node_modules/lit-html/lit-html.js";
import * as authServices from '../services/authServices.js';
import page from "../../node_modules/page/page.mjs";

const loginTemplate = (submitHandler) => html`
    <section id="loginPage">
    <form @submit=${submitHandler}>
        <fieldset>
            <legend>Login</legend>

            <label for="email" class="vhide">Email</label>
            <input id="email" class="email" name="email" type="text" placeholder="Email">

            <label for="password" class="vhide">Password</label>
            <input id="password" class="password" name="password" type="password" placeholder="Password">

            <button type="submit" class="login">Login</button>

            <p class="field">
                <span>If you don't have profile click <a href="#">here</a></span>
            </p>
        </fieldset>
    </form>
    </section>
`

export const loginView = (ctx) => {
    const submitHandler = (e) => {
        e.preventDefault();

        const { email, password } = Object.fromEntries(new FormData(e.currentTarget));
        
        if(!email || !password){
            alert('All fields must be filled!');
            return;
        }

        authServices.login(email, password)
            .then(() => {
                ctx.page.redirect('/')
            })
    }
    ctx.render(loginTemplate(submitHandler))
}