import { useEffect, useState } from "react";
import "./ThankYou.css";

const ThankYou = () => {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const sponsorData = JSON.parse(sessionStorage.getItem("sponsorFormData"));
    const alreadySent = sessionStorage.getItem("sponsorConfirmationSent") === "true";

    if (sponsorData && !alreadySent) {
      setFormData(sponsorData);

      fetch("https://backend.ogktma.org/sponsor-donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sponsorData)
      })
        .then(res => res.json())
        .then(data => {
          console.log("✅ Sponsor confirmation sent", data);
          sessionStorage.setItem("sponsorConfirmationSent", "true");
        })
        .catch(err => console.error("❌ Sponsor confirmation failed", err));
    }

    return () => {
      // Cleanup to prevent reuse on reload
      setTimeout(() => {
        sessionStorage.removeItem("sponsorFormData");
        sessionStorage.removeItem("sponsorConfirmationSent");
      }, 3000);
    };
  }, []);

  return (
    <div className="thank-you-page">
      <div className="thank-you-box">
        <h2>🎉 Thank You for Your Sponsorship!</h2>
        <p>Your payment has been received successfully.</p>

        {formData && (
          <div className="details-box">
            <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Phone:</strong> {formData.phone || "-"}</p>
            <p><strong>Company:</strong> {formData.companyName || "-"}</p>
            <p><strong>Donation:</strong> ${Number(formData.donation).toFixed(2)}</p>
            {formData.taxId && <p><strong>Tax ID / W9:</strong> {formData.taxId}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ThankYou;
