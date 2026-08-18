from langchain_community.document_loaders import DirectoryLoader, TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma


# 1. Load documents
loader = DirectoryLoader(
    "knowledge_base",
    glob="**/*.md",
    loader_cls=TextLoader,
    loader_kwargs={"encoding": "utf-8"},
)

docs = loader.load()

# print(f"Documents loaded: {len(docs)}")


# 2. Split documents into chunks
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50,
)

chunks = text_splitter.split_documents(docs)

# print(f"Chunks created: {len(chunks)}")


# 3. Check metadata
# print("\nFirst document metadata:")
# print(docs[0].metadata)


# 4. Inspect first few chunks
# for i, chunk in enumerate(chunks[:3]):
#     print(f"\n--- CHUNK {i + 1} ---")
#     print(chunk.page_content)
#     print("SOURCE:", chunk.metadata.get("source"))


# 5. Create embeddings
print("\nLoading embedding model...")

embedding = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

# print("Embedding model loaded.")


# 6. Store embeddings in Chroma
vector_store = Chroma.from_documents(
    documents=chunks,
    embedding=embedding,
    persist_directory="./chroma_db",
)

print("\nDocuments successfully stored in Chroma.")