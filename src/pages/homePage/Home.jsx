 import { Container, Navbar, Nav, Row, Col, Carousel, Card, Button, Modal } from 'react-bootstrap';
import * as htmlToImage from 'html-to-image';
import { ToastContainer, toast } from 'react-toastify'; // Add react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Add toastify CSS
import './HomeStyle.scss';
import React, { useState, useRef } from 'react'; // Added missing React import

// Import product images
import chongNang from '../../assets/chong-nang-cao-cap.jpg';
import daDay from '../../assets/da-day.jpg';
import serum from '../../assets/serum-duong-trang.jpg';
import suaRuaMat from '../../assets/sua-rua-mat.jpg';
import thuocNhoMat from '../../assets/thuoc-nho-mat.jpg';
import poster from '../../assets/poster.jpg';
import footerImg from '../../assets/footerImg.jpg';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [productName, setProductName] = useState('');
  const productCardRef = useRef(null);

  const captureAndPreview = async (productId) => {
    try {
      const cardElement = document.querySelector(`#product-${productId} .card`);
      if (!cardElement) return;

      // Temporarily hide the "Order" button
      const button = cardElement.querySelector('.btn-primary');
      if (button) {
        button.style.display = 'none';
      }

      // Get the product name
      const nameElement = cardElement.querySelector('.product-name');
      const name = nameElement ? nameElement.textContent : '';

      // Capture the image
      const imgData = await htmlToImage.toPng(cardElement);

      // Restore the button visibility
      if (button) {
        button.style.display = 'block';
      }

      setCapturedImage(imgData);
      setProductName(name);
      setShowModal(true);
    } catch (error) {
      console.error('Error capturing image:', error);
      toast.error('Lỗi khi chụp ảnh sản phẩm!', { autoClose: 2000 });
    }
  };

  const sendImage = async () => {
    if (!capturedImage) return;

    try {
      // Convert base64 image to blob
      const response = await fetch(capturedImage);
      const blob = await response.blob();
      const file = new File([blob], `${productName}.png`, { type: 'image/png' });

      // Check if Web Share API is supported
      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `Sản phẩm: ${productName}`,
          text: `Xem sản phẩm ${productName} từ Ngọc Lan Cosmetics! Liên hệ Zalo: 0902715456`,
        });
        toast.success('Đã chia sẻ sản phẩm!', { autoClose: 2000 });
        setShowModal(false);
        setCapturedImage(null);
        setProductName('');
      } else {
        // Fallback: Download the image
        const link = document.createElement('a');
        link.href = capturedImage;
        link.download = `${productName}.png`;
        link.click();
        toast.info('Chia sẻ không hỗ trợ. Đã tải ảnh xuống!', { autoClose: 2000 });
        setShowModal(false);
        setCapturedImage(null);
        setProductName('');
      }
    } catch (error) {
      console.error('Error sharing image:', error);
      toast.error('Lỗi khi chia sẻ ảnh!', { autoClose: 2000 });
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setCapturedImage(null);
    setProductName('');
  };

  const products = [
    { id: 1, name: 'Chống Nắng', price: '¥4,200', image: chongNang, badge: 'Best Seller' },
    { id: 2, name: 'Sữa Rửa Mặt', price: '¥3,800', image: suaRuaMat, badge: 'Popular' },
    { id: 3, name: 'Thuốc Nhỏ Mắt', price: '¥3,500', image: thuocNhoMat, badge: 'New' },
    { id: 4, name: 'Serum Dưỡng Trắng', price: '¥5,600', image: serum, badge: 'Premium' },
    { id: 5, name: 'Dạ Dày', price: '¥4,900', image: daDay, badge: 'Limited' },
  ];

  const testimonials = [
    { id: 1, text: 'Sản phẩm Nhật Bản chính hãng với mức giá phải chăng!', author: 'C. Tú', rating: 5, location: 'HCM' },
    { id: 2, text: 'Da tôi chưa bao giờ cảm thấy tốt như vậy. Rất đáng để thử!', author: 'L. Anh', rating: 5, location: 'Hà Nội' },
    { id: 3, text: 'Giao hàng nhanh và sản phẩm chính hãng. Sẽ tiếp tục ủng hộ!', author: 'T. Chung', rating: 5, location: 'Đà Nẵng' },
  ];

  return (
    <div className="landing-page">
      {/* Toast Container for Notifications */}
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} />

      {/* Header */}
      <header className="header fixed-top">
        <Navbar expand="lg" className="navbar px-3">
          <Container>
            <Navbar.Brand href="#home" className="brand-text">Ngọc Lan Cosmetics</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link href="#home" className="nav-link">Zalo: 0902715456</Nav.Link>
                <Nav.Link href="#home" className="nav-link">Trang chủ</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      {/* Hero Section */}
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
                  <div className="feature-item"><span className="feature-icon">✨</span>100% Authentic</div>
                  <div className="feature-item"><span className="feature-icon">🚀</span>Fast Delivery</div>
                  <div className="feature-item"><span className="feature-icon">💝</span>Premium Quality</div>
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

      {/* Products Section */}
      <section id="products" className="products-section py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="section-title">Sản Phẩm</h2>
            <p className="section-subtitle">Sản phẩm cao cấp được tuyển chọn kỹ lưỡng từ Nhật Bản</p>
          </div>
          <Row xs={1} md={2} lg={3} className="g-4">
            {products.map(product => (
              <Col key={product.id} id={`product-${product.id}`}>
                <Card className="product-card h-100">
                  <div className="product-image-wrapper">
                    <img src={product.image} alt={product.name} className="product-image" />
                    <div className="product-badge">{product.badge}</div>
                    <div className="product-overlay">
                      <Button className="btn btn-light btn-sm">Quick View</Button>
                    </div>
                  </div>
                  <Card.Body className="product-info text-center">
                    <Card.Title className="product-name">{product.name}</Card.Title>
                    <Card.Text className="product-price">{product.price}</Card.Text>
                    <Button
                      className="btn btn-primary btn-sm w-100"
                      onClick={() => captureAndPreview(product.id)}
                    >
                      Order
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

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

      {/* Footer */}
      <footer id="contact" className="footer py-5">
        <Container>
          <Row>
            <Col md={6} className="mb-4 mb-md-0">
              <div className="footer-brand">
                <h3 className="brand-text">Ngọc Lan Cosmetics</h3>
                <p>Mang đến cho bạn những sản phẩm làm đẹp chuẩn Nhật chính hiệu.</p>
                <div className="social-links">
                  <a href="#" className="social-link">📘</a>
                  <a href="#" className="social-link">📷</a>
                  <a href="#" className="social-link">🐦</a>
                  <a href="#" className="social-link">📌</a>
                </div>
              </div>
            </Col>
            <Col md={6} className="mb-4 mb-md-0">
              <h4 className="footer-title">Liên hệ</h4>
              <div className="contact-info">
                <p><span>📞</span><strong>Zalo:</strong> 0902715456</p>
                <p><span>📍</span><strong>Địa chỉ:</strong> 6B5, đường Hà Huy Giáp, Phường Thạnh Lộc, Quận 12, TPHCM</p>
              </div>
            </Col>
          </Row>
          <hr className="footer-divider mt-4 mb-3" />
          <p className="footer-copyright text-center mb-0">© 2025 Bản quyền thuộc về github: teadev2002</p>
        </Container>
      </footer>

      {/* Image Preview Modal */}
      <Modal show={showModal} onHide={handleClose} centered className="image-preview-modal">
        <Modal.Header closeButton>
          <Modal.Title>Product Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {capturedImage && (
            <>
              <img
                src={capturedImage}
                alt="Captured Product"
                className="img-fluid mb-3"
                style={{ maxHeight: '300px', borderRadius: '8px' }}
              />
              <h5>{productName}</h5>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={sendImage}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;