import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { sendNotificationToSW } from 'shared/utils/notifications.utils';
import './AnalisisIA.css';
import { formatCurrency } from 'shared/utils/number.utils';
import { useTypewriter } from 'shared/hooks/useTypewriter';
import { CurrencyText } from 'shared/components/CurrencyText';
import { AnimateCharacters } from './AnimateCharacters';

// --- Configuración para Pruebas ---
// Día de la semana para la actualización (0=Domingo, 1=Lunes, 2=Martes, etc.)
const ANALYSIS_UPDATE_DAY = 1; // Lunes
// Hora del día (en formato 24h) para la actualización.
const ANALYSIS_UPDATE_HOUR = 10; // 10 AM
// ---------------------------------

const TIPS_BANK = [
  "Revisa tus suscripciones mensuales. ¿Realmente las usas todas?",
  "Intenta cocinar en casa más a menudo para reducir gastos en restaurantes.",
  "Antes de una compra grande, espera 24 horas. A veces el impulso desaparece.",
  "Establece metas de ahorro pequeñas y celebra cuando las alcances.",
  "La próxima vez que vayas de compras, haz una lista y apégate a ella.",
  "Compara precios en diferentes tiendas antes de comprar un artículo caro.",
  "Asigna un presupuesto específico para tus hobbies y gastos de ocio.",
  "¿Has considerado usar transporte público o compartir coche para ahorrar en gasolina?",
  "Busca descuentos y cupones antes de finalizar tus compras en línea.",
  "El café de la mañana suma. Prepararlo en casa puede ahorrarte una suma considerable al mes.",
  "Vende artículos que ya no uses. Es una excelente forma de obtener un ingreso extra.",
  "Automatiza tus ahorros. Configura una transferencia automática a tu cuenta de ahorros cada mes.",
  "Revisa tu factura de teléfono e internet. ¿Podrías encontrar un plan más económico?",
  "Opta por marcas genéricas en el supermercado. La calidad suele ser similar por un menor precio.",
  "Planifica tus comidas para la semana para evitar compras impulsivas y desperdicio de comida.",
  "Bebe más agua. Es más sano y barato que las bebidas azucaradas.",
  "Pide prestado en lugar de comprar. Libros, herramientas, etc.",
  "Cancela las pruebas gratuitas antes de que te cobren si no planeas usar el servicio.",
  "Aprovecha los programas de lealtad y puntos de tus tiendas favoritas.",
  "Haz un seguimiento de tus pequeños gastos. A menudo son los que más suman sin que te des cuenta."
];

const LOCAL_STORAGE_ANALYSIS_KEY = 'geminiAnalysisData';
const LOCAL_STORAGE_TIMESTAMP_KEY = 'geminiAnalysisTimestamp';

interface AnalysisData {
  totalSpent: number;
  topCategoryName: string;
  tips: string[];
}

const AnalisisIA: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [isNewAnalysis, setIsNewAnalysis] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const transacciones = useSelector((state: RootState) => state.finances.transacciones);

  const speed1 = useMemo(() => Math.random() * (80 - 40) + 40, []);
  const speed2 = useMemo(() => Math.random() * (80 - 40) + 40, []);

  const animatedTip1 = useTypewriter(analysisData?.tips[0] || '', speed1, isNewAnalysis);
  const animatedTip2 = useTypewriter(analysisData?.tips[1] || '', speed2, isNewAnalysis);

  useEffect(() => {
    const now = new Date();
    const lastAnalysisTimestamp = localStorage.getItem(LOCAL_STORAGE_TIMESTAMP_KEY);
    const cachedAnalysisJSON = localStorage.getItem(LOCAL_STORAGE_ANALYSIS_KEY);

    const lastUpdatePoint = new Date(now);
    const currentDay = lastUpdatePoint.getDay();
    const daysToSubtract = (currentDay - ANALYSIS_UPDATE_DAY + 7) % 7;
    lastUpdatePoint.setDate(lastUpdatePoint.getDate() - daysToSubtract);
    lastUpdatePoint.setHours(ANALYSIS_UPDATE_HOUR, 0, 0, 0);
    if (now < lastUpdatePoint) {
      lastUpdatePoint.setDate(lastUpdatePoint.getDate() - 7);
    }

    let shouldGenerateNewAnalysis = true;
    if (lastAnalysisTimestamp) {
      const lastAnalysisDate = new Date(parseInt(lastAnalysisTimestamp, 10));
      if (lastAnalysisDate > lastUpdatePoint) {
        shouldGenerateNewAnalysis = false;
      }
    }

    if (shouldGenerateNewAnalysis && transacciones.length > 2) {
      setIsLoading(true);
      setAnalysisData(null);
      setError(null);

      setTimeout(() => {
        const totalSpent = transacciones.reduce((acc, t) => acc + t.monto, 0);
        const categoryTotals = transacciones.reduce((acc, t) => {
          acc[t.categoria] = (acc[t.categoria] || 0) + t.monto;
          return acc;
        }, {} as Record<string, number>);
        const topCategoryName = Object.keys(categoryTotals).reduce((a, b) => categoryTotals[a] > categoryTotals[b] ? a : b, '');
        const shuffledTips = [...TIPS_BANK].sort(() => 0.5 - Math.random());
        const selectedTips = shuffledTips.slice(0, 2);

        const newAnalysisData: AnalysisData = {
          totalSpent,
          topCategoryName,
          tips: selectedTips,
        };

        setAnalysisData(newAnalysisData);
        setIsNewAnalysis(true);
        setIsLoading(false);
        localStorage.setItem(LOCAL_STORAGE_ANALYSIS_KEY, JSON.stringify(newAnalysisData));
        localStorage.setItem(LOCAL_STORAGE_TIMESTAMP_KEY, new Date().getTime().toString());

        sendNotificationToSW({ type: 'SHOW_ANALYSIS_NOTIFICATION' });

      }, 2500);
    } else if (cachedAnalysisJSON) {
      setAnalysisData(JSON.parse(cachedAnalysisJSON));
      setIsNewAnalysis(false);
    } else {
      setError('No hay suficientes datos para generar un análisis. Registra más gastos para empezar.');
    }
  }, [transacciones]);

  return (
    <div className="analisis-ia">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <h4 style={{ margin: 0 }}>Análisis y consejos</h4>
        {isNewAnalysis && (
          <span style={{ color: 'var(--listado-color)', fontSize: '0.9rem', fontWeight: 'bold', backgroundColor: 'var(--listado-color-opacity)', padding: '2px 6px', borderRadius: '4px' }}>
            New!
          </span>
        )}
      </div>

      {isLoading && (
        <div className="loading-text">
          Analizando patrones con <span>Gemini AI</span>...
        </div>
      )}

      {!isLoading && analysisData && (
        <div className="analysis-result">
          <h5>Patrones de Gasto:</h5>
          <ul>
            <li>
              {isNewAnalysis ? (
                <>
                  <AnimateCharacters text="Has gastado un total de " />
                  <strong style={{ fontSize: "1.1rem" }}>
                    <CurrencyText /> <AnimateCharacters text={formatCurrency(analysisData.totalSpent)} />
                  </strong>
                  <AnimateCharacters text=" este periodo." />
                </>
              ) : (
                <>
                  Has gastado un total de{" "}
                  <strong style={{ fontSize: "1.1rem" }}>
                    <CurrencyText /> {formatCurrency(analysisData.totalSpent)}
                  </strong>{" "}
                  este periodo.
                </>
              )}
            </li>
            <li>
              {isNewAnalysis ? (
                <>
                  <AnimateCharacters text="Tu principal categoría de gasto es " />
                  <strong>
                    <AnimateCharacters text={analysisData.topCategoryName} />
                  </strong>
                  <AnimateCharacters text="." />
                </>
              ) : (
                <>
                  Tu principal categoría de gasto es{" "}
                  <strong>{analysisData.topCategoryName}</strong>.
                </>
              )}
            </li>
          </ul>
          <h5 style={{ paddingTop: "1rem" }}>Tips Personalizados:</h5>
          <ul>
            {analysisData.tips[0] && <li>{animatedTip1}</li>}
            {analysisData.tips[1] && <li>{animatedTip2}</li>}
          </ul>
        </div>
      )}

      {!isLoading && error && (
        <div className="analysis-result">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default AnalisisIA;