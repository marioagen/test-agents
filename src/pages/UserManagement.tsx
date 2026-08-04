import React, { useState } from 'react';
import { User, Users, Shield, Search, FileUp, Plus, Edit, Trash2, X } from 'lucide-react';

type Tab = 'usuarios' | 'times' | 'perfis';

const mockUsers = [
  { id: 1, name: 'Demo Prototype', email: 'demo@prototype.local', initials: 'DP', color: 'bg-blue-600', profiles: ['Administrador'], teams: ['Equipe Jurídico', 'Equipe Operações'], lastAccess: '28/06/2026 11:30' },
  { id: 2, name: 'Ana Silva', email: 'ana.silva@prototype.local', initials: 'AS', color: 'bg-blue-500', profiles: ['Analista'], teams: ['Equipe Jurídico'], lastAccess: '27/06/2026 06:15' },
  { id: 3, name: 'Bruno Costa', email: 'bruno.costa@prototype.local', initials: 'BC', color: 'bg-blue-600', profiles: ['Analista'], teams: ['Equipe Financeiro'], lastAccess: '26/06/2026 13:45' },
  { id: 4, name: 'Carla Mendes', email: 'carla.mendes@prototype.local', initials: 'CM', color: 'bg-blue-500', profiles: ['Auditor'], teams: ['Equipe Operações'], lastAccess: '25/06/2026 08:20' },
  { id: 5, name: 'Diego Alves', email: 'diego.alves@prototype.local', initials: 'DA', color: 'bg-blue-600', profiles: ['Analista'], teams: ['Equipe Financeiro', 'Equipe Operações'], lastAccess: '10/05/2026 05:00' },
  { id: 6, name: 'Elisa Rocha', email: 'elisa.rocha@prototype.local', initials: 'ER', color: 'bg-blue-600', profiles: ['Administrador', 'Auditor'], teams: ['Equipe Jurídico'], lastAccess: '29/06/2026 07:05' },
];

const mockTeams = [
  { id: 1, name: 'Equipe Jurídico', description: 'Membros do departamento jurídico', membersCount: 3 },
  { id: 2, name: 'Equipe Operações', description: 'Time de operações e monitoramento', membersCount: 3 },
  { id: 3, name: 'Equipe Financeiro', description: 'Departamento financeiro', membersCount: 2 },
];

const mockProfiles = [
  { id: 1, name: 'Administrador', description: 'Acesso total ao sistema', usersCount: 2 },
  { id: 2, name: 'Analista', description: 'Acesso às esteiras e documentos', usersCount: 3 },
  { id: 3, name: 'Auditor', description: 'Acesso de leitura e auditoria', usersCount: 2 },
];

export default function UserManagement() {
  const [activeTab, setActiveTab] = useState<Tab>('usuarios');
  
  // Modals state
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Gestão de Usuários e Times</h1>
        <p className="text-gray-500 dark:text-gray-400">Gerencie usuários, times e permissões do sistema</p>
      </div>

      <div className="flex bg-white dark:bg-sidebar-dark rounded-xl border border-gray-200 dark:border-border-dark p-1">
        <button
          onClick={() => setActiveTab('usuarios')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-colors ${
            activeTab === 'usuarios'
              ? 'bg-gray-100 dark:bg-active-dark text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
          }`}
        >
          <User className="w-4 h-4" />
          Usuários
        </button>
        <button
          onClick={() => setActiveTab('times')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-colors ${
            activeTab === 'times'
              ? 'bg-gray-100 dark:bg-active-dark text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
          }`}
        >
          <Users className="w-4 h-4" />
          Times
        </button>
        <button
          onClick={() => setActiveTab('perfis')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-colors ${
            activeTab === 'perfis'
              ? 'bg-gray-100 dark:bg-active-dark text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
          }`}
        >
          <Shield className="w-4 h-4" />
          Perfis e Permissões
        </button>
      </div>

      {activeTab === 'usuarios' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Usuários</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Gerencie os usuários do sistema</p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                <FileUp className="w-4 h-4" />
                Importar CSV
              </button>
              <button 
                onClick={() => setIsUserModalOpen(true)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Novo Usuário
              </button>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nome de usuário, email, perfil e time"
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-sidebar-dark border border-gray-200 dark:border-border-dark rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white placeholder-gray-400"
            />
          </div>

          <div className="bg-white dark:bg-sidebar-dark rounded-xl border border-gray-200 dark:border-border-dark overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-border-dark">
              <span className="text-sm text-gray-500 dark:text-gray-400">Usuários ({mockUsers.length})</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-active-dark/50 border-b border-gray-200 dark:border-border-dark">
                  <tr>
                    <th scope="col" className="px-6 py-3 font-medium">Usuário</th>
                    <th scope="col" className="px-6 py-3 font-medium">Perfis</th>
                    <th scope="col" className="px-6 py-3 font-medium">Times</th>
                    <th scope="col" className="px-6 py-3 font-medium">Último acesso</th>
                    <th scope="col" className="px-6 py-3 font-medium text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {mockUsers.map((user) => (
                    <tr key={user.id} className="bg-white dark:bg-sidebar-dark border-b border-gray-200 dark:border-border-dark hover:bg-gray-50 dark:hover:bg-active-dark/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full ${user.color} text-white flex items-center justify-center text-xs font-medium`}>
                            {user.initials}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                            <div className="text-xs text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          {user.profiles.map((profile, i) => (
                            <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                              {profile}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          {user.teams.map((team, i) => (
                            <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50">
                              {team}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-400">
                        {user.lastAccess}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => setIsUserModalOpen(true)} className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors" title="Editar">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors" title="Excluir">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'times' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Times</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Gerencie os times e agrupamentos de usuários</p>
            </div>
            <button 
              onClick={() => setIsTeamModalOpen(true)}
              className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
            >
              <Plus className="w-4 h-4" />
              Novo Time
            </button>
          </div>

          <div className="bg-white dark:bg-sidebar-dark rounded-xl border border-gray-200 dark:border-border-dark overflow-hidden">
             <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-active-dark/50 border-b border-gray-200 dark:border-border-dark">
                  <tr>
                    <th scope="col" className="px-6 py-3 font-medium">Nome do Time</th>
                    <th scope="col" className="px-6 py-3 font-medium">Descrição</th>
                    <th scope="col" className="px-6 py-3 font-medium">Membros</th>
                    <th scope="col" className="px-6 py-3 font-medium text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {mockTeams.map((team) => (
                    <tr key={team.id} className="bg-white dark:bg-sidebar-dark border-b border-gray-200 dark:border-border-dark hover:bg-gray-50 dark:hover:bg-active-dark/30 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                        {team.name}
                      </td>
                      <td className="px-6 py-4">
                        {team.description}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                          {team.membersCount}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => setIsTeamModalOpen(true)} className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors" title="Editar">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors" title="Excluir">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'perfis' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Perfis e Permissões</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Defina os níveis de acesso ao sistema</p>
            </div>
            <button 
              onClick={() => setIsProfileModalOpen(true)}
              className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
            >
              <Plus className="w-4 h-4" />
              Novo Perfil
            </button>
          </div>

          <div className="bg-white dark:bg-sidebar-dark rounded-xl border border-gray-200 dark:border-border-dark overflow-hidden">
             <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-active-dark/50 border-b border-gray-200 dark:border-border-dark">
                  <tr>
                    <th scope="col" className="px-6 py-3 font-medium">Nome do Perfil</th>
                    <th scope="col" className="px-6 py-3 font-medium">Descrição</th>
                    <th scope="col" className="px-6 py-3 font-medium">Usuários Vinculados</th>
                    <th scope="col" className="px-6 py-3 font-medium text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {mockProfiles.map((profile) => (
                    <tr key={profile.id} className="bg-white dark:bg-sidebar-dark border-b border-gray-200 dark:border-border-dark hover:bg-gray-50 dark:hover:bg-active-dark/30 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                          {profile.name}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {profile.description}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                          {profile.usersCount}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => setIsProfileModalOpen(true)} className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors" title="Editar">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors" title="Excluir">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* User Modal */}
      {isUserModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-sidebar-dark rounded-xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-border-dark flex justify-between items-center shrink-0">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Gerenciar Usuário</h3>
              <button onClick={() => setIsUserModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4 overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nome Completo</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-background-dark dark:text-white" placeholder="Ex: Ana Silva" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input type="email" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-background-dark dark:text-white" placeholder="Ex: ana.silva@empresa.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Perfis</label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-background-dark dark:text-white">
                  <option value="">Selecione um perfil...</option>
                  {mockProfiles.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Times</label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-background-dark dark:text-white">
                  <option value="">Selecione um time...</option>
                  {mockTeams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 dark:border-border-dark flex justify-end gap-3 shrink-0">
              <button onClick={() => setIsUserModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-sidebar-dark dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-800">
                Cancelar
              </button>
              <button onClick={() => setIsUserModalOpen(false)} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Team Modal */}
      {isTeamModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-sidebar-dark rounded-xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-border-dark flex justify-between items-center shrink-0">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Gerenciar Time</h3>
              <button onClick={() => setIsTeamModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4 overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nome do Time</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-background-dark dark:text-white" placeholder="Ex: Equipe de Vendas" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descrição</label>
                <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-background-dark dark:text-white" placeholder="Descreva a finalidade deste time..."></textarea>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 dark:border-border-dark flex justify-end gap-3 shrink-0">
              <button onClick={() => setIsTeamModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-sidebar-dark dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-800">
                Cancelar
              </button>
              <button onClick={() => setIsTeamModalOpen(false)} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-sidebar-dark rounded-xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-border-dark flex justify-between items-center shrink-0">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Gerenciar Perfil</h3>
              <button onClick={() => setIsProfileModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4 overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nome do Perfil</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-background-dark dark:text-white" placeholder="Ex: Visualizador" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descrição</label>
                <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-background-dark dark:text-white" placeholder="Descreva os acessos deste perfil..."></textarea>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 dark:border-border-dark flex justify-end gap-3 shrink-0">
              <button onClick={() => setIsProfileModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-sidebar-dark dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-800">
                Cancelar
              </button>
              <button onClick={() => setIsProfileModalOpen(false)} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
