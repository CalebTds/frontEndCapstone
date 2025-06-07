'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { deleteShops } from '../api/shopData';
import ShopForm from './forms/ShopForm';

function ShopCard({ shopObj, onUpdate }) {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const deleteThisShop = async () => {
    if (window.confirm(`Are you sure you want to delete "${shopObj.shopName}"?`)) {
      try {
        await deleteShops(Number(shopObj.id));
        if (onUpdate) {
          onUpdate();
        }
      } catch (error) {
        console.error('Delete failed:', error.message);
        alert(`Failed to delete shop: ${error.message}`);
      }
    }
  };

  return (
    <>
      <Card style={{ width: '18rem', margin: '10px' }}>
        <Card.Body>
          <Card.Title>{shopObj?.shopName}</Card.Title>

          <Button variant="primary" className="m-2" onClick={() => router.push(`/projects/${shopObj.id}`)}>
            VIEW
          </Button>

          <Button variant="info" onClick={() => setShowModal(true)}>
            EDIT
          </Button>

          <Button variant="danger" onClick={deleteThisShop} className="m-2">
            DELETE
          </Button>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{shopObj.id ? 'Update Shop' : 'Create Shop'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ShopForm key={shopObj.id} obj={shopObj} onUpdate={onUpdate} />
        </Modal.Body>
      </Modal>
    </>
  );
}

ShopCard.propTypes = {
  shopObj: PropTypes.shape({
    id: PropTypes.string.isRequired,
    shopName: PropTypes.string.isRequired,
    shopDescription: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ShopCard;
