# zeus.dev

Portfolio de Zeus — IT Professional.

- **Frontend:** React + Vite → Firebase Hosting
- **Backend:** Supabase Edge Function (`supabase/functions/api`) → Supabase DB, Resend, GA4, status checks, chat

## Scripts

- `npm run dev` inicia o frontend
- `npm run build` gera o build do frontend
- `npm run deploy` publica o frontend no Firebase e a function `api` no Supabase
- `npm run deploy:firebase` faz build + deploy no Firebase Hosting

## Configuração

### Frontend

No deploy padrão com `zeusprotocol.cloud`, o frontend já usa:

- `https://kucdkggpxscjxksnhrma.supabase.co/functions/v1` para as rotas gerais
- `https://kucdkggpxscjxksnhrma.supabase.co/functions/v1/api` para o chat

Isso significa que, no cenário normal, você não precisa definir `VITE_API_URL` nem `VITE_AI_CHAT_URL` manualmente no Firebase.

### Backend Supabase

O backend ativo vive em `supabase/functions/api/index.ts`.

#### Essenciais do projeto

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_LEADS_TABLE=leads`

#### Integrações de negócio

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `EMAIL_FROM`

#### IA

- `AIMLAPI_API_KEY` ou `GEMINI_API_KEY`
- `AIMLAPI_MODEL`

#### Métricas

- `GA4_MEASUREMENT_ID`
- `GA4_API_SECRET`
- `GA4_DEBUG`

#### Status e entrega

- `QELOX_DOWNLOAD_URL`
- `QELOX_HEALTH_URL`

#### Domínios

Não é necessário configurar nada para o caso padrão.

Use estas variáveis apenas se mover o frontend para outro domínio:

- `ALLOWED_ORIGIN`
- `FRONTEND_URL`

#### Variáveis do Firebase, se quiser sobrescrever o padrão

- `VITE_API_URL=https://kucdkggpxscjxksnhrma.supabase.co/functions/v1`
- `VITE_AI_CHAT_URL=https://kucdkggpxscjxksnhrma.supabase.co/functions/v1/api`
