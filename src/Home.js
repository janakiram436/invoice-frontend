import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const HomePage = () => {
  const [arrayOfInvoices, setInvoices] = useState([]);
  const navigate = useNavigate();

  // Fetch invoices from the backend
  useEffect(() => {
    axios("http://localhost:5000/home")
      .then((res) => {
        setInvoices(res.data);
      })
      .catch((err) => console.error("Error fetching invoices: ", err));
  }, []);

  // Navigate to the Add Invoice form
  const handleAddInvoice = useCallback(() => {
    navigate("/invoice", { state: { mode: "add" } });
  }, [navigate]);

  // Navigate to the Update Invoice form
  const handleUpdateInvoice = useCallback((invoiceId) => {
    navigate("/invoice", { state: { mode: "update", id: invoiceId } });
  }, [navigate]);
  const handleDeleteInvoice = (invoiceId) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      axios
        .delete(`http://localhost:5000/delete/${invoiceId}`)
        .then((res) => {
          console.log("Invoice successfully deleted");
          setInvoices(arrayOfInvoices.filter((invoice) => invoice._id !== invoiceId));
        })
        .catch((err) => {
          console.error("Error deleting invoice:", err);
        });
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary mb-4">Invoices Data</h1>
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-success" onClick={handleAddInvoice}>
          Add New Invoice
        </button>
      </div>
      {arrayOfInvoices.length === 0 ? (
        <p className="text-center text-danger">No invoices found. Please add one.</p>
      ) : (
        <ul className="list-group">
          {arrayOfInvoices.map((invoice) => (
            <li
              key={invoice._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong className="text-dark">{invoice.invoiceNumber}</strong> -{" "}
                <span className="text-muted">{invoice.clientName}</span>
                <span className="badge bg-info ms-3">
                  Date: {new Date(invoice.date).toLocaleDateString()}
                </span>
                <span className="badge bg-secondary ms-3">Status: {invoice.status}</span>
              </div>
              <div>
                <button
                  className="btn btn-primary me-2"
                  onClick={() => handleUpdateInvoice(invoice._id)}
                >
                  Update
                </button>
                <button className="btn btn-danger" onClick={() => handleDeleteInvoice(invoice._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;
