import requests
import config


def generate_answer(question: str, context: str):
    url = "https://api.groq.com/openai/v1/chat/completions"

    headers = {
        "Authorization": f"Bearer {config.GROQ_API_KEY}",
        "Content-Type": "application/json"
    }

    prompt = f"""Answer the question using the provided context.

Context:
{context}

Question:
{question}

Answer:"""

    payload = {
        "model": "openai/gpt-oss-120b",
        "messages": [
            {
                "role": "user",
                "content": prompt
            }
        ],
        "temperature": 0.2
    }

    res = requests.post(
        url,
        json=payload,
        headers=headers
    )

    if res.status_code != 200:
        raise Exception(
            f"Groq API error {res.status_code}: {res.text}"
        )

    data = res.json()

    return data["choices"][0]["message"]["content"]