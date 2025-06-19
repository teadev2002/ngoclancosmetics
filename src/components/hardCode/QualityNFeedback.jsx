import React from 'react';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import poster from '../../assets/poster.jpg';

const QualityNFeedback = () => {
  const testimonials = [
    { id: 1, text: 'Sản phẩm Nhật Bản chính hãng với mức giá phải chăng!', author: 'C. Tú', rating: 5, location: 'HCM' },
    { id: 2, text: 'Da tôi chưa bao giờ cảm thấy tốt như vậy. Rất đáng để thử!', author: 'L. Anh', rating: 5, location: 'Hà Nội' },
    { id: 3, text: 'Giao hàng nhanh và sản phẩm chính hãng. Sẽ tiếp tục ủng hộ!', author: 'T. Chung', rating: 5, location: 'Đà Nẵng' },
  ];

  return (
    <>
      {/* Authenticity Section */}
      <section id="about" className="authenticity-section py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="order-md-2">
              <div className="authenticity-image">
                <img src={poster} alt="Japanese Beauty Store" className="img-fluid rounded" />
              </div>
            </Col>
            <Col md={6} className="order-md-1">
              <div className="authenticity-content">
                <h2 className="section-title">Chất lượng Nhật Bản chính hiệu</h2>
                <div className="authenticity-features">
                  <div className="feature-card">
                    <div className="feature-icon-wrapper"><span className="feature-icon">🇯🇵</span></div>
                    <div className="feature-content">
                      <h4>Nhập trực tiếp từ Nhật Bản</h4>
                      <p>Tất cả sản phẩm được nhập khẩu trực tiếp từ Nhật Bản và được đóng gói cẩn thận.</p>
                    </div>
                  </div>
                  <div className="feature-card">
                    <div className="feature-icon-wrapper"><span className="feature-icon">🔒</span></div>
                    <div className="feature-content">
                      <h4>Cam kết chính hãng 100%</h4>
                      <p>Chúng tôi hợp tác với các nhà cung cấp uy tín để đảm bảo tính xác thực và độ tươi mới.</p>
                    </div>
                  </div>
                  <div className="feature-card">
                    <div className="feature-icon-wrapper"><span className="feature-icon">⚡</span></div>
                    <div className="feature-content">
                      <h4>Tươi mới & Hiện đại</h4>
                      <p>Trải nghiệm triết lý chăm sóc da nổi tiếng của Nhật Bản: dịu nhẹ nhưng hiệu quả vượt trội.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="section-title">Phản hồi từ khách hàng</h2>
          </div>
          <Carousel indicators={false} className="testimonial-slider">
            {testimonials.map(testimonial => (
              <Carousel.Item key={testimonial.id}>
                <div className="testimonial-card p-4 text-center mx-auto">
                  <div className="stars mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="star">⭐</span>
                    ))}
                  </div>
                  <p className="testimonial-text">"{testimonial.text}"</p>
                  <div className="testimonial-author">
                    <strong>{testimonial.author}</strong>
                    <span className="location">{testimonial.location}</span>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </Container>
      </section>
    </>
  );
};

export default QualityNFeedback;