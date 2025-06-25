

export const TYPES = {
    // Repositories
    UserRepository: Symbol.for('UserRepository'),
    BancoSatRepository: Symbol.for('BancoSatRepository'),

    // Services
    PasswordService: Symbol.for('PasswordService'),
    JwtService: Symbol.for('JwtService'),

    //Use Cases
    CreateUserUseCase: Symbol.for('CreateUserUseCase'),
    LoginUserUseCase: Symbol.for("LoginUserUseCase"),
    GetAllBancosSatUseCase: Symbol.for('GetAllBancosSatUseCase'),

    // Controllers
    UserController: Symbol.for('UserController'),
    BancoSatController: Symbol.for("BancoSatController")
}