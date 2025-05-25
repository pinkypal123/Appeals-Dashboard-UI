
import React from "react";
import { FormControl, Dropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import GWIcon from "./icons/GWIcon";
import Logo from "./icons/Logo";
import Search from "./icons/Search";
import AKIcon from "./icons/AKIcon";
import FilterHeader from "./icons/FilterHeader";
import Notification from "./icons/Notification";
const Header = () => {
  return (
    <Navbar expand="xl" className="bg-white rounded-3">
      <Container fluid>
        <Navbar.Brand href="/">
          <Logo/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll justify-content-end">
          <div className="d-flex flex-lg-row flex-column column-gap-xl-5 column-gap-3 gap-lg-0 gap-3">
            <div className="d-none d-md-flex align-items-center">
              <span className="fw-semibold me-2 text-muted">
                Client Workspace:
              </span>
              <Dropdown>
                <Dropdown.Toggle variant="light" size="sm">

                   <GWIcon/>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <GWIcon/>
                  </Dropdown.Item>
                  <Dropdown.Item>
                     <GWIcon/>
                  </Dropdown.Item>{" "}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <Form className="d-flex align-items-center mt-md-0 mt-2">
              <div className="position-relative formContainer">
                <FormControl type="text" placeholder="Search" />{" "}
                <Search/>
              </div>
            </Form>
            <div className="d-flex flex-row column-gap-xl-3 column-gap-md-2 column-gap-4">
               <GWIcon customheight={30} customwidth={40}/>
              <AKIcon/>
              <div className="line"></div>
              <Notification/>
              <div className="line"></div>
              <FilterHeader/>
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
