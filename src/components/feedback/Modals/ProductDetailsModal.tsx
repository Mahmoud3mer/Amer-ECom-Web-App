import ProductOrderInfo from '@components/eCommerce/ProductOrderInfo/ProductOrderInfo';
import { ProductInterface } from '@inerfaces/interfaces';
import Modal from 'react-bootstrap/Modal';

type TModal = {
    show: boolean;
    productsInfo: ProductInterface[];
    handleCloseModal: () => void;
}

function ProductDetailsModal({ show,productsInfo , handleCloseModal }: TModal) {

  return (
    <>
      <Modal show={show} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {
                productsInfo.map((el) => 
                    <ProductOrderInfo key={el.id} title={el.title} imgSrc={el.img} price={el.price} quantity={el.quantity}/>
                )
            }
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProductDetailsModal;