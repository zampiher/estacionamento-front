import { useEffect, useState } from "react";
import { getUsers } from "../services/users";
import type { User } from "../types/user";

export function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await getUsers();

        console.log(data);

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
    return <h1>Carregando...</h1>;
  }

  return (
    <div className="container">
      <h1>Usuários</h1>

      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Sobrenome</th>
            <th>CPF</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.cpf}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}