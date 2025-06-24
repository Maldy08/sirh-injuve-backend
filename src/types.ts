
export const TYPES = {
    // Repositories
    UserRepository: Symbol.for('UserRepository'),

    // Services
    PasswordService: Symbol.for('PasswordService'),
    JwtService: Symbol.for('JwtService'),

    //Use Cases
    CreateUserUseCase: Symbol.for('CreateUserUseCase'),
    LoginUserUseCase: Symbol.for("LoginUserUseCase"),

    // Controllers
    UserController: Symbol.for('UserController'),
}