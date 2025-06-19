import React, { useState, useRef } from 'react'; 
import { Container, Navbar, Nav, Row, Col, Carousel, Card, Button, Modal } from 'react-bootstrap';
import * as htmlToImage from 'html-to-image';
import { ToastContainer, toast } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';  
import './HomeStyle.scss';
import chongNang from '../../assets/chong-nang-cao-cap.jpg';
import daDay from '../../assets/da-day.jpg';
import serum from '../../assets/serum-duong-trang.jpg';
import suaRuaMat from '../../assets/sua-rua-mat.jpg';
import thuocNhoMat from '../../assets/thuoc-nho-mat.jpg';
import Header from '../../components/header/Header.jsx';  
import QualityNFeedback from '../../components/hardCode/QualityNFeedback.jsx';
import HomeBanner from '../../components/hardCode/HomeBanner.jsx';
import Footer from '../../components/footer/Footer.jsx';
const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [productName, setProductName] = useState('');
  const productCardRef = useRef(null);

  const captureAndPreview = async (productId) => {
    try {
      const cardElement = document.querySelector(`#product-${productId} .card`);
      if (!cardElement) return;

 
      const button = cardElement.querySelector('.btn-primary');
      if (button) {
        button.style.display = 'none';
      }

    
      const nameElement = cardElement.querySelector('.product-name');
      const name = nameElement ? nameElement.textContent : '';

      // Capture the image
      const imgData = await htmlToImage.toPng(cardElement);

      
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
    { id: 1, name: 'Chống Nắng cao cấp', price: '¥4,200', image: chongNang, badge: 'Best Seller' },
    { id: 2, name: 'Sữa Rửa Mặt', price: '¥3,800', image: suaRuaMat, badge: 'Popular' },
    { id: 3, name: 'Thuốc Nhỏ Mắt', price: '¥3,500', image: thuocNhoMat, badge: 'New' },
    { id: 4, name: 'Serum Dưỡng Trắng', price: '¥5,600', image: serum, badge: 'Premium' },
    { id: 5, name: 'Dạ Dày', price: '¥4,900', image: daDay, badge: 'Limited' },
  ];

  return (
    <div className="landing-page">
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} />
      <Header />
      <HomeBanner />

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
                      <Button className="btn btn-light btn-sm">Xem nhanh</Button>
                    </div>
                  </div>
                  <Card.Body className="product-info text-center">
                    <Card.Title className="product-name">{product.name}</Card.Title>
                    <Card.Text className="product-price">{product.price}</Card.Text>
                    <Button
                      className="btn btn-primary btn-sm w-100"
                      onClick={() => captureAndPreview(product.id)}
                    >
                      Đặt hàng
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Authenticity Section */}
      <QualityNFeedback />

      <Footer />

      {/* Image Preview Modal */}
      <Modal show={showModal} onHide={handleClose} centered className="image-preview-modal">
        <Modal.Header closeButton>
          <Modal.Title>{productName} </Modal.Title>
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
            
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="primary" onClick={sendImage}>
          Gửi tới Zalo
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;