import { useEffect, useState } from 'react';
import { associateCarToSlot, getCarSlots, getCars } from '../services/users';

type Car = {
  id: number;
  plate: string;
  brand?: string;
};

type CarSlot = {
  id: number;
  price: number;
  carId?: number | null;
};

export function ParkingSlotsPage() {
  const [slots, setSlots] = useState<CarSlot[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCarId, setSelectedCarId] = useState('');
  const [selectedSlotId, setSelectedSlotId] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        const [slotsData, carsData] = await Promise.all([getCarSlots(), getCars()]);
        setSlots(slotsData);
        setCars(carsData);
      } catch (error) {
        console.error(error);
      }
    }

    void loadData();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!selectedCarId || !selectedSlotId) {
      setMessage('Selecione um carro e uma vaga.');
      return;
    }

    try {
      const result = await associateCarToSlot(Number(selectedSlotId), Number(selectedCarId));
      setSlots((prev) => prev.map((slot) => (slot.id === Number(selectedSlotId) ? { ...slot, carId: result.carId ?? Number(selectedCarId) } : slot)));
      setMessage(`Carro associado à vaga ${selectedSlotId}.`);
    } catch (error) {
      console.error(error);
      setMessage('Não foi possível associar o carro à vaga.');
    }
  }

  return (
    <section className="card">
      <div className="card-header">
        <h2>Vagas e associações</h2>
        <p>Associe um carro a uma vaga disponível.</p>
      </div>

      {message ? <p className="status-message">{message}</p> : null}

      <form onSubmit={handleSubmit} className="form-grid">
        <select value={selectedCarId} onChange={(e) => setSelectedCarId(e.target.value)} required>
          <option value="">Selecione um carro</option>
          {cars.map((car) => (
            <option key={car.id} value={car.id}>
              {car.plate} - {car.brand ?? 'Sem marca'}
            </option>
          ))}
        </select>

        <select value={selectedSlotId} onChange={(e) => setSelectedSlotId(e.target.value)} required>
          <option value="">Selecione uma vaga</option>
          {slots.map((slot) => (
            <option key={slot.id} value={slot.id} disabled={Boolean(slot.carId)}>
              Vaga {slot.id} - R$ {slot.price}
            </option>
          ))}
        </select>

        <button type="submit">Associar vaga</button>
      </form>

      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Preço</th>
            <th>Status</th>
            <th>Carro</th>
          </tr>
        </thead>
        <tbody>
          {slots.map((slot) => {
            const car = cars.find((item) => item.id === slot.carId);
            return (
              <tr key={slot.id}>
                <td>{slot.id}</td>
                <td>R$ {slot.price}</td>
                <td>{slot.carId ? 'Ocupada' : 'Disponível'}</td>
                <td>{car ? car.plate : '-'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
