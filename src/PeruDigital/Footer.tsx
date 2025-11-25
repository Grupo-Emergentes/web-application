import { Button } from './ui/button';

interface FooterProps {
  onViewChange: (view: any) => void;
}

export function Footer({ onViewChange }: FooterProps) {
  const serviceLinks = [
    { label: 'DNI Digital', onClick: () => onViewChange('digital-dni') },
    { label: 'Pagos SUNAT', onClick: () => onViewChange('services') },
    { label: 'Certificados', onClick: () => onViewChange('services') },
    { label: 'Trámites Municipales', onClick: () => onViewChange('services') }
  ];

  const supportLinks = [
    { label: 'Centro de Ayuda', onClick: () => onViewChange('ayuda') },
    { label: 'Contactar Soporte', onClick: () => onViewChange('ayuda') },
    { label: 'Preguntas Frecuentes', onClick: () => onViewChange('ayuda') },
    { label: 'Tutoriales', onClick: () => onViewChange('ayuda') }
  ];

  const legalLinks = [
    { label: 'Términos de Uso', onClick: () => {} },
    { label: 'Política de Privacidad', onClick: () => {} },
    { label: 'Seguridad', onClick: () => {} },
    { label: 'Accesibilidad', onClick: () => {} }
  ];

  return (
    <footer className="bg-linear-to-br from-slate-900 via-slate-800 to-red-900 border-t-4 border-red-600 mt-16 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header del footer */}
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-12 h-12 bg-linear-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-xl">
            <span className="text-white text-xl">P</span>
          </div>
          <div>
            <h3 className="text-2xl text-white">Perú Digital</h3>
            <p className="text-slate-300">Tu plataforma digital para servicios del Estado Peruano</p>
          </div>
        </div>

        {/* Links organizados en columnas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Servicios */}
          <div>
            <h4 className="text-red-400 mb-4 tracking-wider">SERVICIOS</h4>
            <ul className="space-y-2">
              {serviceLinks.map((link, index) => (
                <li key={index}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={link.onClick}
                    className="p-0 h-auto text-slate-300 hover:text-white hover:bg-transparent justify-start transition-all"
                  >
                    {link.label}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Soporte */}
          <div>
            <h4 className="text-blue-400 mb-4 tracking-wider">SOPORTE</h4>
            <ul className="space-y-2">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={link.onClick}
                    className="p-0 h-auto text-slate-300 hover:text-white hover:bg-transparent justify-start transition-all"
                  >
                    {link.label}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-emerald-400 mb-4 tracking-wider">LEGAL</h4>
            <ul className="space-y-2">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={link.onClick}
                    className="p-0 h-auto text-slate-300 hover:text-white hover:bg-transparent justify-start transition-all"
                  >
                    {link.label}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-700 pt-8">
          <div className="text-center space-y-2">
            <p className="text-slate-300">
              © 2024 Perú Digital. Todos los derechos reservados.
            </p>
            <p className="text-sm text-slate-400">
              Plataforma oficial del Estado Peruano para servicios digitales ciudadanos.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
