import { useEffect, useState } from 'react';
import { createCar, getCars, getCarSlots, associateCarToSlot } from '../services/users';

type Car = {
  id: number;
  plate: string;
  brand?: string;
  model?: string;
  color?: string;
  year?: number;
};

type CarSlot = {
  id: number;
  price: number;
  carId?: number | null;
};

export function ParkingManagement() {
  const [cars, setCars] = useState<Car[]>([]);
  const [slots, setSlots] = useState<CarSlot[]>([]);
  const [selectedCarId, setSelectedCarId] = useState('');
  const [selectedSlotId, setSelectedSlotId] = useState('');
  const [carForm, setCarForm] = useState({ plate: '', brand: '', model: '', color: '', year: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        const [carsData, slotsData] = await Promise.all([getCars(), getCarSlots()]);
        setCars(carsData);
        setSlots(slotsData);
      } catch (error) {
        console.error(error);
      }
    }

    void loadData();
  }, []);

  async function handleCreateCar(e: React.FormEvent) {
    e.preventDefault();
    try {
      const createdCar = await createCar({
        plate: carForm.plate,
        brand: carForm.brand,
        model: carForm.model,
        color: carForm.color,
        year: Number(carForm.year),
      });
      setCars((prev) => [createdCar, ...prev]);
      setSelectedCarId(String(createdCar.id));
      setCarForm({ plate: '', brand: '', model: '', color: '', year: '' });
      setMessage('Carro criado com sucesso.');
    } catch (error) {
      console.error(error);
      setMessage('Não foi possível criar o carro.');
    }
  }

  async function handleAssociate(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedCarId || !selectedSlotId) {
      setMessage('Selecione um carro e uma vaga.');
      return;
    }

    try {
      const slotId = Number(selectedSlotId);
      const carId = Number(selectedCarId);
      const result = await associateCarToSlot(slotId, carId);
      setSlots((prev) => prev.map((slot) => (slot.id === slotId ? { ...slot, carId: result.carId ?? carId } : slot)));
      const selectedCar = cars.find((car) => car.id === carId);
      setMessage(`Carro ${selectedCar?.plate ?? carId} associado à vaga ${slotId}.`);
    } catch (error) {
      console.error(error);
      setMessage('Não foi possível associar o carro à vaga.');
    }
  }

  return (
    <div className="container">
      <h1>Gestão de vagas</h1>
      <p>Cadastre carros e associe cada veículo a uma vaga disponível.</p>
      {message ? <p className="status-message">{message}</p> : null}

      <form onSubmit={handleCreateCar} className="user-form">
        <input name="plate" placeholder="Placa" value={carForm.plate} onChange={(e) => setCarForm((prev) => ({ ...prev, plate: e.target.value }))} required />
        <input name="brand" placeholder="Marca" value={carForm.brand} onChange={(e) => setCarForm((prev) => ({ ...prev, brand: e.target.value }))} />
        <input name="model" placeholder="Modelo" value={carForm.model} onChange={(e) => setCarForm((prev) => ({ ...prev, model: e.target.value }))} />
        <input name="color" placeholder="Cor" value={carForm.color} onChange={(e) => setCarForm((prev) => ({ ...prev, color: e.target.value }))} />
        <input name="year" placeholder="Ano" type="number" value={carForm.year} onChange={(e) => setCarForm((prev) => ({ ...prev, year: e.target.value }))} />
        <button type="submit">Criar carro</button>
      </form>

      <form onSubmit={handleAssociate} className="user-form">
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

        <button type="submit">Associar carro à vaga</button>
      </form>

      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Vaga</th>
            <th>Placa</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {slots.map((slot) => {
            const car = cars.find((item) => item.id === slot.carId);
            return (
              <tr key={slot.id}>
                <td>{slot.id}</td>
                <td>R$ {slot.price}</td>
                <td>{car ? car.plate : 'Livre'}</td>
                <td>{slot.carId ? 'Ocupada' : 'Disponível'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
