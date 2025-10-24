import { Card } from './ui/card';
import { Shield, FileCheck, Headphones } from 'lucide-react';

export function SecuritySection() {
  const securityFeatures = [
    {
      icon: Shield,
      title: 'Cifrado de Extremo a Extremo',
      description: 'Todos tus datos están cifrados y protegidos con los más altos estándares de seguridad internacional.',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: FileCheck,
      title: 'Documentos Oficiales',
      description: 'Documentos digitales con validez legal completa, respaldados por la tecnología blockchain del Estado.',
      gradient: 'from-emerald-500 to-emerald-600'
    },
    {
      icon: Headphones,
      title: 'Soporte 24/7',
      description: 'Asistencia técnica y administrativa disponible las 24 horas del día, todos los días del año.',
      gradient: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <section className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl bg-linear-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
          Seguridad y Privacidad
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Tu información está protegida con los más altos estándares de seguridad
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {securityFeatures.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card 
              key={index}
              className="p-6 text-center border border-slate-200 hover:shadow-xl transition-all duration-300 group hover:scale-105 bg-white"
            >
              <div className="space-y-4">
                <div className={`w-16 h-16 bg-linear-to-br ${feature.gradient} rounded-xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Información adicional de seguridad */}
      <Card className="p-8 bg-linear-to-br from-blue-50 via-purple-50 to-red-50 border-none shadow-xl">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-linear-to-br from-red-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl text-slate-900">Certificación Gubernamental</h3>
          <p className="text-slate-700 max-w-2xl mx-auto leading-relaxed">
            Esta plataforma cumple con todas las normativas de seguridad digital del Estado Peruano y 
            cuenta con certificación ISO 27001 para el manejo de información ciudadana.
          </p>
        </div>
      </Card>
    </section>
  );
}
