import { useState } from 'react';
import { createCarSlot } from '../services/users';

export function CreateParkingSlotPage() {
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await createCarSlot({ price: Number(price) });
      setMessage('Vaga criada com sucesso.');
      setPrice('');
    } catch (error) {
      console.error(error);
      setMessage('Não foi possível criar a vaga.');
    }
  }

  return (
    <section className="card">
      <div className="card-header">
        <h2>Criar vaga</h2>
        <p>Cadastre uma nova vaga para o estacionamento.</p>
      </div>

      {message ? <p className="status-message">{message}</p> : null}

      <form onSubmit={handleSubmit} className="form-grid">
        <input
          type="number"
          step="0.01"
          placeholder="Preço"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <button type="submit">Salvar vaga</button>
      </form>
    </section>
  );
}
