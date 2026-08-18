from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from langchain_core.prompts import ChatPromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.runnables import RunnablePassthrough
from dotenv import load_dotenv


load_dotenv()


def create_rag_chain():

    embedding = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )

    vector_store = Chroma(
        persist_directory="./chroma_db",
        embedding_function=embedding
    )

    retriever = vector_store.as_retriever(
        search_kwargs={"k": 3}
    )

    prompt = ChatPromptTemplate.from_messages([
        (
            "system",
            """You are a FlowDesk support assistant.

Answer the user's question using ONLY the provided context.

If the answer is not present in the context, say:
"I don't have that information."

Do not make up or assume any information.

Context:
{context}
"""
        ),
        (
            "human",
            "{question}"
        )
    ])

    llm = ChatGoogleGenerativeAI(
        model="gemini-3.6-flash"
    )

    def format_docs(docs):
        return "\n\n".join(
            doc.page_content for doc in docs
        )

    rag_chain = (
        {
            "context": retriever | format_docs,
            "question": RunnablePassthrough()
        }
        | prompt
        | llm
    )

    return rag_chain