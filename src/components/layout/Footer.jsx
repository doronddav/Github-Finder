import React from "react";

function Footer() {
  const footerYear = new Date().getFullYear();
  return (
    <footer className="footer p-10 bg-grey-700 text-primary-content footer-center">
      <div>
        <svg></svg>
        <p>Copyright &copy; D.D {footerYear}</p>
      </div>
    </footer>
  );
}

export default Footer;
