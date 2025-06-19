import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer id="contact" className="footer py-5">
      <Container>
        <Row>
          <Col md={6} className="mb-4 mb-md-0">
            <div className="footer-brand">
              <h3 className="brand-text">Ngọc Lan Cosmetics</h3>
              <p>Mang đến cho bạn những sản phẩm làm đẹp chuẩn Nhật chính hiệu.</p>
            </div>
          </Col>
          <Col md={6} className="mb-4 mb-md-0">
            <h4 className="footer-title">Liên hệ</h4>
            <div className="contact-info">
              <p>
                <span>📞</span><strong>Zalo:</strong> 0902715456
              </p>
              <p>
                <span>📍</span><strong>Địa chỉ:</strong> 6B5, đường Hà Huy Giáp, Phường Thạnh Lộc, Quận 12, TPHCM
              </p>
            </div>
          </Col>
        </Row>
        <hr className="footer-divider mt-4 mb-3" />
        <p className="footer-copyright text-center mb-0">© 2025 Bản quyền thuộc về github: teadev2002</p>
      </Container>
    </footer>
  );
};

export default Footer;