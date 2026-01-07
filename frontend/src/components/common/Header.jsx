
import "../../assets/styles/admin/header.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { IoIosSearch } from "react-icons/io";
import { MailPlus } from "lucide-react";
import { Bell } from "lucide-react";

const Header = () => {
    return (
      <section className="admin-header">
        <div className="admin-header-wrapper">
          <div className="header-left">
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
          </div>

          <div className="header-right">
            <div className="admin-options">
              <div className="admin-options-item">
                <MailPlus size={25} />
              </div>
              <div className="admin-options-item">
                <Bell size={23} />
              </div>
            </div>
            <div className="user-info">
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="Info"
                  id="dropdown-user"
                  className="p-0 border-0 bg-transparent"
                >
                  <div>
                    <p className="m-0 username">Username</p>
                    <p className="m-0 email">example@gmail.com</p>
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu className="custom-dropdown-menu">
                  <Dropdown.Item href="/admin/profile">Profile</Dropdown.Item>
                  <Dropdown.Item href="/admin/settings">Settings</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="/logout" className="text-danger">
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </section>
    );
};

export default Header;