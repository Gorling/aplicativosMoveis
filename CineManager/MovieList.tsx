import { Movie, Member, Rental } from '../types';

// Filmes iniciais para povoar o sistema de forma bonita e profissional
export const initialMovies: Movie[] = [
  {
    id: 'movie-1',
    title: 'O Auto da Compadecida',
    director: 'Guel Arraes',
    genre: 'Comédia',
    year: 2000,
    synopsis: 'As aventuras dos nordestinos João Grilo e Chicó, que vivem enganando o povo do pequeno vilarejo de Taperoá, até que precisam enfrentar o temido cangaceiro Severino de Aracaju e se submeter ao julgamento de Nossa Senhora.',
    rating: 5,
    coverUrl: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'movie-2',
    title: 'Interestelar',
    director: 'Christopher Nolan',
    genre: 'Ficção Científica',
    year: 2014,
    synopsis: 'Uma equipe de exploradores viaja através de um buraco de minhoca no espaço, em uma tentativa desesperada de garantir a sobrevivência da humanidade em uma Terra que está morrendo.',
    rating: 5,
    coverUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'movie-3',
    title: 'Cidade de Deus',
    director: 'Fernando Meirelles',
    genre: 'Drama',
    year: 2002,
    synopsis: 'Buscapé é um jovem pobre, negro e muito sensível, que cresce no universo violento da favela Cidade de Deus, no Rio de Janeiro. Ele encontra na fotografia uma saída para não se tornar um criminoso.',
    rating: 5,
    coverUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'movie-4',
    title: 'O Rei Leão',
    director: 'Roger Allers, Rob Minkoff',
    genre: 'Animação',
    year: 1994,
    synopsis: 'Enganado por seu tio Scar, o pequeno leão Simba foge do seu reino para o exílio após a trágica morte de seu pai Mufasa. Com a ajuda de Timão e Pumba, ele retorna como adulto para reivindicar o trono.',
    rating: 4,
    coverUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop'
  }
];

// Membros iniciais que atendem a todos os requisitos (Nome, CPF, Endereço e Telefone)
export const initialMembers: Member[] = [
  {
    id: 'member-1',
    name: 'Gabriel Machado Orling',
    cpf: '123.456.789-00',
    address: 'Av. Roraima, 1000 - Camobi, Santa Maria - RS',
    phone: '(55) 99123-4567',
    email: 'gabrielorling1515@gmail.com',
    registrationDate: '18/06/2026'
  },
  {
    id: 'member-2',
    name: 'Ana Maria Souza',
    cpf: '987.654.321-11',
    address: 'Rua dos Andradas, 1234 - Centro, Santa Maria - RS',
    phone: '(55) 98888-2233',
    email: 'anamaria@ufn.edu.br',
    registrationDate: '10/06/2026'
  }
];

// Empréstimos iniciais para conectar ambas as operações na interface
export const initialRentals: Rental[] = [
  {
    id: 'rental-1',
    movieId: 'movie-1',
    memberId: 'member-1',
    rentalDate: '15/06/2026',
    returnDate: '22/06/2026',
    status: 'active'
  }
];
