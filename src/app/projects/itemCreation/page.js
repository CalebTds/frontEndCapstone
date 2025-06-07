'use client';

import React, { useEffect, useState } from 'react';
import { getItemsById } from '@/api/itemData';
import ItemForm from '@/components/forms/ItemForm';
import PropTypes from 'prop-types';
import { useParams } from 'next/navigation';

export default function EditItem() {
  const [editItem, setEditItem] = useState({});
  const { itemId } = useParams();

  useEffect(() => {
    getItemsById(itemId).then(setEditItem);
  }, [itemId]);

  return <ItemForm obj={editItem} />;
}

EditItem.propTypes = {
  params: PropTypes.shape({
    itemId: PropTypes.string.isRequired,
  }).isRequired,
};
