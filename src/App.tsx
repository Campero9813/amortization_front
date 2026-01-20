import { useEffect, useState } from "react";
import {simulateAmortization} from "./services/amortizationApi";
import AmortizationForm from "./components/AmortizationForm";
import AmortizationTable from "./components/AmortizationTable";


function App() {
  /* const [formData, setFormData] = useState({
    monto: "1000",
    tasa_anual: "8",
    plazo_meses: "3"
  }); */

  const[formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("amortizacionForm")

    return savedData 
      ? JSON.parse(savedData)
      : {
        monto: 1000,
        tasa_anual: 8,
        plazo_meses: 3,
      }
  })

  const [tabla, setTabla] = useState([]);
  const [loading, setLoading] = useState(false);


  //Cargar datos con localstorage
/*   useEffect(() => {
    const saveData = localStorage.getItem("amortizacionForm");
    if (saveData) {
      setFormData(JSON.parse(saveData));
    }
  }, []); */

  // Guardar cambios del formulario
  useEffect(() => {
    localStorage.setItem("amortizacionForm", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (name: string, value: string) => {
    setFormData((prev: FormData) => ({
      ...prev,
      [name]: Number(value),
    }));
    
    //Borrar la tabla si cambia el monto
    if(name === "monto"){
      setTabla([]);
    }
  };

  const handleSubmit = async () => {
    try{
      setLoading(true);
      const response = await simulateAmortization({
        monto: Number(formData.monto),
        tasa_anual: Number(formData.tasa_anual),
        plazo_meses: Number(formData.plazo_meses),
      });
      
      setTabla (response.tabla);

      } catch (error) {
        console.error("Error al simular la amortización:", error);
      } finally {
        setLoading(false);
        }
  };

  return (
    <div className="container">
      <h1>Simulador de Amortización</h1>

      <AmortizationForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        loading={loading}
      />

      {tabla.length > 0 && <AmortizationTable tabla={tabla} />}
    </div>
  );
}

export default App;