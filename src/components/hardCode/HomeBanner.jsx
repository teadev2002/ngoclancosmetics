import React from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';
import poster from '../../assets/poster.jpg';

const HomeBanner = () => {
  return (
   <section id="home" className="hero-section py-5">
        <Container>
          <Row className="align-items-center min-vh-100">
            <Col md={6} className="order-2 order-md-1 text-center text-md-start">
              <div className="hero-content">
                <h1 className="hero-title">
                  Vẻ đẹp tinh túy từ <span className="highlight">Nhật Bản</span>
                </h1>
                <p className="hero-subtitle">
                  Khám phá mỹ phẩm & chăm sóc da cao cấp xách tay từ Nhật Bản, đảm bảo chính hãng và tươi mới.
                </p>
                <div className="hero-buttons">
                  <Button className="btn btn-primary btn-lg me-3">Shop Now</Button>
                </div>
                <div className="hero-features mt-4">
                  <div className="feature-item"><span className="feature-icon">✨</span>100% Hàng thật</div>
                  <div className="feature-item"><span className="feature-icon">🚀</span>Giao hàng nhanh</div>
                  <div className="feature-item"><span className="feature-icon">💝</span>Chất lượng tuyệt vời</div>
                </div>
              </div>
            </Col>
            <Col md={6} className="order-1 order-md-2 mt-4 mt-md-0">
              <div className="hero-image">
                <img src={poster} alt="Japanese Cosmetics" className="img-fluid" />
                <div className="floating-badge"><span>Liên hệ ngay Zalo: 0902715456</span></div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
  );
}
export default HomeBanner;