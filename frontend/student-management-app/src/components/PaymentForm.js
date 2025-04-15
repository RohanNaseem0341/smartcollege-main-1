import React, { useState } from 'react';
import { updateFeePayment } from '../services/api';

const PaymentForm = ({ studentId, amount, onPaymentComplete }) => {
  const [transactionId, setTransactionId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!transactionId.trim() || !phoneNumber.trim()) {
      setError('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    
    try {
      // Call the API to process the payment
      const paymentData = {
        transactionId,
        phoneNumber,
        amount,
        date: new Date().toISOString()
      };
      
      const response = await updateFeePayment(studentId, paymentData);
      
      if (response.success) {
        setLoading(false);
        onPaymentComplete(paymentData);
      } else {
        setError(response.message || 'Payment processing failed. Please try again.');
        setLoading(false);
      }
    } catch (err) {
      setError('Payment processing failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">Pay via Easypaisa</h5>
      </div>
      <div className="card-body">
        <div className="alert alert-info">
          <p><strong>Instructions:</strong></p>
          <ol>
            <li>Send amount of ${amount} to Easypaisa account: <strong>03417220826</strong></li>
            <li>Enter the transaction ID received after payment</li>
            <li>Enter the phone number used for payment</li>
            <li>Submit the form to complete your payment</li>
          </ol>
        </div>
        
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="transactionId" className="form-label">Transaction ID</label>
            <input
              type="text"
              className="form-control"
              id="transactionId"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              placeholder="Enter the transaction ID received from Easypaisa"
              required
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
            <input
              type="text"
              className="form-control"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter the phone number used for payment"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Processing...
              </>
            ) : (
              'Confirm Payment'
            )}
          </button>
          
          <button 
            type="button" 
            className="btn btn-secondary ms-2"
            onClick={() => onPaymentComplete(null)}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm; 