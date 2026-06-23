import { useState } from 'react';
import { createUser } from '../services/users';

export function CreateUserPage() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    cpf: '',
    numero: '',
    endereco: '',
    complemento: '',
  });
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await createUser(form);
      setMessage('Usuário criado com sucesso.');
      setForm({
        firstName: '',
        lastName: '',
        cpf: '',
        numero: '',
        endereco: '',
        complemento: '',
      });
    } catch (error) {
      console.error(error);
      setMessage('Não foi possível criar o usuário.');
    }
  }

  return (
    <section className="card">
      <div className="card-header">
        <h2>Criar usuário</h2>
        <p>Cadastre um novo usuário para o sistema.</p>
      </div>

      {message ? <p className="status-message">{message}</p> : null}

      <form onSubmit={handleSubmit} className="form-grid">
        <input name="firstName" placeholder="Nome" value={form.firstName} onChange={(e) => setForm((prev) => ({ ...prev, firstName: e.target.value }))} required />
        <input name="lastName" placeholder="Sobrenome" value={form.lastName} onChange={(e) => setForm((prev) => ({ ...prev, lastName: e.target.value }))} required />
        <input name="cpf" placeholder="CPF" value={form.cpf} onChange={(e) => setForm((prev) => ({ ...prev, cpf: e.target.value }))} required />
        <input name="numero" placeholder="Telefone" value={form.numero} onChange={(e) => setForm((prev) => ({ ...prev, numero: e.target.value }))} />
        <input name="endereco" placeholder="Endereço" value={form.endereco} onChange={(e) => setForm((prev) => ({ ...prev, endereco: e.target.value }))} />
        <input name="complemento" placeholder="Complemento" value={form.complemento} onChange={(e) => setForm((prev) => ({ ...prev, complemento: e.target.value }))} />
        <button type="submit">Salvar usuário</button>
      </form>
    </section>
  );
}
