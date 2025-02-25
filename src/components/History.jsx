import React from "react";

function History({ history }) {
  return (
    <div className="history-container">
      <h4>Historial de operaciones</h4>
      {history.length === 0 ? (
        <p className="empty-history">No hay operaciones recientes</p>
      ) : (
        <ul className="history-list">
          {history.map((item, index) => (
            <li key={index}>
              {item.a} {item.op} {item.b} = <strong>{item.res}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default History;
