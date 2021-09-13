export interface authLoginDto {
  user: {
    id: string;
    nome: string;
    email: string;
  };
  access_token: string;
}
export interface LoginDto {
  id: string;
  nome: string;
  email: string;
  senha?: string;
}
export interface CreateLoginDto {
  nome: string;
  email: string;
  senha: string;
}
