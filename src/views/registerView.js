import { html } from "../../node_modules/lit-html/lit-html.js";
import * as authServices from '../services/authServices.js';
import page from "../../node_modules/page/page.mjs";

const registerTemplate = (submitHandler) => html`
        <section id="registerPage">
            <form @submit=${submitHandler}>
                <fieldset>
                    <legend>Register</legend>

                    <label for="email" class="vhide">Email</label>
                    <input id="email" class="email" name="email" type="text" placeholder="Email">

                    <label for="password" class="vhide">Password</label>
                    <input id="password" class="password" name="password" type="password" placeholder="Password">

                    <label for="conf-pass" class="vhide">Confirm Password:</label>
                    <input id="conf-pass" class="conf-pass" name="conf-pass" type="password" placeholder="Confirm Password">

                    <button type="submit" class="register">Register</button>

                    <p class="field">
                        <span>If you already have profile click <a href="#">here</a></span>
                    </p>
                </fieldset>
            </form>
        </section>  
`

export const registerView = (ctx) => {
    const submitHandler = (e) => {
        e.preventDefault();

        const { email, password, ['conf-pass']: confPass } = Object.fromEntries(new FormData(e.currentTarget));
        
        if(!email || !password || !confPass){
            alert('All fields must be filled!');
            return;
        }

        if(password != confPass){
            alert('Passwords mismatch');
            return;
        }

        authServices.register(email, password)
            .then(() => {
                ctx.page.redirect('/')
            })
    }
    ctx.render(registerTemplate(submitHandler))
}