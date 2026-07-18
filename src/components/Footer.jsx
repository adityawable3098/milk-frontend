import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer py-2 text-light">

      <div className="container">
        <div className="row">

          <div className="col-md-6">
            <h5>🐄 Milk Collection System</h5>
            <p>Smart Dairy Management for Rural Farmers.</p>
          </div>

          <div className="col-md-6 text-end">
            <h6>Follow Us</h6>

            <div className="d-flex justify-content-end align-items-center gap-3 fs-5">
              <i className="bi bi-facebook"></i>
              <i className="bi bi-instagram"></i>
              <i className="bi bi-twitter"></i>
            </div>

          </div>

        </div>

        <hr />

        <div className="text-center small">
          © 2025 Milk Collection System | Designed for Rural Dairy Software
        </div>
      </div>

    </footer>
  );
}