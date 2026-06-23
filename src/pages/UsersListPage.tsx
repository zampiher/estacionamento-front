import { useEffect, useState } from 'react';
import { getUsers } from '../services/users';
import type { User } from '../types/user';

export function UsersListPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    void loadUsers();
  }, []);

  if (loading) {
    return <p className="page-state">Carregando usuários...</p>;
  }

  return (
    <section className="card">
      <div className="card-header">
        <h2>Lista de usuários</h2>
        <p>Visualize os usuários cadastrados.</p>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Sobrenome</th>
            <th>CPF</th>
            <th>Telefone</th>
            <th>Endereço</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.cpf}</td>
              <td>{user.numero ?? '-'}</td>
              <td>{user.endereco ?? '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
