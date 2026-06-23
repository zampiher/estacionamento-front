import { useState } from 'react';
import { UsersListPage } from './pages/UsersListPage';
import { CreateUserPage } from './pages/CreateUserPage';
import { ParkingSlotsPage } from './pages/ParkingSlotsPage';
import { CreateCarAndAssociatePage } from './pages/CreateCarAndAssociatePage';
import { CarsListPage } from './pages/CarsListPage';
import { CreateParkingSlotPage } from './pages/CreateParkingSlotPage';
import { ParkingSlotsListPage } from './pages/ParkingSlotsListPage';

function App() {
  const [view, setView] = useState<'users-list' | 'create-user' | 'create-parking-slot' | 'parking-slots' | 'parking-slots-list' | 'create-car' | 'cars-list'>('users-list');

  return (
    <div className="app-shell">
      <nav className="top-nav">
        <div className="nav-group">
          <span className="nav-title">Usuários</span>
          <button type="button" className={view === 'users-list' ? 'active' : ''} onClick={() => setView('users-list')}>Listar usuários</button>
          <button type="button" className={view === 'create-user' ? 'active' : ''} onClick={() => setView('create-user')}>Criar usuário</button>
        </div>

        <div className="nav-group">
          <span className="nav-title">Carros</span>
          <button type="button" className={view === 'create-car' ? 'active' : ''} onClick={() => setView('create-car')}>Criar carro</button>
          <button type="button" className={view === 'cars-list' ? 'active' : ''} onClick={() => setView('cars-list')}>Listar carros</button>
        </div>

        <div className="nav-group">
          <span className="nav-title">Vagas</span>
          <button type="button" className={view === 'create-parking-slot' ? 'active' : ''} onClick={() => setView('create-parking-slot')}>Criar vaga</button>
          <button type="button" className={view === 'parking-slots' ? 'active' : ''} onClick={() => setView('parking-slots')}>Associar vaga</button>
          <button type="button" className={view === 'parking-slots-list' ? 'active' : ''} onClick={() => setView('parking-slots-list')}>Listar vagas</button>
        </div>
      </nav>

      <main className="page-content">
        {view === 'users-list' && <UsersListPage />}
        {view === 'create-user' && <CreateUserPage />}
        {view === 'create-parking-slot' && <CreateParkingSlotPage />}
        {view === 'parking-slots' && <ParkingSlotsPage />}
        {view === 'parking-slots-list' && <ParkingSlotsListPage />}
        {view === 'create-car' && <CreateCarAndAssociatePage />}
        {view === 'cars-list' && <CarsListPage />}
      </main>
    </div>
  );
}

export default App;