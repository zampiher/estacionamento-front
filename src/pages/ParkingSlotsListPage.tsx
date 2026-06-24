import { useEffect, useState } from 'react';
import { getCarSlots, getCars, getUsers } from '../services/users';

type Car = {
  id: number;
  plate: string;
  userId?: number | null;
};

type User = {
  id: number;
  firstName: string;
  lastName: string;
};

type CarSlot = {
  id: number;
  price: number;
  carId?: number | null;
};

export function ParkingSlotsListPage() {
  const [slots, setSlots] = useState<CarSlot[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [slotsData, carsData, usersData] = await Promise.all([getCarSlots(), getCars(), getUsers()]);
        setSlots(slotsData);
        setCars(carsData);
        setUsers(usersData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    void loadData();
  }, []);

  if (loading) {
    return <p className="page-state">Carregando vagas...</p>;
  }

  return (
    <section className="card">
      <div className="card-header">
        <h2>Listar vagas</h2>
        <p>Veja o estado atual das vagas do estacionamento.</p>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Preço</th>
            <th>Status</th>
            <th>Carro</th>
            <th>Proprietário</th>
          </tr>
        </thead>
        <tbody>
          {slots.map((slot) => {
            const car = cars.find((item) => item.id === slot.carId);
            const owner = users.find((user) => user.id === car?.userId);
            return (
              <tr key={slot.id}>
                <td>{slot.id}</td>
                <td>R$ {slot.price}</td>
                <td>{slot.carId ? 'Ocupada' : 'Disponível'}</td>
                <td>{car ? car.plate : '-'}</td>
                <td>{owner ? `${owner.firstName} ${owner.lastName}` : '-'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
