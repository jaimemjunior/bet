import React, { useMemo } from 'react';
import { TargetIcon } from './icons/TargetIcon';
import { LightbulbIcon } from './icons/LightbulbIcon';
import { ClockIcon } from './icons/ClockIcon';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';

interface AnalysisDisplayProps {
  analysis: string;
}

interface AnalysisData {
  market: string;
  justification: string;
  strategy: string;
  confidence: 'Baixo' | 'Médio' | 'Alto' | string;
}

const parseAnalysis = (text: string): AnalysisData => {
  const market = text.split('### **MERCADO PRINCIPAL**')[1]?.split('### **')[0]?.trim() || 'N/A';
  const justification = text.split('### **JUSTIFICATIVA**')[1]?.split('### **')[0]?.trim() || 'N/A';
  const strategy = text.split('### **ESTRATÉGIA DE APOSTA**')[1]?.split('### **')[0]?.trim() || 'N/A';
  const confidence = text.split('### **NÍVEL DE CONFIANÇA**')[1]?.split('### **')[0]?.trim() || 'N/A';
  
  return { market, justification, strategy, confidence };
};

const ConfidenceMeter: React.FC<{ level: string }> = ({ level }) => {
  const confidenceConfig = {
    'Baixo': { width: '33.3%', color: 'bg-yellow-500', label: 'Baixa' },
    'Médio': { width: '66.6%', color: 'bg-orange-500', label: 'Média' },
    'Alto': { width: '100%', color: 'bg-green-500', label: 'Alta' },
  };

  const config = confidenceConfig[level as keyof typeof confidenceConfig] || { width: '0%', color: 'bg-gray-500', label: 'Indefinida' };

  return (
    <div>
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <div 
          className={`${config.color} h-2.5 rounded-full transition-all duration-500 ease-out`} 
          style={{ width: config.width }}
        ></div>
      </div>
    </div>
  );
};

const InfoRow: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode; isJustification?: boolean }> = ({ icon, title, children, isJustification }) => (
  <div className="flex items-start gap-4">
    <div className="text-cyan-400 mt-1">{icon}</div>
    <div>
      <h3 className="font-semibold text-gray-300">{title}</h3>
      <p className={`text-gray-400 ${isJustification ? 'whitespace-pre-line' : ''}`}>{children}</p>
    </div>
  </div>
);

const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ analysis }) => {
  const data = useMemo(() => parseAnalysis(analysis), [analysis]);

  return (
    <div className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-2xl border border-gray-700 shadow-2xl space-y-6 animate-fade-in">
      <div className="text-center">
        <p className="text-sm font-medium text-cyan-400 uppercase tracking-wider">Recomendação Principal</p>
        <h2 className="flex items-center justify-center gap-3 text-2xl font-bold text-white mt-2">
          <TargetIcon className="w-6 h-6" />
          <span>{data.market}</span>
        </h2>
      </div>

      <div className="border-t border-gray-700 my-4"></div>

      <div className="space-y-5">
        <InfoRow icon={<LightbulbIcon className="w-6 h-6"/>} title="Justificativa" isJustification>
          {data.justification}
        </InfoRow>
        
        <div className="border-t border-gray-700/50 my-4"></div>

        <InfoRow icon={<ClockIcon className="w-6 h-6"/>} title="Estratégia de Aposta">
          {data.strategy}
        </InfoRow>

        <InfoRow icon={<ShieldCheckIcon className="w-6 h-6"/>} title="Nível de Confiança">
            <div className="w-full pt-1">
                 <ConfidenceMeter level={data.confidence} />
            </div>
        </InfoRow>
      </div>
    </div>
  );
};

export default AnalysisDisplay;