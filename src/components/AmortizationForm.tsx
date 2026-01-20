interface FormData {
  monto: number;
  tasa_anual: number;
  plazo_meses: number;
}

interface Props {
  formData: FormData;
  onChange: (name: keyof FormData, value: string) => void;
  onSubmit: () => void;
  loading: boolean;
}

export default function AmortizationForm({
    formData,
    onChange,
    onSubmit,
    loading,
}: Props) {
    return (
        <div className="card">
            {/* Monto */}
            <div className="form-group">
                <label>Monto a solicitar: 
                    <strong>
                        {" "}
                        ${Number(formData.monto || 1000).toLocaleString()}
                    </strong>
                </label>
                <input 
                    type="range"
                    min={1000}
                    max={1000000}
                    step={1000}
                    list="monto-marks"
                    value={formData.monto || 1000}
                    onChange={(e) => onChange("monto", e.target.value)}
                />
                <datalist id="monto-marks">
                    <option value="50000">$50k</option>
                    <option value="100000">$100k</option>
                    <option value="500000">$500k</option>
                </datalist>

                <div className="range-labels">
                    <span>$1,000</span>
                    <span>$1,000,000</span>
                </div>
            </div>

            {/* Tasa Anual (%) */}
            <div className="form-group">
                <label>Tasa Anual (%)
                    <strong>
                        {formData.tasa_anual || 8}%
                    </strong>
                </label>
                <input
                    type="range"
                    min={8}
                    max={19}
                    step={0.1}
                    value={formData.tasa_anual || 8}
                    onChange={(e) => onChange("tasa_anual", e.target.value)}
                />
                <div className="range-labels">
                    <span>8%</span>
                    <span>19%</span>
                </div>
            </div>

            {/* Plazo (meses) */}
            <div className="form-group">
                <label>
                    Plazo (meses)
                    <strong>
                        {formData.plazo_meses || 3} meses
                    </strong>
                </label>
                <input
                    type="range"
                    min={3}
                    max={60}
                    step={1}
                    list="plazo-marks"
                    value={formData.plazo_meses || 3}
                    onChange={(e) => onChange("plazo_meses", e.target.value)}
                />

                <datalist id="plazo-marks">
                    <option value="6" label="6 meses"></option>
                    <option value="12" label="12 meses"></option>
                    <option value="24" label="24 meses"></option>
                    <option value="36" label="36 meses"></option>
                    <option value="48" label="48 meses"></option>
                </datalist>

                <div className="range-labels">
                    <span>3</span>
                    <span>60</span>
                </div>
            </div>

            <button onClick={onSubmit} disabled={loading}>
                {loading ? "Calculando..." : "Calcular Amortización"}
            </button>
        </div>
    );
}