import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const InvoiceFormPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const [formData, setFormData] = useState({
    invoiceNumber: "",
    clientName: "",
    date: "",
    amount: "",
    status: "Pending",
  });

  // Load existing invoice data if in update mode
  useEffect(() => {
    if (state?.mode === "update" && state?.id) {
      axios.get(`https://invoice-api-m6ei.onrender.com/invoice/${state.id}`)
        .then((res) => {
          setFormData(res.data);
        })
        .catch((err) => console.error("Error loading invoice:", err));
    }
  }, [state]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (state?.mode === "add") {
      axios.post("https://invoice-api-m6ei.onrender.com/add", formData)
        .then(() => {
          console.log("Invoice successfully added");
          navigate("/home");
        })
        .catch((err) => console.error("Error:", err));
    } else if (state?.mode === "update" && state?.id) {
      axios.put(`https://invoice-api-m6ei.onrender.com/update/${state.id}`, formData)
        .then(() => {
          console.log("Invoice successfully updated");
          navigate("/home");
        })
        .catch((err) => console.error("Error:", err));
    } else {
      console.error("Missing ID for update!");
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h2 className="text-center mb-0">
            {state?.mode === "add" ? "Add New Invoice" : "Update Invoice"}
          </h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="invoiceNumber" className="form-label">Invoice Number</label>
              <input
                type="text"
                className="form-control"
                id="invoiceNumber"
                name="invoiceNumber"
                value={formData.invoiceNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="clientName" className="form-label">Client Name</label>
              <input
                type="text"
                className="form-control"
                id="clientName"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="date" className="form-label">Date</label>
              <input
                type="date"
                className="form-control"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="amount" className="form-label">Amount</label>
              <input
                type="number"
                className="form-control"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="status" className="form-label">Status</label>
              <select
                className="form-select"
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-success">
                {state?.mode === "add" ? "Add Invoice" : "Update Invoice"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InvoiceFormPage;
