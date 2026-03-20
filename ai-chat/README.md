# Zeus Protocol AI Chat

Sistema local de chat com IA para qualificacao de leads usando:

- Node.js + Express
- Ollama local
- MongoDB + Mongoose
- Frontend em HTML, CSS e JavaScript puro

## Arquivos principais

- `server.js`
- `models/Lead.js`
- `frontend.html`

## Como rodar

```bash
cd ai-chat
cp .env.example .env
npm install
npm run dev
```

Acesse `http://localhost:3010`.

## Requisitos locais

1. MongoDB ativo em `mongodb://127.0.0.1:27017`
2. Ollama ativo com um modelo instalado, por exemplo:

```bash
ollama pull mistral
ollama run mistral
```

O backend chama `http://127.0.0.1:11434/api/generate` e salva leads automaticamente quando detecta email ou intencao comercial.

## Deploy em producao

### Railway

O diretorio ja inclui [railway.toml](/home/zeus/Documentos/zeus-portfolio/ai-chat/railway.toml).

Variaveis recomendadas:

```bash
HOST=0.0.0.0
PORT=3010
MONGODB_URI=<mongodb atlas ou instancia privada>
OLLAMA_URL=http://<servidor-ollama>:11434/api/generate
OLLAMA_MODEL=mistral
CORS_ORIGIN=https://zeus.dev,https://www.zeus.dev
```

### Frontend

No frontend React, defina:

```bash
VITE_AI_CHAT_URL=https://seu-backend-publico-do-chat
```

Sem isso, o widget vai continuar apontando para `http://localhost:3010`.
