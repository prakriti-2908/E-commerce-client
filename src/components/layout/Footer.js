import {Link} from 'react-router-dom';
import "../styles/Footer.css";

export default function Footer() {
  return (
    <section>
  <footer className="upper-footer text-center">
    <div className="upper-footer container p-4">
      <div className="row">
        <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
          <h5 className="text-uppercase">Chhammak Chhallo</h5>
          <p>
          At Chhammak Chhallo, we celebrate the rich diversity of ethnic fashion with a wide range of clothing, footwear, and accessories for women, men, and kids. 
          </p>
        </div>
        <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
          <h5 className="text-uppercase">Links</h5>
          <ul className="list-unstyled mb-0">
            <li>
              <Link to="/about" className="text-body">About Us</Link>
            </li>
            <li>
              <Link to="/contact" className="text-body">Contact Us</Link>
            </li>
            <li>
              <Link to="/delete-account" className="text-body">Delete Acc.</Link>
            </li>
            {/* <li>
              <Link href="#!" className="text-body">Link 3</Link>
            </li>
            <li>
              <Link href="#!" className="text-body">Link 4</Link>
            </li> */}
          </ul>
        </div>
        <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
          <h5 className="text-uppercase mb-0">Links</h5>
          <ul className="list-unstyled">
            <li>
              <Link to="/policy" className="text-body">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/register" className="text-body">Register</Link>
            </li>
            <li>
              <Link to="/login" className="text-body">Login</Link>
            </li>
            <li>
              <Link to="/admin" className="text-body">Admin Panel</Link>
            </li>
            
          </ul>
        </div>
      </div>
    </div>
    <div className="bottom-footer text-center p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.05)'}}>
      © 2020 Copyright:
      <Link to='/' className='text-body'>  chhammak-chhallo.com</Link>
    </div>
    {/* Copyright */}
  </footer>
  {/* Footer */}
</section>

  )
}
