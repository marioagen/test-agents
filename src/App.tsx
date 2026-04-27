import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Typography from './components/sections/Typography';
import Colors from './components/sections/Colors';
import Buttons from './components/sections/Buttons';
import Cards from './components/sections/Cards';
import Kanban from './components/sections/Kanban';
import Forms from './components/sections/Forms';
import Badges from './components/sections/Badges';
import Tabs from './components/sections/Tabs';
import Tables from './components/sections/Tables';
import Icons from './components/sections/Icons';
import Agents from './pages/Agents';
import AgentForm from './pages/AgentForm';
import Failures from './pages/Failures';
import Dashboard from './pages/Dashboard';
import Keys from './pages/Keys';

function DesignSystem() {
  return (
    <>
      <div className="mb-12">
        <h1 className="text-3xl font-bold mb-4">Design System</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
          Este é o guia de estilos oficial do Woopi AI. Ele contém todos os componentes, 
          cores, tipografia e padrões de interface que devem ser utilizados na construção 
          da plataforma.
        </p>
      </div>

      <div className="space-y-16">
        <Typography />
        <Colors />
        <Buttons />
        <Cards />
        <Kanban />
        <Forms />
        <Badges />
        <Tabs />
        <Tables />
        <Icons />
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<DesignSystem />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chaves" element={<Keys />} />
          <Route path="/agentes" element={<Agents />} />
          <Route path="/agentes/novo" element={<AgentForm />} />
          <Route path="/agentes/:id" element={<AgentForm />} />
          <Route path="/falhas" element={<Failures />} />
        </Routes>
      </Layout>
    </Router>
  );
}
