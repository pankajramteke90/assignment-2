
          
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, CardText, CardTitle, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { addProductSuccess, deleteProductSuccess, fetchProducts, updateProductSuccess } from './Productslice';

export default function Product() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);
  // const [productName, setProductName] = useState(initialProductName);
  const [modalOpen, setModalOpen] = useState(false);
  // const [selectedProduct, setSelectedProduct] = useState(null)
  const [editedProduct, setEditedProduct] = useState(null)
  const [popup, setPopup] = useState(false);
  const [newProduct, setNewProduct] = useState({
    image: '',
    title: '',
    category: '',
    price: '',
    rating: {
      rate: ''
    }
  });

  const popUp = () => {
    console.log('popup ', popup)
    setPopup(!popup);
  };

  const handleAddProduct = () => {
    console.log('Adding product:', newProduct);
    dispatch(addProductSuccess(newProduct));
    setPopup(false);
  };

  const toggleModal = (id) => {
    console.log('id .', id);
    const prdct = products.filter(p => p.id === id)
    setEditedProduct(prdct[0]);
    setModalOpen(!modalOpen);
  };

  const handleUpdate = () => {
    dispatch(updateProductSuccess(editedProduct));
    setModalOpen(false);
  };


  const handleDelete = (productId) => {
    dispatch(deleteProductSuccess(productId));
  };

  useEffect(() => {
    dispatch(fetchProducts());
  });

  return (
    <>
      <div  >
        <Button style={{ marging: '40px', display: 'flex', alignItems: 'center' }} onClick={popUp}>Add Product</Button>
        <Modal isOpen={popup} toggle={popUp}>
          <ModalHeader toggle={popUp}>Add New Product</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="title">Product Name</Label>
                <Input type="text" id="productName" value={newProduct.title} onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for="category">Category</Label>
                <Input type="text" id="category" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for="price">Price</Label>
                <Input type="text" id="price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for="rating">Rating</Label>
                <Input type="text" id="rating" value={newProduct.rating?.rate} onChange={(e) => setNewProduct({ ...newProduct, rating: { rate: e.target.value } })} />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleAddProduct}>Add</Button>{' '}
            <Button color="secondary" onClick={popUp}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto', padding: '10px', margin: '20px' }}>

        {products?.map((item) => (
          <Card key={item.id}
            style={{
              width: '18rem', padding: '10px', margin: '20px', height: '95%'
            }}
          >
            <img
              alt={item.title}
              src={item.image}
            />
            <CardBody>
              <CardTitle tag="h5">
                {item.title}
              </CardTitle>

              <CardText>
                <p>{item.price} $</p>
                <p>{item.category}</p>
                <p>{item.rating.rate} ratings</p>
              </CardText>
            </CardBody>
            <div style={{ display: 'flex' }}><Button style={{ margin: '10px 10px', padding: '5px 10px', backgroundColor: 'blue' }} onClick={() => toggleModal(item.id)}> Edit</Button>
              <Button style={{ margin: '10px 10px', backgroundColor: 'red' }} onClick={() => handleDelete(item.id)}

              > Delete</Button></div>
          </Card>
        ))}
        <Modal isOpen={modalOpen} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Edit Product</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="title">Product Name</Label>
                <Input
                  type="text"
                  id="productName"
                  value={editedProduct?.title || ''}
                  onChange={(e) => setEditedProduct(prevProduct => ({ ...prevProduct, title: e.target.value }))}
                />
              </FormGroup>
              <FormGroup>
                <Label for="category">Category</Label>
                <Input
                  type="text"
                  id="category"
                  value={editedProduct?.category || ''}
                  onChange={(e) => setEditedProduct(prevProduct => ({ ...prevProduct, category: e.target.value }))}
                />
              </FormGroup>
              <FormGroup>
                <Label for="price">Price</Label>
                <Input
                  type="text"
                  id="price"
                  value={editedProduct?.price || ''}
                  onChange={(e) => setEditedProduct(prevProduct => ({ ...prevProduct, price: e.target.value }))}
                />
              </FormGroup>
            </Form>

          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleUpdate}>Save</Button>{' '}
            <Button color="secondary" onClick={toggleModal}>Cancel</Button>
          </ModalFooter>
        </Modal>

      </div>
    </>
  )
}