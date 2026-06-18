import React, { useState } from 'react';
import { Movie } from '../types';
import { Film, User, Calendar, Tag, FileText, Star, Image as ImageIcon, Plus } from 'lucide-react';

interface MovieFormProps {
  onAddMovie: (movie: Movie) => void;
}

// Lista de gêneros predefinidos para facilitar a escolha do usuário
const GENRES = [
  'Ação',
  'Aventura',
  'Comédia',
  'Drama',
  'Ficção Científica',
  'Animação',
  'Terror',
  'Suspense',
  'Romance',
  'Documentário'
];

// Imagens de capa padrão para o usuário escolher rapidamente se não tiver uma URL
const PRESET_COVERS = [
  { name: 'Geral', url: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop' },
  { name: 'Espaço', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop' },
  { name: 'Teatro', url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop' },
  { name: 'Pipoca', url: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?q=80&w=600&auto=format&fit=crop' }
];

export default function MovieForm({ onAddMovie }: MovieFormProps) {
  // Estados locais para controlar cada campo do formulário de filme
  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [genre, setGenre] = useState('Comédia');
  const [year, setYear] = useState(new Date().getFullYear());
  const [synopsis, setSynopsis] = useState('');
  const [rating, setRating] = useState(5);
  const [coverUrl, setCoverUrl] = useState(PRESET_COVERS[0].url);
  const [customCover, setCustomCover] = useState('');
  const [isUsingCustomCover, setIsUsingCustomCover] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Manipulador de submissão do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validação básica dos campos obrigatórios
    if (!title.trim()) {
      setError('O título do filme é obrigatório.');
      return;
    }
    if (!director.trim()) {
      setError('O nome do diretor é obrigatório.');
      return;
    }
    if (!synopsis.trim()) {
      setError('Insira uma breve sinopse para o filme.');
      return;
    }
    if (year < 1880 || year > new Date().getFullYear() + 5) {
      setError(`Insira um ano de lançamento válido (entre 1880 e ${new Date().getFullYear() + 5}).`);
      return;
    }

    // Define a URL final da capa do filme (Customizada ou do Preset Selecionado)
    const finalCover = isUsingCustomCover && customCover.trim() ? customCover.trim() : coverUrl;

    // Cria o novo filme
    const newMovie: Movie = {
      id: `movie-${Date.now()}`,
      title: title.trim(),
      director: director.trim(),
      genre,
      year: Number(year),
      synopsis: synopsis.trim(),
      rating,
      coverUrl: finalCover
    };

    // Aciona a callback para salvar o item
    onAddMovie(newMovie);

    // Limpa o formulário e sinaliza sucesso ao usuário
    setTitle('');
    setDirector('');
    setSynopsis('');
    setYear(new Date().getFullYear());
    setRating(5);
    setCustomCover('');
    setSuccess(true);
    
    // Remove o aviso de sucesso após 3 segundos
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div id="movie-form-container" className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
          <Film className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800">Cadastrar Novo Filme</h2>
          <p className="text-xs text-slate-500">Adicione filmes ao catálogo permanente do cineclube</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl" id="movie-form-error">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 text-sm text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-xl" id="movie-form-success">
            ✓ Filme cadastrado com sucesso e adicionado ao catálogo!
          </div>
        )}

        {/* Linha do Título */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Título do Filme *</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Film className="w-4 h-4" />
            </span>
            <input
              type="text"
              id="movie-form-title-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: O Auto da Compadecida"
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors text-slate-800"
            />
          </div>
        </div>

        {/* Linha de Diretor e Ano */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Diretor(a) *</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <User className="w-4 h-4" />
              </span>
              <input
                type="text"
                id="movie-form-director-input"
                value={director}
                onChange={(e) => setDirector(e.target.value)}
                placeholder="Ex: Guel Arraes"
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Ano de Lançamento *</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Calendar className="w-4 h-4" />
              </span>
              <input
                type="number"
                id="movie-form-year-input"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                min="1880"
                max={new Date().getFullYear() + 5}
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors text-slate-800"
              />
            </div>
          </div>
        </div>

        {/* Gênero e Avaliação */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Gênero do Filme</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Tag className="w-4 h-4" />
              </span>
              <select
                id="movie-form-genre-select"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors text-slate-800 appearance-none cursor-pointer"
              >
                {GENRES.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Avaliação Inicial</label>
            <div className="flex items-center gap-2 py-1.5 px-3 bg-slate-50 border border-slate-200 rounded-xl">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className="focus:outline-none transition-transform hover:scale-115"
                >
                  <Star
                    className={`w-5 h-5 ${
                      star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs font-bold text-slate-600 ml-2">{rating} / 5</span>
            </div>
          </div>
        </div>

        {/* Sinopse */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Sinopse / Resumo *</label>
          <div className="relative">
            <span className="absolute top-2.5 left-3 text-slate-400">
              <FileText className="w-4 h-4" />
            </span>
            <textarea
              id="movie-form-synopsis-textarea"
              value={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
              placeholder="Insira um pequeno resumo sobre o enredo, personagens e curiosidades gerais..."
              rows={3}
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors text-slate-800 resize-none"
            />
          </div>
        </div>

        {/* Escolha da Imagem de Capa */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Imagem de Capa / Poster</label>
          
          <div className="flex items-center gap-4 mb-3">
            <button
              type="button"
              onClick={() => setIsUsingCustomCover(false)}
              className={`py-1 px-3 text-xs font-medium rounded-full border transition-colors ${
                !isUsingCustomCover
                  ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              Capa Padrão
            </button>
            <button
              type="button"
              onClick={() => setIsUsingCustomCover(true)}
              className={`py-1 px-3 text-xs font-medium rounded-full border transition-colors ${
                isUsingCustomCover
                  ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              Link Personalizado (URL)
            </button>
          </div>

          {!isUsingCustomCover ? (
            <div className="grid grid-cols-4 gap-2">
              {PRESET_COVERS.map((cover) => (
                <button
                  type="button"
                  key={cover.name}
                  onClick={() => setCoverUrl(cover.url)}
                  className={`relative h-14 rounded-xl overflow-hidden border-2 transition-all ${
                    coverUrl === cover.url ? 'border-indigo-600 ring-2 ring-indigo-100' : 'border-transparent hover:opacity-80'
                  }`}
                >
                  <img src={cover.url} alt={cover.name} className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 inset-x-0 bg-slate-900/60 text-[10px] text-white py-0.5 text-center font-medium">
                    {cover.name}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <ImageIcon className="w-4 h-4" />
              </span>
              <input
                type="url"
                id="movie-form-cover-input"
                value={customCover}
                onChange={(e) => setCustomCover(e.target.value)}
                placeholder="https://exemplo.com/imagem-poster.jpg"
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors text-slate-800"
              />
            </div>
          )}
        </div>

        {/* Botão de Envio */}
        <button
          type="submit"
          id="movie-form-submit-button"
          className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-all duration-200 shadow-sm hover:shadow active:scale-98 flex items-center justify-center gap-2 cursor-pointer mt-2"
        >
          <Plus className="w-4 h-4" />
          Salvar Filme no Catálogo
        </button>
      </form>
    </div>
  );
}
