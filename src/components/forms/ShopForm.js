'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { createShop, updateShops } from '@/api/shopData';
import { useAuth } from '@/utils/context/authContext';

const initialState = {
  id: '',
  shopName: '',
  shopDescription: '',
};

function ShopForm({ obj = initialState, onUpdate }) {
  const [formInput, setFormInput] = useState(obj);
  const router = useRouter();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.uid) {
      alert('User not authenticated');
      return;
    }

    if (!formInput.shopName || !formInput.shopDescription) {
      alert('Please fill out all required fields.');
      return;
    }

    const payload = {
      ...formInput,
      userId: user.uid,
      Uid: user.uid,
      CreatorUid: user.uid,
    };

    console.log('Payload being sent:', payload);

    try {
      if (!formInput.id) {
        delete payload.id; // Ensure new shop doesn't carry an existing ID
        const { id } = await createShop(payload);
        if (onUpdate) {
          onUpdate();
        }
        router.push(`/shops/${id}`);
      } else {
        const shopId = formInput.id;
        await updateShops({ ...payload, id: shopId });
        console.log('Updating shop with ID:', formInput.id);
        if (onUpdate) {
          onUpdate();
        }
        router.push(`/shops/${shopId}`);
      }
    } catch (error) {
      console.error('Shop submission failed:', error.message);
      alert(`Failed to save shop: ${error.message}`);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="text-black">
      <h2 className="text-white mt-5">{formInput.id ? 'Update' : 'Create'} Shop</h2>

      <FloatingLabel controlId="floatingInput1" label="Shop Name" className="mb-3">
        <Form.Control type="text" name="shopName" value={formInput.shopName} onChange={handleChange} required />
      </FloatingLabel>

      <FloatingLabel controlId="floatingTextarea" label="Shop Description" className="mb-3">
        <Form.Control as="textarea" name="shopDescription" value={formInput.shopDescription} onChange={handleChange} required />
      </FloatingLabel>

      <Button variant="success" type="submit">
        {formInput.id ? 'Update' : 'Create'} Shop
      </Button>
    </Form>
  );
}

ShopForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.string,
    userId: PropTypes.string,
    Uid: PropTypes.string,
    CreatorUid: PropTypes.string,
    shopName: PropTypes.string,
    shopDescription: PropTypes.string,
  }),
  onUpdate: PropTypes.func.isRequired,
};

export default ShopForm;
