import React, { useState } from 'react';
import { Member } from '../types';
import { User, CreditCard, MapPin, Phone, Mail, UserPlus } from 'lucide-react';

interface MemberFormProps {
  onAddMember: (member: Member) => void;
}

export default function MemberForm({ onAddMember }: MemberFormProps) {
  // Estados para as propriedades obrigatórias de acordo com o edital do professor:
  // Nome, CPF, Endereço e Telefone
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  
  // Campo complementar para deixar o cadastro ainda mais rico
  const [email, setEmail] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Máscara automática para CPF (Formato: 000.000.000-00)
  const formatCPF = (value: string) => {
    const raw = value.replace(/\D/g, ''); // Remove tudo que não for dígito
    if (raw.length <= 3) return raw;
    if (raw.length <= 6) return `${raw.slice(0, 3)}.${raw.slice(3)}`;
    if (raw.length <= 9) return `${raw.slice(0, 3)}.${raw.slice(3, 6)}.${raw.slice(6)}`;
    return `${raw.slice(0, 3)}.${raw.slice(3, 6)}.${raw.slice(6, 9)}-${raw.slice(9, 11)}`;
  };

  // Máscara automática para Telefone (Formato: (00) 00000-0000)
  const formatPhone = (value: string) => {
    const raw = value.replace(/\D/g, '');
    if (raw.length <= 2) return raw.length > 0 ? `(${raw}` : '';
    if (raw.length <= 7) return `(${raw.slice(0, 2)}) ${raw.slice(2)}`;
    return `(${raw.slice(0, 2)}) ${raw.slice(2, 7)}-${raw.slice(7, 11)}`;
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value);
    if (formatted.length <= 14) {
      setCpf(formatted);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    if (formatted.length <= 15) {
      setPhone(formatted);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validações obrigatórias para cumprimento do trabalho acadêmico (Critério 2)
    if (!name.trim()) {
      setError('O Nome completo é obrigatório.');
      return;
    }
    if (cpf.length < 14) {
      setError('Insira um CPF completo e válido.');
      return;
    }
    if (!address.trim()) {
      setError('O endereço residencial é obrigatório.');
      return;
    }
    if (phone.length < 14) {
      setError('Insira um número de telefone completo e válido.');
      return;
    }

    // Criação do membro com data de registro local formatada
    const newMember: Member = {
      id: `member-${Date.now()}`,
      name: name.trim(),
      cpf: cpf.trim(),
      address: address.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      registrationDate: new Date().toLocaleDateString('pt-BR')
    };

    // Callback para salvar
    onAddMember(newMember);

    // Reseta form e aciona feedback visual positivo
    setName('');
    setCpf('');
    setAddress('');
    setPhone('');
    setEmail('');
    setSuccess(true);

    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div id="member-form-container" className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
          <UserPlus className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800">Cadastrar Membro</h2>
          <p className="text-xs text-slate-500">Formulário de cadastro obrigatório (Nome, CPF, Endereço, Telefone)</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl" id="member-form-error">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 text-sm text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-xl" id="member-form-success">
            ✓ Membro cadastrado com sucesso no Cineclube UFN!
          </div>
        )}

        {/* 1. Nome Completo */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Nome Completo *</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <User className="w-4 h-4" />
            </span>
            <input
              type="text"
              id="member-form-name-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Gabriel Machado Orling"
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors text-slate-800"
            />
          </div>
        </div>

        {/* 2. CPF (Com máscara) */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">CPF * (Formatado)</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <CreditCard className="w-4 h-4" />
            </span>
            <input
              type="text"
              id="member-form-cpf-input"
              value={cpf}
              onChange={handleCpfChange}
              placeholder="000.000.000-00"
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors text-slate-800"
            />
          </div>
        </div>

        {/* 3. Endereço */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Endereço Residencial *</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <MapPin className="w-4 h-4" />
            </span>
            <input
              type="text"
              id="member-form-address-input"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Rua, número, bairro, cidade - UF"
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors text-slate-800"
            />
          </div>
        </div>

        {/* 4. Telefone (Com máscara) e E-mail (Opcional) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Telefone / Celular *</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Phone className="w-4 h-4" />
              </span>
              <input
                type="text"
                id="member-form-phone-input"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="(55) 99999-0000"
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">E-mail (Opcional)</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                id="member-form-email-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="gabrielorling1515@gmail.com"
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors text-slate-800"
              />
            </div>
          </div>
        </div>

        {/* Botão para cadastrar e salvar membro */}
        <button
          type="submit"
          id="member-form-submit-button"
          className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-all duration-200 shadow-sm hover:shadow active:scale-98 flex items-center justify-center gap-2 cursor-pointer mt-2"
        >
          <UserPlus className="w-4 h-4" />
          Cadastrar Membro
        </button>
      </form>
    </div>
  );
}
