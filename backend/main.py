from contextlib import asynccontextmanager

from fastapi import FastAPI
from pydantic import BaseModel
from rag import create_rag_chain
from fastapi.middleware.cors import CORSMiddleware


@asynccontextmanager
async def lifespan(app: FastAPI):

    print("Loading RAG system...")

    app.state.rag_chain = create_rag_chain()

    print("RAG system loaded.")

    yield

    print("Shutting down RAG system...")


app = FastAPI(lifespan=lifespan)


# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    question: str


@app.get("/")
def home():
    return {
        "message": "RAG API is running"
    }


@app.post("/chat")
def chat(request: ChatRequest):

    response = app.state.rag_chain.invoke(
        request.question
    )

    if isinstance(response.content, str):
        answer = response.content
    else:
        answer = response.content[0]["text"]

    return {
        "answer": answer
    }