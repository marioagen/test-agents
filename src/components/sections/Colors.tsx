import React from 'react';

export default function Colors() {
  return (
    <section className="bg-white dark:bg-surface-dark p-8 rounded-lg border border-gray-200 dark:border-border-dark transition-colors">
      <h2 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-100 dark:border-border-dark">Cores do Sistema</h2>
      
      <div className="space-y-8">
        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-wider">Cores Base</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <ColorSwatch color="bg-primary" name="Primary" hex="#3b82f6" />
            <ColorSwatch color="bg-primary-light" name="Primary Light" hex="#60a5fa" />
            <ColorSwatch color="bg-primary-dark" name="Primary Dark" hex="#2563eb" />
            <ColorSwatch color="bg-gray-900" name="Gray 900" hex="#111827" />
            <ColorSwatch color="bg-gray-500" name="Gray 500" hex="#6b7280" />
            <ColorSwatch color="bg-gray-100" name="Gray 100" hex="#f3f4f6" />
            <ColorSwatch color="bg-red-500" name="Error" hex="#ef4444" />
            <ColorSwatch color="bg-green-500" name="Success" hex="#22c55e" />
            <ColorSwatch color="bg-yellow-500" name="Warning" hex="#eab308" />
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-wider">Cores Dark Mode (Monday CRM)</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <ColorSwatch color="bg-background-dark" name="Background Dark" hex="#1d1f35" />
            <ColorSwatch color="bg-sidebar-dark" name="Sidebar Dark" hex="#181b34" />
            <ColorSwatch color="bg-surface-dark" name="Surface Dark" hex="#21233d" />
            <ColorSwatch color="bg-active-dark" name="Active Item Dark" hex="#1e2d4d" />
            <ColorSwatch color="bg-border-dark" name="Border Dark" hex="#323338" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ColorSwatch({ color, name, hex }: { color: string, name: string, hex: string }) {
  return (
    <div className="space-y-2">
      <div className={`h-20 ${color} rounded border border-gray-100 dark:border-border-dark`}></div>
      <p className="text-xs font-bold dark:text-white">{name}</p>
      <p className="text-[10px] text-gray-400">{hex}</p>
    </div>
  );
}
