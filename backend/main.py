from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from models.schemas import ChatRequest, ChatResponse
from services.embedding_service import get_embedding
from services.pinecone_service import query_pinecone
from services.llm_service import generate_answer


app = FastAPI()


# Allow frontend to communicate with the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/chat", response_model=ChatResponse)
def chat_endpoint(request: ChatRequest):

    vector = get_embedding(request.question)

    context = query_pinecone(vector)

    answer = generate_answer(request.question, context)

    return ChatResponse(answer=answer)