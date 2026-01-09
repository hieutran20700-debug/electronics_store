import React, { useContext, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, useNavigate } from "react-router-dom"; 
import "../../assets/styles/client/layout/header.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { IoIosSearch } from "react-icons/io";
import {
  CircleUser,
  ShoppingBasket,
  LogOut,
  User,
  Settings,
} from "lucide-react"; 
import Badge from "react-bootstrap/Badge";
import { AuthContext } from "../../contexts/AuthProvider";
import Spinner from "react-bootstrap/Spinner";
import Dropdown from "react-bootstrap/Dropdown";
import ModalForm from "../common/ModalForm";
const Header = () => {
  const { user, loading, logout } = useContext(AuthContext);

  const [showModal, setShowModal] = useState(false);

  const handleConfirmLogout = async () => {
     await logout()
     setShowModal(false);
  }

  
  
  if (loading)
    return (
      <div className="loading-overlay">
        <Spinner animation="border" />
      </div>
    );
  return (
    <>
      {showModal && (
        <ModalForm
          show={showModal}
          onClose={() => setShowModal(false)}
          title="Đăng xuất"
          text="Bạn có chắc chắn muốn đăng xuất?"
          submitText="Đăng xuất"
          onSubmit={handleConfirmLogout}
          loading={loading}
          fields={[]}
        />
      )}
      <div className="top-header">
        Hotline: 0968 239 497 - 097 221 6881 * Tư vấn build PC: 0986552233 * Địa
        chỉ: CS1: 83-85 Thái Hà - Đống Đa - Hà Nội CS2: 83A Cửu Long - Q10 -
        TP.HCM
      </div>
      <section className="header">
        <Container>
          <Row className="custom-row-header">
            <Col xs={3}>
              <Link className="logo" to="/">
                <h1 className="m-0">SnowMobile.com</h1>
              </Link>
            </Col>
            <Col xs={6}>
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
            <Col xs={3}>
              <div className="options-user">
                <div className="options-user-item">
                  {user ? (
                    <Dropdown align="end">
                      <Dropdown.Toggle
                        variant="Info"
                        id="dropdown-user"
                        className="p-0 border-0 bg-transparent"
                      >
                        <div>
                          <p className="m-0 username"></p>
                          <p className="m-0 phone">{user?.phone || ""}</p>
                        </div>
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="custom-dropdown-menu">
                        <Dropdown.Item href="/admin/profile">
                          Profile
                        </Dropdown.Item>
                        <Dropdown.Item href="/admin/settings">
                          Settings
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item
                          className="text-danger"
                          onClick={() => setShowModal(true)}
                        >
                          Logout
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
                    <Link to="/login" className="options-user-item">
                      <CircleUser size={22} />
                      Tài khoản
                    </Link>
                  )}
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
    </>
  );
};

export default Header;
