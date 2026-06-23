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

export async function createUser(user: any) {
    const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        throw new Error('Erro ao criar usuário');
    }

    return response.json();
}