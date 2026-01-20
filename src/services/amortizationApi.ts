export interface AmortizationRequest {
  monto: number;
  tasa_anual: number;
  plazo_meses: number;
}

export interface AmortizationRow {
  periodo: number;
  cuota: number;
  interes: number;
  capital: number;
  saldo: number;
}

export interface AmortizationResponse {
  tabla: AmortizationRow[];
}
export const simulateAmortization = async (data: any) =>{
    try {
        const response = await fetch("http://127.0.0.1:8000/simulate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        
        if (!response.ok) {
            throw new Error("Error en la API");
        }
        return response.json();
    } catch (error) {
        throw new Error('Error al simular la amortización');
    }
}