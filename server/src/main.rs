mod auth;

use auth::models::AuthService;

fn main() {
    let auth = AuthService::new("hello");

    auth.login();
    auth.signup();
    auth.refresh_session();
}
