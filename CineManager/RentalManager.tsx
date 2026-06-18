import { useState } from 'react';
import { Movie } from '../types';
import { Star, Trash2, Search, Clapperboard, Calendar, User, Eye, Sparkles } from 'lucide-react';

interface MovieListProps {
  movies: Movie[];
  onDeleteMovie: (id: string) => void;
}

export default function MovieList({ movies, onDeleteMovie }: MovieListProps) {
  // Estados para pesquisa e filtros na listagem de filmes
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Todos');

  // Obtém lista única de gêneros cadastrados para popular o filtro dinamicamente
  const availableGenres = ['Todos', ...Array.from(new Set(movies.map((m) => m.genre)))];

  // Filtra os filmes com base na pesquisa e gênero selecionado
  const filteredMovies = movies.filter((movie) => {
    const matchesSearch =
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.synopsis.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesGenre = selectedGenre === 'Todos' || movie.genre === selectedGenre;
    
    return matchesSearch && matchesGenre;
  });

  return (
    <div id="movie-list-container" className="space-y-6">
      {/* Barra superior de Filtros e Pesquisa */}
      <div className="bg-slate-50 border border-slate-150 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-72">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            id="movie-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar filme, diretor..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-700 placeholder-slate-400"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">Gênero:</span>
          {availableGenres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`py-1 px-3 text-xs font-medium rounded-full transition-all whitespace-nowrap cursor-pointer ${
                selectedGenre === genre
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Exibição dos Filmes */}
      {filteredMovies.length === 0 ? (
        <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-12 text-center" id="movie-list-empty">
          <Clapperboard className="w-12 h-12 text-slate-350 mx-auto mb-3 stroke-1" />
          <h3 className="text-sm font-semibold text-slate-700">Nenhum filme encontrado</h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">
            {searchTerm || selectedGenre !== 'Todos'
              ? 'Tente alterar os seus filtros de pesquisa ou palavra-chave.'
              : 'Comece cadastrando um filme utilizando o formulário de cadastro ao lado!'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="movie-grid">
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              id={`movie-card-${movie.id}`}
              className="bg-white rounded-2xl border border-slate-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-300 relative group"
            >
              {/* Capa/Banner do Filme */}
              <div className="relative h-44 bg-slate-900 overflow-hidden">
                <img
                  src={movie.coverUrl || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop'}
                  alt={movie.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-80 group-hover:scale-103 transition-transform duration-500"
                />
                
                {/* Badge de Gênero */}
                <span className="absolute top-3 left-3 bg-indigo-600/90 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs">
                  {movie.genre}
                </span>

                {/* Botão de Exclusão integrado na imagem com confirmação no hover */}
                <button
                  type="button"
                  id={`delete-movie-btn-${movie.id}`}
                  onClick={() => {
                    if (confirm(`Tem certeza que deseja excluir o filme "${movie.title}" do catálogo?`)) {
                      onDeleteMovie(movie.id);
                    }
                  }}
                  className="absolute top-3 right-3 p-2 bg-red-600/90 hover:bg-red-600 text-white rounded-full transition-colors shadow-md backdrop-blur-xs focus:outline-none"
                  title="Excluir Filme"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                {/* Camada gradiente inferior para legibilidade da sinopse ou info rápida */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-3 pt-8 flex items-end justify-between">
                  <div className="flex items-center gap-1.5 bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold text-white">{movie.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-[10px] text-slate-350 font-semibold uppercase tracking-wider flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {movie.year}
                  </span>
                </div>
              </div>

              {/* Informações detalhadas do Filme */}
              <div className="p-4 flex-1 flex flex-col">
                <div className="mb-2">
                  <h3 className="font-bold text-slate-800 text-base leading-tight group-hover:text-indigo-600 transition-colors">
                    {movie.title}
                  </h3>
                  <div className="flex items-center gap-1 text-slate-500 text-xs mt-1">
                    <User className="w-3 h-3" />
                    <span className="font-medium truncate">Dir: {movie.director}</span>
                  </div>
                </div>

                {/* Sinopse resumida */}
                <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed flex-1">
                  {movie.synopsis}
                </p>

                {/* Footer do Card com estrelas de feedback visual */}
                <div className="pt-3 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3 h-3 ${
                          star <= movie.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] font-medium text-slate-400">ID: {movie.id}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
