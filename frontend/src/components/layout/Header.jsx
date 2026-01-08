import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import "../../assets/styles/client/layout/header.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { IoIosSearch } from "react-icons/io";
import { CircleUser } from "lucide-react";
import { ShoppingBasket } from "lucide-react";
import Badge from "react-bootstrap/Badge";
const Header = () => {
  return (
    <section className="header">
      <Container>
        <Row className="custom-row-header">
          <Col>
            <Link className="logo" to="/">
              <h1 className="m-0">SnowMobile.com</h1>
            </Link>
          </Col>
          <Col>
            <InputGroup>
              <Form.Control
                placeholder="Recipient's username"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <InputGroup.Text id="basic-addon2">
                <IoIosSearch size={25} />
              </InputGroup.Text>
            </InputGroup>
          </Col>
          <Col>
            <div className="options-user">
              <div className="options-user-item">
                <CircleUser size={22} />
                Tài khoản
              </div>
              <div className="options-user-item">
                <ShoppingBasket size={20} />
                <Badge bg="danger">20</Badge>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Header;
