import React, { useState, useEffect } from 'react';
import './Predict.css';
import { useNavigate } from 'react-router-dom';

const Predict = () => {
  const [inputData, setInputData] = useState({
    age: '',
    sex: '',
    cp: '',
    trestbps: '',
    chol: '',
    fbs: '',
    restecg: '',
    thalach: '',
    exang: '',
    oldpeak: '',
    slope: '',
    ca: '',
    thal: ''
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("loggedIn") !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setLoading(true);

    const frontendOrder = ['age', 'trestbps', 'chol', 'thalach', 'oldpeak', 'sex', 'cp', 'fbs', 'restecg', 'exang', 'slope', 'ca', 'thal'];

    const values = frontendOrder.map(key => Number(inputData[key]));

    if (values.some(val => isNaN(val))) {
      setError("All fields are required and must be valid numbers.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("https://backend-5jrx.onrender.com/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: values }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        const probabilityText = data.probability !== undefined ? ` (Probability: ${data.probability})` : '';
        const riskText = data.risk || (data.result === 1 ? "🧠 High Risk" : "💓 Low Risk");
        setResult(`${riskText}${probabilityText}`);
      }
    } catch (err) {
      setError("Server error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="predict-container">
      <h2>Heart Disease Risk Prediction</h2>

      <form onSubmit={handleSubmit} className="predict-form">
        {/* NUMERIC INPUTS */}
        <label>Age: <input type="number" name="age" value={inputData.age} onChange={handleChange} required /></label>
        <label>Resting BP: <input type="number" name="trestbps" value={inputData.trestbps} onChange={handleChange} required /></label>
        <label>Cholesterol: <input type="number" name="chol" value={inputData.chol} onChange={handleChange} required /></label>
        <label>Max Heart Rate: <input type="number" name="thalach" value={inputData.thalach} onChange={handleChange} required /></label>
        <label>Oldpeak: <input type="number" step="0.1" name="oldpeak" value={inputData.oldpeak} onChange={handleChange} required /></label>

        {/* DROPDOWNS */}
        <label>Sex:
          <select name="sex" value={inputData.sex} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="1">Male</option>
            <option value="0">Female</option>
          </select>
        </label>

        <label>Chest Pain Type:
          <select name="cp" value={inputData.cp} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="0">Typical Angina</option>
            <option value="1">Atypical Angina</option>
            <option value="2">Non-anginal Pain</option>
            <option value="3">Asymptomatic</option>
          </select>
        </label>

        <label>Fasting Blood Sugar &gt; 120?
          <select name="fbs" value={inputData.fbs} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </label>

        <label>Rest ECG:
          <select name="restecg" value={inputData.restecg} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="0">Normal</option>
            <option value="1">ST-T Abnormality</option>
            <option value="2">LV Hypertrophy</option>
          </select>
        </label>

        <label>Exercise Induced Angina?
          <select name="exang" value={inputData.exang} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </label>

        <label>Slope:
          <select name="slope" value={inputData.slope} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="0">Upsloping</option>
            <option value="1">Flat</option>
            <option value="2">Downsloping</option>
          </select>
        </label>

        <label>Number of Major Vessels (0–3):
          <select name="ca" value={inputData.ca} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </label>

        <label>Thalassemia:
          <select name="thal" value={inputData.thal} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="1">Normal</option>
            <option value="2">Fixed Defect</option>
            <option value="3">Reversible Defect</option>
          </select>
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Predicting...' : 'Predict'}
        </button>

        {error && <p className="error">{error}</p>}
        {result && <p className="result">{result}</p>}
      </form>
    </div>
  );
};

export default Predict;
