@AGENTS.md

## 🖥️ Деплой (production, self-hosted)

Проект в проде на домашнем сервере Ильнура (НЕ Vercel):
- **URL:** https://poznaisebya27.ru (Docker, Next.js standalone, порт 3002 за nginx+SSL)
- **Supabase:** self-hosted `https://supabase.helper27.ru` — НЕ облачный `*.supabase.co` (облако душится РКН за Cloudflare). Ключи ANON/SERVICE свои (другой JWT_SECRET), в `.env` на сервере.
- **Данные в РФ** (152-ФЗ): БД + auth на своём сервере. Из зарубежного — только DeepSeek (Китай) для ИИ. В политике конфиденциальности НЕ указывать передачу в США/ЕС.
- **npm в Docker:** сборка через зеркало `registry.npmmirror.com` (npmjs душится РКН по IPv4).
- **Деплой обновлений:** push в master → на сервере `cd ~/projects/poznai-sebya && git pull && docker compose up -d --build`.
- Инфра-шпаргалка сервера: `C:\Users\ilray\Claude\SERVER.md`.
