import { useEffect, useState } from "react";
import "./ThankYou.css";

const ThankYouMember = () => {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const memberData = JSON.parse(sessionStorage.getItem("memberFormData"));
    const alreadySent = sessionStorage.getItem("confirmationSent") === "true";

    if (memberData && !alreadySent) {
      setFormData(memberData);
      sessionStorage.setItem("confirmationSent", "true"); // Flag first

      fetch("https://backend.ogktma.org/member-donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(memberData)
      })
        .then(res => res.json())
        .then(data => {
          console.log("✅ Member confirmation sent", data);
        })
        .catch(err => console.error("❌ Member confirmation failed", err));
    }

    return () => {
      setTimeout(() => {
        sessionStorage.removeItem("memberFormData");
        sessionStorage.removeItem("confirmationSent");
      }, 3000);
    };
  }, []);

  return (
    <div className="thank-you-page">
      <div className="thank-you-box">
        <h2>🎉 Thank You for Registering!</h2>
        <p>Your payment has been received successfully.</p>

        {formData && (
          <div className="details-box">
            <p><strong>Name:</strong> {formData.firstName || ''} {formData.lastName || ''}</p>
            <p><strong>Email:</strong> {formData.email || ''}</p>
            <p><strong>Phone:</strong> {formData.phone || ''}</p>
            <p><strong>Membership Type:</strong> {formData.membershipType || ''}</p>
            <p><strong>Donation:</strong> ${Number(formData.donation || 0).toFixed(2)}</p>
            <p><strong>Total Amount Paid:</strong> ${Number(formData.totalAmount || 0).toFixed(2)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThankYouMember;
