use super::models::AuthService;


impl AuthService {
    pub fn signup(&self) {
        println!("signup {}", self.dsn)
    }

    pub fn login(&self) {
         println!("login {}", self.dsn)
    }

    pub fn refresh_session(&self) {
         println!("Refresh {}", self.dsn)
    }
}