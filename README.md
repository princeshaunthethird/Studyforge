# StudyForge

A personal AI learning workspace that turns lecture materials into a structured, source-linked knowledge base.

## Current demo

The first frontend prototype includes a responsive dashboard, subject navigation, topic search, topic detail preview, review queue, and upload interaction. The API includes a health endpoint and sample topic endpoint. These are demo interactions; file processing, authentication, persistence, and AI generation are not connected yet.

## Requirements

- Node.js 20.9+ (LTS recommended)
- Python 3.11+
- Git

## Run the frontend

From the repository root:

```powershell
npm install
npm run dev
```

Open http://localhost:3000. To view on a phone on the same Wi-Fi, find your Windows IPv4 address with `ipconfig`, then open `http://YOUR-IP:3000` on the phone. Allow Node.js through Windows Firewall on private networks if prompted.

## Run the API (separate terminal)

```powershell
cd apps\api
py -m venv .venv
.venv\Scripts\Activate.ps1
py -m pip install -r requirements.txt
py -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

API health: http://localhost:8000/health
API docs: http://localhost:8000/docs

## Next implementation steps

1. Supabase project, authentication, private storage and PostgreSQL schema.
2. Real upload flow with file validation and document records.
3. PPTX/PDF extraction with slide-level source provenance.
4. Topic candidate extraction and human approval.
5. Structured learning-resource generation and validation.
