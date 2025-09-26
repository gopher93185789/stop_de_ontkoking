pub struct AuthService {
    pub dsn: String
}

impl AuthService {
    pub fn new(dsn: &str) -> Self {
        AuthService {dsn: dsn.to_string()}
    }
}

