from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="StudyForge API", version="0.1.0", description="Backend for the StudyForge learning workspace")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class HealthResponse(BaseModel):
    status: str
    service: str
    version: str

@app.get("/health", response_model=HealthResponse)
async def health():
    return HealthResponse(status="ok", service="studyforge-api", version="0.1.0")

@app.get("/api/v1/demo/topics")
async def demo_topics():
    return {
        "subject": "Artificial Intelligence",
        "topics": [
            {"id": "graphplan", "title": "GraphPlan", "status": "ready"},
            {"id": "planning-sat", "title": "Planning as SAT", "status": "in_progress"},
            {"id": "pop", "title": "Partial-Order Planning", "status": "needs_review"},
        ],
    }
