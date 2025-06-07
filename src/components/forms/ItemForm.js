'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { createItem, updateItem } from '@/api/itemData';

const initialState = {
  itemName: '',
  itemDescription: '',
};

function ItemForm({ obj = initialState, onUpdate }) {
  const [formInput, setFormInput] = useState(obj);
  const [userDbId] = useState(null);
  const { id: shopId } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (obj?.id) {
      setFormInput({
        ...obj,
        datePosted: obj.datePosted?.split('T')[0] || new Date().toISOString().split('T')[0],
      });
    }
  }, [obj]);

  useEffect(() => {
    if (shopId) {
      setFormInput((prevState) => ({
        ...prevState,
        shopId: parseInt(shopId, 10),
      }));
    }
  }, [shopId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleToggleChange = (e) => {
    const { name, checked } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formInput,
      userId: userDbId,
      shopId: parseInt(shopId, 10),
    };

    console.log('Payload to send:', payload);

    if (formInput.id) {
      updateItem(payload).then(() => {
        if (typeof onUpdate === 'function') onUpdate();
      });
    } else {
      createItem(payload).then(() => {
        if (typeof onUpdate === 'function') onUpdate();
        router.push(`/shops/${shopId}`);
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="text-black">
      <h2 className="text-white mt-5">{formInput.id ? 'Update' : 'Create'} Item</h2>

      {/* TASK NAME INPUT */}
      <FloatingLabel controlId="floatingInput1" label="Item Name" className="mb-3">
        <Form.Control type="text" placeholder="Enter Item name" name="itemName" value={formInput.itemName} onChange={handleChange} required />
      </FloatingLabel>

      {/* TASK DESCRIPTION INPUT */}
      <FloatingLabel controlId="floatingTextarea" label="Item Description" className="mb-3">
        <Form.Control as="textarea" placeholder="Enter Item description" style={{ height: '100px' }} name="itemDescription" value={formInput.itemDescription} onChange={handleChange} required />
      </FloatingLabel>

      {/* IS COMPLETED TOGGLE */}
      <Form.Check className="text-white mb-3" type="switch" id="inStock" name="inStock" label="In Stock?" checked={formInput.inStock} onChange={handleToggleChange} />

      {/* SUBMIT BUTTON */}
      <Button variant="success" type="submit">
        {formInput.id ? 'Update' : 'Create'} Item
      </Button>
    </Form>
  );
}

ItemForm.propTypes = {
  obj: PropTypes.shape({
    itemName: PropTypes.string,
    itemDescription: PropTypes.string,
    inStock: PropTypes.bool,
    id: PropTypes.number,
  }),
  onUpdate: PropTypes.func,
};

ItemForm.defaultProps = {
  obj: initialState,
  onUpdate: () => {},
};

export default ItemForm;
