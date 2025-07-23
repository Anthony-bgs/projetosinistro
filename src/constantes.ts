export const Constantes =  {
    dataBaseConnection: "DATABASE_CONNECTION",
    modelo_sinistro: "sinistro_model",
    modelo_usuario: "UsuarioModel"
};
export const Mensagens_Constantes = {
    sucesso_usuario: "Usuário criado com sucesso",
    usuario_nao_encontrado: "usuario não encontrado",
    usuario_erro_login: "Usuário ou senha inválidos",
    usuario_email_existente: "Email já cadastrado",
};
export enum Status_Usuario{
    ativo = "ativo",
    inativo = "inativo",
};
export const jwtConstants = {
  secret: process.env.JWT_SECRET,
};
export enum Regras_Perfil {
admin = "admin",
cliente = "cliente",
operador = "operador"
}