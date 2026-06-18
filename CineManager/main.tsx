import React, { useState } from 'react';
import { Movie, Member, Rental } from '../types';
import { Calendar, User, Film, BookOpen, Clock, CheckCircle2, History, Plus, AlertCircle, RefreshCw } from 'lucide-react';

interface RentalManagerProps {
  movies: Movie[];
  members: Member[];
  rentals: Rental[];
  onAddRental: (rental: Rental) => void;
  onUpdateRentalStatus: (id: string, status: 'active' | 'returned') => void;
  onDeleteRental: (id: string) => void;
}

export default function RentalManager({
  movies,
  members,
  rentals,
  onAddRental,
  onUpdateRentalStatus,
  onDeleteRental
}: RentalManagerProps) {
  // Controle dos seletores de formulário de empréstimo
  const [selectedMovieId, setSelectedMovieId] = useState('');
  const [selectedMemberId, setSelectedMemberId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validação básica de vínculos
    if (!selectedMovieId) {
      setError('Por favor, selecione um filme do catálogo.');
      return;
    }
    if (!selectedMemberId) {
      setError('Por favor, selecione o membro que está retirando o filme.');
      return;
    }

    // Calcula data de devolução padrão (7 dias a partir de hoje)
    const today = new Date();
    const returnDateObj = new Date();
    returnDateObj.setDate(today.getDate() + 7);

    const newRental: Rental = {
      id: `rental-${Date.now()}`,
      movieId: selectedMovieId,
      memberId: selectedMemberId,
      rentalDate: today.toLocaleDateString('pt-BR'),
      returnDate: returnDateObj.toLocaleDateString('pt-BR'),
      status: 'active'
    };

    onAddRental(newRental);
    
    // Reseta o formulário
    setSelectedMovieId('');
    setSelectedMemberId('');
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  // Funções utilitárias para mapear IDs em nomes reais de forma segura
  const getMovieTitle = (id: string) => {
    const movie = movies.find((m) => m.id === id);
    return movie ? movie.title : 'Filme indisponível';
  };

  const getMemberName = (id: string) => {
    const member = members.find((m) => m.id === id);
    return member ? member.name : 'Membro não localizado';
  };

  return (
    <div id="rental-manager-container" className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Formulário de Novo Empréstimo */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-100 p-6 shadow-sm self-start">
          <div className="flex items-center gap-2 mb-5">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">Novo Empréstimo</h2>
              <p className="text-xs text-slate-400">Atribua um filme a um membro do Cineclube</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-2.5 text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="p-2.5 text-xs text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-xl">
                ✓ Empréstimo efetuado com sucesso! Exiba os prazos abaixo.
              </div>
            )}

            {/* Seleção do Filme */}
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Escolher Filme</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Film className="w-4 h-4" />
                </span>
                <select
                  id="rental-movie-select"
                  value={selectedMovieId}
                  onChange={(e) => setSelectedMovieId(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-700 cursor-pointer appearance-none"
                >
                  <option value="">-- Selecione o Filme --</option>
                  {movies.map((movie) => (
                    <option key={movie.id} value={movie.id}>
                      {movie.title} ({movie.year}) - {movie.genre}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Seleção do Cliente/Membro */}
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Selecionar Membro</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <User className="w-4 h-4" />
                </span>
                <select
                  id="rental-member-select"
                  value={selectedMemberId}
                  onChange={(e) => setSelectedMemberId(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-700 cursor-pointer appearance-none"
                >
                  <option value="">-- Selecione o Membro --</option>
                  {members.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name} (CPF: {member.cpf})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Botão de envio do empréstimo */}
            <button
              type="submit"
              id="rental-submit-button"
              className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs transition-colors shadow-xs active:scale-98 flex items-center justify-center gap-2 cursor-pointer pt-2"
            >
              <Plus className="w-3.5 h-3.5" />
              Efetuar Saída / Empréstimo
            </button>
          </form>
        </div>

        {/* Quadro de Monitoramento dos Empréstimos Ativos / Histórico */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-800">Status dos Empréstimos</h2>
                <p className="text-xs text-slate-400">Gerência de devoluções e rastreamento de cópias</p>
              </div>
            </div>
          </div>

          {rentals.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 border border-dashed border-slate-200 rounded-2xl" id="rentals-list-empty">
              <History className="w-10 h-10 text-slate-350 mx-auto mb-2" />
              <p className="text-xs text-slate-500 font-semibold">Sem registros de empréstimos</p>
              <p className="text-[10px] text-slate-400 max-w-xs mx-auto mt-1">
                Utilize o painel lateral para registrar a saída de um filme de ficção científica, comédia ou drama para membros cadastrados.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto" id="rentals-table-container">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="pb-3 text-slate-500">Filme</th>
                    <th className="pb-3 text-slate-500">Membro</th>
                    <th className="pb-3 text-slate-500">Datas</th>
                    <th className="pb-3 text-slate-500">Status</th>
                    <th className="pb-3 text-right text-slate-500">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-xs">
                  {rentals.map((rental) => (
                    <tr key={rental.id} className="hover:bg-slate-50/50 transition-colors" id={`rental-row-${rental.id}`}>
                      <td className="py-3 font-semibold text-slate-800 pr-2">
                        {getMovieTitle(rental.movieId)}
                      </td>
                      <td className="py-3 font-medium text-slate-600 pr-2">
                        {getMemberName(rental.memberId)}
                      </td>
                      <td className="py-3 text-slate-500 pr-2 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span>Saída: {rental.rentalDate}</span>
                          <span className="font-semibold text-indigo-600">Devo: {rental.returnDate}</span>
                        </div>
                      </td>
                      <td className="py-3 pr-2">
                        {rental.status === 'active' ? (
                          <span className="inline-flex items-center gap-1 py-0.5 px-2 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-[10px] font-semibold">
                            <Clock className="w-3 h-3" />
                            Pendente
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 py-0.5 px-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[10px] font-semibold">
                            <CheckCircle2 className="w-3 h-3" />
                            Devolvido
                          </span>
                        )}
                      </td>
                      <td className="py-3 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {rental.status === 'active' ? (
                            <button
                              type="button"
                              onClick={() => onUpdateRentalStatus(rental.id, 'returned')}
                              className="py-1 px-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-medium text-[10px] cursor-pointer flex items-center gap-1"
                              title="Marcar como devolvido"
                            >
                              <CheckCircle2 className="w-3 h-3" />
                              Devolver
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => onUpdateRentalStatus(rental.id, 'active')}
                              className="py-1 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors font-medium text-[10px] cursor-pointer flex items-center gap-1"
                              title="Reverter para pendente"
                            >
                              <RefreshCw className="w-3 h-3" />
                              Reabrir
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm('Tem certeza de que deseja excluir este registro de empréstimo?')) {
                                onDeleteRental(rental.id);
                              }
                            }}
                            className="p-1 px-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="Remover Registro Histórico"
                          >
                            Excluir
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
