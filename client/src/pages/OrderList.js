import React, { useState } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

const SavedOrders = ({ savedOrders, setSavedOrders }) => {
  
  const handleDeleteOrder = (deleteOrder) => {
    const updatedSavedOrders = savedOrders.filter(savedOrder => savedOrder !== deleteOrder);
    localStorage.setItem("savedOrders", JSON.stringify(updatedSavedOrders)); // Update localStorage
    setSavedOrders(updatedSavedOrders);  
  }

  return (
    <>
      <div fluid className="text-light bg-dark p-5 header">
        <Container>
          <h1>Your Saved Orders</h1>
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">
          {savedOrders?.length
            ? `Viewing ${savedOrders.length} saved ${
                savedOrders.length === 1 ? "order" : "orders"
              }:`
            : "You have no saved orders!"}
        </h2>
        <div>
          <Row>
            {savedOrders?.map((order) => {
              return (
                <Col md="4" key={order}>
                  <Card border="dark">
                    <Card.Body>
                      <Card.Title>{order}</Card.Title>
                      <Button
                        className="btn-block btn-danger"
                        onClick={() => {
                          console.log("Clicked delete for order:", order);
                          handleDeleteOrder(order);
                        }}                      >
                        Delete this Order!
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      </Container>
    </>
  );
};

export default SavedOrders;
