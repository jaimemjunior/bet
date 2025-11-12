import { GoogleGenAI } from "@google/genai";

const getBettingAnalysis = async (game: string, championship: string, numGames: number): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    Você é um analista de dados esportivos meticuloso e objetivo. Sua única tarefa é realizar uma análise estatística rigorosa e determinar o mercado com a maior probabilidade de sucesso com base nos dados fornecidos. Sua recomendação deve ser consistente e diretamente derivada da análise.

    **Jogo:** "${game}"
    **Campeonato:** "${championship}"
    **Base de Dados:** Últimos ${numGames} jogos de cada equipe.

    **Processo de Análise (Obrigatório):**
    1.  Colete dados estatísticos para ambos os times nos últimos ${numGames} jogos.
    2.  Analise especificamente o desempenho do time da casa jogando EM CASA e o desempenho do time visitante jogando FORA.
    3.  Com base nesta análise focada, identifique o único mercado estatisticamente mais forte. Considere mercados como Total de Gols (Over/Under), Ambos Marcam (Sim/Não), Handicaps e Dupla Chance.
    4.  Sintetize a sua conclusão em uma recomendação única.

    **Formato da Resposta (Obrigatório):**
    Apresente sua análise final usando EXATAMENTE os seguintes cabeçalhos em markdown. Não inclua mercados alternativos.

    ### **MERCADO PRINCIPAL**
    [Sugira o único mercado com a maior base estatística. Seja específico. Ex: Total de Gols: Menos de 2.5]

    ### **JUSTIFICATIVA**
    [Apresente um resumo detalhado e objetivo que comprove a escolha do mercado. Detalhe a performance estatística do mandante em casa e do visitante fora, usando os dados dos últimos ${numGames} jogos para embasar a sua conclusão de forma inequívoca.]

    ### **ESTRATÉGIA DE APOSTA**
    [Recomende a melhor janela de aposta com base na análise. Ex: Apostar Pré-jogo, pois as estatísticas são muito consolidadas.]

    ### **NÍVEL DE CONFIANÇA**
    [Atribua um nível de confiança para o mercado recomendado: Baixo, Médio ou Alto.]
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get analysis from Gemini API.");
  }
};

export { getBettingAnalysis };