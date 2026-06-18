/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Interface que define a estrutura de dados de um Filme para o cadastro
export interface Movie {
  id: string;
  title: string;
  director: string;
  genre: string;
  year: number;
  synopsis: string;
  rating: number; // Avaliação de 1 a 5 estrelas
  coverUrl?: string; // URL opcional para a imagem de capa do filme
}

// Interface que define a estrutura de dados de um Membro/Cliente do Cineclube
// Atende estritamente ao requisito de formulário com pelo menos 4 campos: Nome, CPF, Endereço e Telefone
export interface Member {
  id: string;
  name: string;
  cpf: string;
  address: string;
  phone: string;
  email?: string; // Campo extra para complementar
  registrationDate: string;
}

// Interface para vincular empréstimo de filmes aos membros cadastrados
export interface Rental {
  id: string;
  movieId: string;
  memberId: string;
  rentalDate: string;
  returnDate: string;
  status: 'active' | 'returned';
}
