//  import React, { useState, useEffect } from 'react'; 
//  import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
//  import './HomeStyle.scss';
//  import chongNang from '../../assets/chong-nang-cao-cap.jpg';
//  import daDay from '../../assets/da-day.jpg';
//  import serum from '../../assets/serum-duong-trang.jpg';
//  import suaRuaMat from '../../assets/sua-rua-mat.jpg';
//  import thuocNhoMat from '../../assets/thuoc-nho-mat.jpg';
//  import Header from '../../components/header/Header.jsx';  
//  import QualityNFeedback from '../../components/hardCode/QualityNFeedback.jsx';
//  import HomeBanner from '../../components/hardCode/HomeBanner.jsx';
//  import Footer from '../../components/footer/Footer.jsx';

// const Home = () => {
//   // State for Quick View Modal
//   const [showViewDetail, setShowViewDetail] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   // Handler to open Quick View Modal
//   const handleViewDetail = (product) => {
//     setSelectedProduct(product);
//     setShowViewDetail(true);
//   };

//   // Handler to close Quick View Modal
//   const handleCloseViewDetail = () => {
//     setShowViewDetail(false);
//     setSelectedProduct(null);
//   };

//   const products = [
//     {
//       id: 1,
//       name: 'Kem Chống Nắng Annessa',
//       price: '550,000 VNĐ',
//       image: chongNang,
//       badge: 'Best Seller',
//       description: 'Kem chống nắng với SPF 50+ PA++++, bảo vệ da khỏi tia UV, dưỡng ẩm và làm sáng da.'
//     },
//     {
//       id: 2,
//       name: 'Sữa Rửa Mặt',
//       price: '120,000 VNĐ',
//       image: suaRuaMat,
//       badge: 'Popular',
//       description: 'Sữa rửa mặt dịu nhẹ, làm sạch sâu, phù hợp với mọi loại da, giúp da mềm mại.'
//     },
//     {
//       id: 3,
//       name: 'Thuốc Nhỏ Mắt',
//       price: '125,000 VNĐ',
//       image: thuocNhoMat,
//       badge: 'New',
//       description: 'Thuốc nhỏ mắt nhập khẩu từ Nhật Bản, giảm mỏi mắt và bảo vệ mắt khỏi khô rát.'
//     },
//     {
//       id: 4,
//       name: 'Serum Dưỡng Trắng',
//       price: '250,000 VNĐ',
//       image: serum,
//       badge: 'Premium',
//       description: 'Serum dưỡng trắng da với thành phần tự nhiên, giúp da đều màu và rạng rỡ.'
//     },
//     {
//       id: 5,
//       name: 'Thuốc Dạ Dày',
//       price: '290,000 VNĐ',
//       image: daDay,
//       badge: 'Limited',
//       description: 'Thực phẩm chức năng hỗ trợ sức khỏe dạ dày, giảm triệu chứng khó tiêu.'
//     },
//   ];

//   // Check and update localStorage when component mounts
//   useEffect(() => {
//     try {
//       const storedProducts = localStorage.getItem('products');
//       let updatedProducts = [...products];

//       if (!storedProducts) {
//         localStorage.setItem('products', JSON.stringify(products));
//       } else {
//         const parsedStoredProducts = JSON.parse(storedProducts);
//         const missingProducts = products.filter(product => {
//           const storedProduct = parsedStoredProducts.find(sp => sp.id === product.id);
//           return !storedProduct || !storedProduct.image || Object.keys(product).some(key => storedProduct[key] === undefined);
//         });

//         if (missingProducts.length > 0) {
//           updatedProducts = parsedStoredProducts.map(storedProduct => {
//             const currentProduct = products.find(p => p.id === product.id);
//             if (currentProduct) {
//               return { ...currentProduct };
//             }
//             return storedProduct;
//           });

//           missingProducts.forEach(product => {
//             if (!updatedProducts.find(up => up.id === product.id)) {
//               updatedProducts.push({ ...product });
//             }
//           });

//           localStorage.setItem('products', JSON.stringify(updatedProducts));
//         }
//       }
//     } catch (error) {
//       console.error('Error updating localStorage:', error);
//     }
//   }, []);

//   // Handler for "Đặt hàng" button
//   const handleOrder = async (product) => {
//     // Extract product details, excluding id and badge
//     const { id, badge, ...shareableProduct } = product;
//     const { name, price, image, description } = shareableProduct;

//     // Format the message to share
//     const shareText = `Đặt hàng sản phẩm:\nTên: ${name}\nGiá: ${price}\nMô tả: ${description}\nLiên hệ Ngọc Lan Cosmetics qua Zalo: 0902715456 \n`;

//     try {
//       // Check if Web Share API is supported
//       if (navigator.share) {
//         await navigator.share({
//           title: `Sản phẩm: ${name}`,
//           text: shareText,
//           url: image, // Share the image URL
//         });
//         console.log('Product shared successfully');
//       } else {
//         // Fallback: Open Zalo with pre-filled message
//         const encodedText = encodeURIComponent(shareText);
//         const zaloUrl = `https://zalo.me/0902715456?text=${encodedText}`;
//         window.open(zaloUrl, '_blank');

//         // Secondary fallback: Copy to clipboard
//         await navigator.clipboard.writeText(shareText);
//         alert('Thông tin sản phẩm đã được sao chép vào clipboard! Bạn cũng được chuyển đến Zalo.');
//       }
//     } catch (error) {
//       console.error('Error sharing product:', error);
//       // Fallback: Copy to clipboard and alert user
//       await navigator.clipboard.writeText(shareText);
//       alert('Không thể chia sẻ trực tiếp. Thông tin sản phẩm đã được sao chép vào clipboard!');
//     }
//   };

//   return (
//     <div className="landing-page">
//       <Header />
//       <HomeBanner />

//       {/* Products Section */}
//       <section id="products" className="products-section py-5">
//         <Container>
//           <div className="text-center mb-5">
//             <h2 className="section-title">Sản Phẩm</h2>
//             <p className="section-subtitle">Sản phẩm cao cấp được tuyển chọn kỹ lưỡng từ Nhật Bản</p>
//           </div>
//           <Row xs={1} md={2} lg={3} className="g-4">
//             {products.map(product => (
//               <Col key={product.id} id={`product-${product.id}`}>
//                 <Card className="product-card h-100">
//                   <div className="product-image-wrapper">
//                     <img src={product.image} alt={product.name} className="product-image" />
//                     <div className="product-badge">{product.badge}</div>
//                     <div className="product-overlay">
//                       <Button 
//                         className="btn btn-light btn-sm" 
//                         onClick={() => handleViewDetail(product)}
//                       >
//                         Xem chi tiết
//                       </Button>
//                     </div>
//                   </div>
//                   <Card.Body className="product-info text-center">
//                     <Card.Title className="product-name">{product.name}</Card.Title>
//                     <Card.Text className="product-price">{product.price}</Card.Text>
//                     <Button
//                       className="btn btn-primary btn-sm w-100"
//                       onClick={() => handleOrder(product)}
//                     >
//                       Đặt hàng qua Zalo
//                     </Button>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//         </Container>
//       </section>

//       {/* Authenticity Section */}
//       <QualityNFeedback />

//       <Footer />

//       {/* Quick View Modal */}
//       <Modal show={showViewDetail} onHide={handleCloseViewDetail} centered className="quick-view-modal">
//         <Modal.Header closeButton>
//           <Modal.Title>{selectedProduct?.name}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body className="text-center">
//           {selectedProduct && (
//             <>
//               <img
//                 src={selectedProduct.image}
//                 alt={selectedProduct.name}
//                 className="img-fluid mb-3"
//                 style={{ maxHeight: '400px', borderRadius: '8px' }}
//               />
//               <h5 className="product-price">{selectedProduct.price}</h5>
//               <p className="product-description">{selectedProduct.description}</p>
//             </>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseViewDetail}>
//             Đóng
//           </Button>
//           <Button 
//             variant="primary" 
//             onClick={() => handleOrder(selectedProduct)}
//           >
//             Đặt hàng qua Zalo
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default Home;

/// dời button xem chi tiết ra 
 import React, { useState, useEffect } from 'react'; 
 import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
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
  // State for Quick View Modal
  const [showViewDetail, setShowViewDetail] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Handler to open Quick View Modal
  const handleViewDetail = (product) => {
    setSelectedProduct(product);
    setShowViewDetail(true);
  };

  // Handler to close Quick View Modal
  const handleCloseViewDetail = () => {
    setShowViewDetail(false);
    setSelectedProduct(null);
  };

  const products = [
    {
      id: 1,
      name: 'Kem Chống Nắng Annessa',
      price: '550,000 VNĐ',
      image: chongNang,
      badge: 'Best Seller',
      description: 'Kem chống nắng với SPF 50+ PA++++, bảo vệ da khỏi tia UV, dưỡng ẩm và làm sáng da.'
    },
    {
      id: 2,
      name: 'Sữa Rửa Mặt',
      price: '120,000 VNĐ',
      image: suaRuaMat,
      badge: 'Popular',
      description: 'Sữa rửa mặt dịu nhẹ, làm sạch sâu, phù hợp với mọi loại da, giúp da mềm mại.'
    },
    {
      id: 3,
      name: 'Thuốc Nhỏ Mắt',
      price: '125,000 VNĐ',
      image: thuocNhoMat,
      badge: 'New',
      description: 'Thuốc nhỏ mắt nhập khẩu từ Nhật Bản, giảm mỏi mắt và bảo vệ mắt khỏi khô rát.'
    },
    {
      id: 4,
      name: 'Serum Dưỡng Trắng',
      price: '250,000 VNĐ',
      image: serum,
      badge: 'Premium',
      description: 'Serum dưỡng trắng da với thành phần tự nhiên, giúp da đều màu và rạng rỡ.'
    },
    {
      id: 5,
      name: 'Thuốc Dạ Dày',
      price: '290,000 VNĐ',
      image: daDay,
      badge: 'Limited',
      description: 'Thực phẩm chức năng hỗ trợ sức khỏe dạ dày, giảm triệu chứng khó tiêu. BỘT UỐNG CHO NGƯỜI DẠ DÀY, BAO TỬ, Ợ CHUA PANCILON NỘI ĐỊA NHẬT'
    },
  ];

  // Check and update localStorage when component mounts
  useEffect(() => {
    try {
      const storedProducts = localStorage.getItem('products');
      let updatedProducts = [...products];

      if (!storedProducts) {
        localStorage.setItem('products', JSON.stringify(products));
      } else {
        const parsedStoredProducts = JSON.parse(storedProducts);
        const missingProducts = products.filter(product => {
          const storedProduct = parsedStoredProducts.find(sp => sp.id === product.id);
          return !storedProduct || !storedProduct.image || Object.keys(product).some(key => storedProduct[key] === undefined);
        });

        if (missingProducts.length > 0) {
          updatedProducts = parsedStoredProducts.map(storedProduct => {
            const currentProduct = products.find(p => p.id === product.id);
            if (currentProduct) {
              return { ...currentProduct };
            }
            return storedProduct;
          });

          missingProducts.forEach(product => {
            if (!updatedProducts.find(up => up.id === product.id)) {
              updatedProducts.push({ ...product });
            }
          });

          localStorage.setItem('products', JSON.stringify(updatedProducts));
        }
      }
    } catch (error) {
      console.error('Error updating localStorage:', error);
    }
  }, []);

  // Handler for "Đặt hàng" button
  const handleOrder = async (product) => {
    // Extract product details, excluding id and badge
    const { id, badge, ...shareableProduct } = product;
    const { name, price, image, description } = shareableProduct;

    // Format the message to share
    const shareText = `Đặt hàng sản phẩm:\nTên: ${name}\nGiá: ${price}\nMô tả: ${description}\nLiên hệ Ngọc Lan Cosmetics qua Zalo: 0902715456 \n`;

    try {
      // Check if Web Share API is supported
      if (navigator.share) {
        await navigator.share({
          title: `Sản phẩm: ${name}`,
          text: shareText,
          url: image, // Share the image URL
        });
        console.log('Product shared successfully');
      } else {
        // Fallback: Open Zalo with pre-filled message
        const encodedText = encodeURIComponent(shareText);
        const zaloUrl = `https://zalo.me/0902715456?text=${encodedText}`;
        window.open(zaloUrl, '_blank');

        // Secondary fallback: Copy to clipboard
        await navigator.clipboard.writeText(shareText);
        alert('Thông tin sản phẩm đã được sao chép vào clipboard! Bạn cũng được chuyển đến Zalo.');
      }
    } catch (error) {
      console.error('Error sharing product:', error);
      // Fallback: Copy to clipboard and alert user
      await navigator.clipboard.writeText(shareText);
      alert('Không thể chia sẻ trực tiếp. Thông tin sản phẩm đã được sao chép vào clipboard!');
    }
  };

  return (
    <div className="landing-page">
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
                      
                    </div>
                  </div>
                  <Card.Body className="product-info text-center">
                    <Card.Title className="product-name">{product.name}</Card.Title>
                    <Card.Text className="product-price">{product.price}</Card.Text>
                  <div className='d-flex justify-content-between align-items-center'>
                     <Button 
                        className="btn btn-primary w-100 m-2 btn-sm" 
                        onClick={() => handleViewDetail(product)}
                      >
                        Xem chi tiết
                      </Button>
                      <Button
                      className="btn btn-light btn-sm w-100"
                      onClick={() => handleOrder(product)}
                    >
                      Đặt hàng Zalo
                    </Button>
                   
                  </div>
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

      {/* Quick View Modal */}
      <Modal show={showViewDetail} onHide={handleCloseViewDetail} centered className="quick-view-modal">
        <Modal.Header closeButton>
          <Modal.Title>{selectedProduct?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {selectedProduct && (
            <>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="img-fluid mb-3"
                style={{ maxHeight: '400px', borderRadius: '8px' }}
              />
              <h5 className="product-price">{selectedProduct.price}</h5>
              <p className="product-description">{selectedProduct.description}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseViewDetail}>
            Đóng
          </Button>
          <Button 
            variant="primary" 
            onClick={() => handleOrder(selectedProduct)}
          >
            Đặt hàng qua Zalo
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;