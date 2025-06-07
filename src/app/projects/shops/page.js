'use client';

import React, { useEffect, useState } from 'react';
import { getShopsById } from '@/api/shopData';
import ShopForm from '@/components/forms/ShopForm';
import PropTypes from 'prop-types';
import { useParams } from 'next/navigation';

export default function EditShop() {
  const [editShop, setEditShop] = useState({});
  const { shopId } = useParams();

  useEffect(() => {
    getShopsById(shopId).then(setEditShop);
  }, [shopId]);

  return <ShopForm obj={editShop} />;
}

EditShop.propTypes = {
  params: PropTypes.shape({
    shopId: PropTypes.string.isRequired,
  }).isRequired,
};
