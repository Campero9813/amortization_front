interface Row {
  periodo: number;
  cuota: number;
  interes: number;
  capital: number;
  saldo: number;
}

interface Props {
  tabla: Row[];
}
export default function AmortizationTable({ tabla }: Props) {
    if (!tabla || tabla.length === 0) return null;
    return (
        <div className="table-container">
            <h2>Tabla de Amortización</h2>

            <table>
                <thead>
                    <tr>
                        <th>Periodo</th>
                        <th>Pago</th>
                        <th>Interes</th>
                        <th>Capital</th>
                        <th>Saldo</th>
                    </tr>
                </thead>
                <tbody>
                    {tabla.map((row) => (
                        <tr key={row.periodo}>
                            <td>{row.periodo}</td>
                            <td>{row.cuota.toFixed(2)}</td>
                            <td>{row.interes.toFixed(2)}</td>
                            <td>{row.capital.toFixed(2)}</td>
                            <td>{row.saldo.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}