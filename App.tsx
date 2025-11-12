
import React, { useState, useCallback } from 'react';
import InputForm from './components/InputForm';
import AnalysisDisplay from './components/AnalysisDisplay';
import Loader from './components/Loader';
import { getBettingAnalysis } from './services/geminiService';
import { SparklesIcon } from './components/icons/SparklesIcon';

const App: React.FC = () => {
  const [game, setGame] = useState<string>('Joinville vs. Figueirense');
  const [championship, setChampionship] = useState<string>('Copa SC 2025');
  const [numGames, setNumGames] = useState<number>(15);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = useCallback(async () => {
    if (!game.trim() || !championship.trim()) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await getBettingAnalysis(game, championship, numGames);
      setAnalysisResult(result);
    } catch (err) {
      setError('Ocorreu um erro ao analisar o jogo. Por favor, tente novamente.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [game, championship, numGames]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <SparklesIcon className="w-8 h-8 text-cyan-400" />
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Analisador de Mercados
            </h1>
          </div>
          <p className="text-gray-400 text-lg">
            Análise de apostas esportivas com inteligência artificial.
          </p>
        </header>

        <main>
          <InputForm
            game={game}
            setGame={setGame}
            championship={championship}
            setChampionship={setChampionship}
            numGames={numGames}
            setNumGames={setNumGames}
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
          />

          {error && (
            <div className="mt-6 bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center">
              {error}
            </div>
          )}

          {isLoading && <Loader />}

          <div className={`transition-opacity duration-700 ease-in-out ${analysisResult && !isLoading ? 'opacity-100' : 'opacity-0'}`}>
            {analysisResult && !isLoading && (
              <div className="mt-8">
                <AnalysisDisplay analysis={analysisResult} />
              </div>
            )}
          </div>
        </main>
        
        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} ValueBet Analyzer. Análises geradas por IA.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
