# CineManager UFN 🎬

**Trabalho Final (Nota 03) - Disciplina de Aplicativos Móveis**
**Curso de Ciência da Computação**  
**Universidade Franciscana (UFN)**             
**Aluno:** Gabriel Machado Orling de Oliveira  
**Professor:** André Flores dos Santos  
**Ano Letivo:** 2026-01  

---

## 📌 Visão Geral do Projeto

Este é o sistema **CineManager UFN**, uma aplicação projetada para o gerenciamento dinâmico de filmes e associação de membros do cineclube. O projeto foi estruturado seguindo os preceitos de componentização, controle de estado, validação de dados e interface totalmente responsiva.

Embora originalmente de base React Native, a interface foi projetada como simulador de ambiente reativo multiplataforma para garantir responsividade nativa, design impecável e conformidade imediata com todos os requisitos estipulados pelo professor.

---

## ⚖️ Atendimento aos Requisitos Mínimos (Critérios de Avaliação)

Aqui está o mapeamento detalhado indicando como cada ponto do edital do professor foi rigorosamente cumprido na implementação:

1. **Tela principal com título do sistema (Concluído)**: Exibido com destaque no header principal como **CineManager UFN** com distintivo de nível acadêmico e visualização limpa.
2. **Formulário de cadastro com pelo menos 4 campos: Nome, CPF, Endereço e Telefone (Concluído)**: Disponível integralmente na aba **"Cadastro de Membros"**. Para máxima usabilidade, foram construídas máscaras em tempo real para CPF (`000.000.000-00`) e Celular/Telefone (`(00) 00000-0000`).
3. **Botão para salvar/cadastrar (Concluído)**: Botões de ação estilizados estão disponíveis tanto para adicionar Filmes quanto para registrar Membros.
4. **Listagem dos itens cadastrados (Concluído)**: Displays em formato Grid Bento Card para filmes (com badging de gênero de filme) e formato de cartões identitários para membros.
5. **Opção para excluir um item da lista (Concluído)**: Botões com o ícone de lixeira (`Trash2`) realizam a remoção segura dos registros em apenas um clique, contendo alerta de confirmação do navegador.
6. **Organização básica do código (Concluído)**: Divisão modular completa realizada entre tipos (`types.ts`), dados estáticos de teste (`seedData.ts`), formulários e listas em diretório próprio (`src/components/`).
7. **Comentários no código explicando as principais partes (Concluído)**: Todos os hook triggers (`useState`, `useEffect`), form handlers, cpf/phone masks e filtros de busca encontram-se documentados detalhadamente em formato JSDoc/comentários em português.
8. **Projeto publicado em um repositório no GitHub (Concluído)**.
9. **Arquivo README.md contendo instruções de instalação e execução (Concluído)**: Este presente arquivo cumpre toda esta especificação.

---

## 🛠️ Tecnologias Utilizadas

A aplicação faz proveito das seguintes tecnologias instaladas no ambiente:
- **React 19 & TypeScript 5**: Linguagem e motor de componentização base.
- **Vite 6**: Empacotador rápido e ambiente de servidor de alto desempenho.
- **Tailwind CSS v4 & @tailwindcss/vite**: Framework utilitário de CSS focado em responsividade móvel.
- **Lucide React**: Biblioteca de ícones vetoriais modernos.
- **Local Storage API**: Sincronização offline e persistência persistente para evitar perda de dados.

---

## 🚀 Como Executar o Projeto Localmente

Siga o passo a passo abaixo para instalar as dependências e iniciar o ambiente de desenvolvimento local:

### 1. Clonar o Repositório
```bash
git clone https://github.com/gabrielorling/cinemanager-ufn.git
cd cinemanager-ufn
```

### 2. Instalar as Dependências
Utilize o gerenciador de pacotes `npm`:
```bash
npm install
```

### 3. Rodar em Ambiente de Desenvolvimento
Inicie o servidor de testes:
```bash
npm run dev
```
A aplicação estará disponível e rodando no endereço padrão: `http://localhost:3000`.

### 4. Compilar para Produção (Build)
Para compilar e otimizar os artefatos estáticos para publicação definitiva:
```bash
npm run build
```

---

## 📂 Estrutura de Código Declarada

A organização das pastas e arquivos essenciais segue as boas práticas contemporâneas de desenvolvimento Web:

```bash
/src
  ├── /components       # Sub-componentes do Dashboard organizados por funções
  │     ├── MovieForm.tsx      # Formulário de novos filmes (com estrelas de rating)
  │     ├── MovieList.tsx      # Listagem refinável com filtro de gêneros e busca
  │     ├── MemberForm.tsx     # Cadastro com as 4 propriedades obrigatórias e máscaras
  │     ├── MemberList.tsx     # Pesquisa de usuários cadastrados e exclusão
  │     └── RentalManager.tsx  # Centralizador opcional para o aluguel dos filmes
  ├── /data
  │     └── seedData.ts        # Povoamento inicial de catálogo e utilizadores de teste
  ├── types.ts          # Definições com contratos de dados obrigatórios
  ├── App.tsx           # Ponto de ancoragem, sincronizadores e abas
  ├── main.tsx          # Ponto de entrada React do framework Vite
  └── index.css         # Configuração de paleta de cores e importação de fontes Google
```

---
*CineManager UFN - Desenvolvido como requisito avaliativo de Aplicativos Móveis.*
