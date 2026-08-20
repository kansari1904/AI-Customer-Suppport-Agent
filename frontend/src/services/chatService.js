const API_URL = "http://127.0.0.1:8000";

export const askSupportAgent = async (question) => {
    const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            question,
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to get response from server");
    }

    const data = await response.json();

    return data;
};