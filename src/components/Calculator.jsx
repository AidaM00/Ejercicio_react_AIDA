import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import History from "./History";

function Calculator() {
  const [numA, setNumA] = useState("");
  const [numB, setNumB] = useState("");
  const [operation, setOperation] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]); 
  const [showHistory, setShowHistory] = useState(false);

  const operations = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "×": (a, b) => a * b,
    "÷": (a, b) => (b !== 0 ? a / b : "⚠️ No se puede dividir por 0"),
  };

  const validateInputs = () => {
    if (numA === "" || numB === "") {
      setError("⚠️ Ingresa ambos números");
      setOperation(null);
      return false;
    }

    const a = parseFloat(numA);
    const b = parseFloat(numB);

    if (isNaN(a) || isNaN(b)) {
      setError("⚠️ Solo se permiten números");
      setOperation(null);
      return false;
    }

    setError("");
    return { a, b };
  };

  const handleOperation = (op) => {
    const validated = validateInputs();
    if (!validated) return;

    const { a, b } = validated;
    const res = operations[op](a, b);

    if (typeof res === "string") {
      setError(res);
      setResult(null);
      setOperation(null);
    } else {
      setResult(res);
      setOperation(op);
      setHistory([{ a, op, b, res }, ...history].slice(0, 5)); // Solo mantiene las últimas 5 operaciones
    }
  };

  // Función para limpiar los inputs y operadores
  const handleClear = () => {
    setNumA("");
    setNumB("");
    setOperation(null);
    setResult(null);
    setError("");
  };

  return (
    <div className="calculator-container">
      <div className="calculator-card">
        <h2 className="title">🔢 CALCULADORA 🔢</h2>

        <input
          type="text"
          className="calculator-input"
          placeholder="Número A"
          value={numA}
          onChange={(e) => setNumA(e.target.value)}
        />
        <input
          type="text"
          className="calculator-input"
          placeholder="Número B"
          value={numB}
          onChange={(e) => setNumB(e.target.value)}
        />

        {error && <div className="error-message">{error}</div>}

        <div className="button-group">
          {Object.keys(operations).map((op) => (
            <button
              key={op}
              className={`calculator-button ${operation === op ? "active" : ""}`}
              onClick={() => handleOperation(op)}
            >
              {op}
            </button>
          ))}
        </div>

        {result !== null && !error && (
          <div className="result">
            <h4>
              {numA} {operation} {numB} = {result}
            </h4>
          </div>
        )}

        <div className="bottom-buttons">
          <button className="clear-button" onClick={handleClear}>
            🧹 Limpiar
          </button>
          <button className="history-toggle" onClick={() => setShowHistory(!showHistory)}>
            📜 {showHistory ? "Ocultar historial" : "Ver historial"}
          </button>
        </div>

        {showHistory && <History history={history} />}
      </div>
    </div>
  );
}

export default Calculator;
