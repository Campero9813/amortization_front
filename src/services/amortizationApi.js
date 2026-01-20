export const simulateAmortization = async (data) =>{
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