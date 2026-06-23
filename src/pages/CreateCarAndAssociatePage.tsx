import { useEffect, useState } from 'react';
import { associateCarToUser, createCar, getUsers } from '../services/users';

type User = {
  id: number;
  firstName: string;
  lastName: string;
};

export function CreateCarAndAssociatePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState({ plate: '', brand: '', model: '', color: '', year: '' });
  const [selectedUserId, setSelectedUserId] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
      } catch (error) {
        console.error(error);
      }
    }

    void loadData();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const createdCar = await createCar({
        plate: form.plate,
        brand: form.brand,
        model: form.model,
        color: form.color,
        year: Number(form.year),
      });

      if (selectedUserId) {
        await associateCarToUser(Number(selectedUserId), createdCar.id);
      }

      setMessage(selectedUserId ? 'Carro criado e associado ao usuário.' : 'Carro criado com sucesso.');
      setForm({ plate: '', brand: '', model: '', color: '', year: '' });
      setSelectedUserId('');
    } catch (error) {
      console.error(error);
      setMessage('Não foi possível criar o carro.');
    }
  }

  return (
    <section className="card">
      <div className="card-header">
        <h2>Criar carro e associar ao usuário</h2>
        <p>Cadastre um carro e, se quiser, associe-o a um usuário imediatamente.</p>
      </div>

      {message ? <p className="status-message">{message}</p> : null}

      <form onSubmit={handleSubmit} className="form-grid">
        <input name="plate" placeholder="Placa" value={form.plate} onChange={(e) => setForm((prev) => ({ ...prev, plate: e.target.value }))} required />
        <input name="brand" placeholder="Marca" value={form.brand} onChange={(e) => setForm((prev) => ({ ...prev, brand: e.target.value }))} />
        <input name="model" placeholder="Modelo" value={form.model} onChange={(e) => setForm((prev) => ({ ...prev, model: e.target.value }))} />
        <input name="color" placeholder="Cor" value={form.color} onChange={(e) => setForm((prev) => ({ ...prev, color: e.target.value }))} />
        <input name="year" placeholder="Ano" type="number" value={form.year} onChange={(e) => setForm((prev) => ({ ...prev, year: e.target.value }))} />

        <select value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)}>
          <option value="">Associar a um usuário (opcional)</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.firstName} {user.lastName}
            </option>
          ))}
        </select>

        <button type="submit">Salvar carro</button>
      </form>

    </section>
  );
}
