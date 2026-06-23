const API_URL = "http://localhost:3000";

export async function getUsers() {
  const response = await fetch(`${API_URL}/users`);

  if (!response.ok) {
    throw new Error("Erro ao buscar usuários");
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

export async function associateCarToUser(userId: number, carId: number) {
  const response = await fetch(`${API_URL}/users/associate/car`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, carId }),
  });

  if (!response.ok) {
    throw new Error('Erro ao associar carro ao usuário');
  }

  return response.json();
}

export async function getCars() {
  const response = await fetch(`${API_URL}/cars`);

  if (!response.ok) {
    throw new Error('Erro ao buscar carros');
  }

  return response.json();
}

export async function createCar(car: any) {
  const response = await fetch(`${API_URL}/cars`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car),
  });

  if (!response.ok) {
    throw new Error('Erro ao criar carro');
  }

  return response.json();
}

export async function getCarSlots() {
  const response = await fetch(`${API_URL}/car-slots`);

  if (!response.ok) {
    throw new Error('Erro ao buscar vagas');
  }

  return response.json();
}

export async function createCarSlot(slot: any) {
  const response = await fetch(`${API_URL}/car-slots`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(slot),
  });

  if (!response.ok) {
    throw new Error('Erro ao criar vaga');
  }

  return response.json();
}

export async function associateCarToSlot(slotId: number, carId: number) {
  const response = await fetch(`${API_URL}/car-slots/${slotId}/associate-car`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ carId }),
  });

  if (!response.ok) {
    throw new Error('Erro ao associar carro à vaga');
  }

  return response.json();
}