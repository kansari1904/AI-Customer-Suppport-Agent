from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma

embedding = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
vector_store = Chroma(persist_directory="./chroma_db", embedding_function=embedding)

results = vector_store.similarity_search("I don't want to pay anymore", k=3)
for r in results:
    print(r.metadata.get("source"))
    print(r.page_content[:150])
    print("---")