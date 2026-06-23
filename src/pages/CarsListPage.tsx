import { useEffect, useState } from 'react';
import { getCars, getUsers } from '../services/users';

type Car = {
  id: number;
  plate: string;
  brand?: string;
  model?: string;
  color?: string;
  year?: number;
  userId?: number | null;
};

type User = {
  id: number;
  firstName: string;
  lastName: string;
};

export function CarsListPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCars() {
      try {
        const [carsData, usersData] = await Promise.all([getCars(), getUsers()]);
        setCars(carsData);
        setUsers(usersData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    void loadCars();
  }, []);

  if (loading) {
    return <p className="page-state">Carregando carros...</p>;
  }

  return (
    <section className="card">
      <div className="card-header">
        <h2>Lista de carros</h2>
        <p>Consulte os veículos cadastrados no sistema.</p>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Placa</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Cor</th>
            <th>Ano</th>
            <th>Proprietário</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => {
            const owner = users.find((user) => user.id === car.userId);
            return (
              <tr key={car.id}>
                <td>{car.id}</td>
                <td>{car.plate}</td>
                <td>{car.brand ?? '-'}</td>
                <td>{car.model ?? '-'}</td>
                <td>{car.color ?? '-'}</td>
                <td>{car.year ?? '-'}</td>
                <td>{owner ? `${owner.firstName} ${owner.lastName}` : '-'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
