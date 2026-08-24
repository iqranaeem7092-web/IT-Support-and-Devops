from pinecone import Pinecone
import config

pc = Pinecone(api_key=config.PINECONE_API_KEY)
index = pc.Index(config.PINECONE_INDEX_NAME)

def query_pinecone(vector, top_k=3):
    response = index.query(vector=vector, top_k=top_k, include_metadata=True)
    contexts = [item['metadata']['text'] for item in response['matches'] if 'metadata' in item and 'text' in item['metadata']]
    return " ".join(contexts)