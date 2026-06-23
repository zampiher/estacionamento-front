import { useEffect, useState } from "react";
import { getUsers, createUser } from "../services/users";
import type { User } from "../types/user";

export function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ firstName: '', lastName: '', cpf: '', numero: '', endereco: '', complemento: '' });

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const newUser = await createUser(form);
      setUsers(prev => [newUser, ...prev]);
      setForm({ firstName: '', lastName: '', cpf: '', numero: '', endereco: '', complemento: '' });
    } catch (err) {
      console.error(err);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  if (loading) {
    return <h1>Carregando...</h1>;
  }

  return (
    <div className="container">
      <h1>Usuários</h1>

      <form onSubmit={handleSubmit} className="user-form">
        <input name="firstName" placeholder="Nome" value={form.firstName} onChange={handleChange} required />
        <input name="lastName" placeholder="Sobrenome" value={form.lastName} onChange={handleChange} required />
        <input name="cpf" placeholder="CPF" value={form.cpf} onChange={handleChange} required />
        <input name="numero" placeholder="Telefone" value={form.numero} onChange={handleChange} />
        <input name="endereco" placeholder="Endereço" value={form.endereco} onChange={handleChange} />
        <input name="complemento" placeholder="Complemento" value={form.complemento} onChange={handleChange} />
        <button type="submit">Criar usuário</button>
      </form>

      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Sobrenome</th>
            <th>CPF</th>
            <th>Telefone</th>
            <th>Endereço</th>
            <th>Complemento</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.cpf}</td>
              <td>{user.numero ?? '-'}</td>
              <td>{user.endereco ?? '-'}</td>
              <td>{user.complemento ?? '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}