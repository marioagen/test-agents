import React from 'react';

export default function Colors() {
  return (
    <section className="bg-white dark:bg-surface-dark p-8 rounded-lg border border-gray-200 dark:border-border-dark transition-colors">
      <div className="mb-6 pb-4 border-b border-gray-100 dark:border-border-dark">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Cores do Sistema</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Paleta de cores baseada no Woopi-AI</p>
      </div>
      
      <div className="space-y-8">
        <div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            <ColorSwatch color="bg-primary" name="Woopi-AI Blue" hex="#0073ea" />
            <ColorSwatch color="bg-primary-light" name="Light Blue" hex="#e1e9f8" />
            <ColorSwatch color="bg-primary-dark" name="Dark Blue" hex="#0060c7" />
            <ColorSwatch color="bg-success" name="Success" hex="#00d2d2" />
            <ColorSwatch color="bg-warning" name="Warning" hex="#ffcb00" />
            <ColorSwatch color="bg-orange" name="Orange" hex="#fd7e14" />
            <ColorSwatch color="bg-error" name="Error" hex="#d83a52" />
            <ColorSwatch color="bg-dark-gray" name="Dark Gray" hex="#323338" />
            <ColorSwatch color="bg-gray" name="Gray" hex="#676879" />
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-wider">Cores Dark Mode (Monday CRM)</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
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
      <div className={`h-24 ${color} rounded-md border border-gray-100 dark:border-border-dark shadow-sm`}></div>
      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{name}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400">{hex}</p>
    </div>
  );
}
