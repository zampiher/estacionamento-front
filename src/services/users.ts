const API_URL = "http://localhost:3000";

export async function getUsers() {
    const response = await fetch(
        `${API_URL}/users`
    );

    if (!response.ok) {
        throw new Error("Erro ao buscar usários");
    }
    
    return response.json();
}