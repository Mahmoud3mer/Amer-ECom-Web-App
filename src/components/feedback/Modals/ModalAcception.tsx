import { TLoading } from '@inerfaces/interfaces';
import { Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

type TModalProps = {
  subtotal: number,
  show: boolean,
  loading: TLoading,
  handleClose: () => void,
  placeOrderHandler: () => void,
}

function ModalAcception({subtotal, loading, show, handleClose, placeOrderHandler} : TModalProps) {

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop='static'>
        <Modal.Header closeButton>
          <Modal.Title>Placing order: </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to place order with subtotal:{' '} {subtotal.toFixed(2)} EGP
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={placeOrderHandler}>
            {
              loading === 'pending' ? 
              <><Spinner variant='light' animation='border' size='sm'/>Loading...</>: 'Confirm'
            }
            
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAcception;