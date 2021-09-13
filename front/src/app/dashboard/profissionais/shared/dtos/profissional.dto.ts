export interface CreateProfissionalDto {
  nome: string;
  telefone: string;
  email: string;
  tipoDeProfissional: string;
  situacao: boolean;
}
export interface ProfissionalDto {
  id: string;
  nome: string;
  telefone?: string;
  email?: string;
  tipoDeProfissional: string;
  situacao: boolean;
  updatedAt: string;
  createdAt: string;
  tipo?: { id: string; descricao: string };
}
