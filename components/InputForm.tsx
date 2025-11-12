
import React from 'react';

interface InputFormProps {
  game: string;
  setGame: (value: string) => void;
  championship: string;
  setChampionship: (value: string) => void;
  numGames: number;
  setNumGames: (value: number) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({
  game,
  setGame,
  championship,
  setChampionship,
  numGames,
  setNumGames,
  onAnalyze,
  isLoading,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze();
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="game" className="block text-sm font-medium text-gray-300 mb-2">
              Nome do Jogo
            </label>
            <input
              id="game"
              type="text"
              value={game}
              onChange={(e) => setGame(e.target.value)}
              placeholder="Ex: Joinville vs. Figueirense"
              className="w-full bg-gray-900/50 border border-gray-600 rounded-md px-4 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="championship" className="block text-sm font-medium text-gray-300 mb-2">
              Nome do Campeonato/Liga
            </label>
            <input
              id="championship"
              type="text"
              value={championship}
              onChange={(e) => setChampionship(e.target.value)}
              placeholder="Ex: Copa SC 2025"
              className="w-full bg-gray-900/50 border border-gray-600 rounded-md px-4 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
              disabled={isLoading}
            />
          </div>
           <div>
            <label htmlFor="numGames" className="block text-sm font-medium text-gray-300 mb-2">
              Nº de Jogos a Analisar
            </label>
            <input
              id="numGames"
              type="number"
              value={numGames}
              onChange={(e) => setNumGames(Number(e.target.value))}
              min="5"
              max="30"
              className="w-full bg-gray-900/50 border border-gray-600 rounded-md px-4 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
              disabled={isLoading}
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-4 rounded-md transition-all duration-300 ease-in-out disabled:bg-gray-600 disabled:cursor-not-allowed transform hover:scale-105 disabled:scale-100"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analisando...
            </>
          ) : (
            'Analisar Jogo'
          )}
        </button>
      </form>
    </div>
  );
};

export default InputForm;
