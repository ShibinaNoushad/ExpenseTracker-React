import React, { useContext, useEffect, useRef } from "react";
import "./UserProfile.css";
import { Form, Button } from "react-bootstrap";
import LoginContext from "../../Store/LoginContext";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

function UserProfile() {
  const loginCtx = useContext(LoginContext);
  const token = useSelector((state) => state.auth.token);
  //   const usertoken = localStorage.getItem("token");
  const history = useHistory();
  const fullNameRef = useRef();
  const photoUrlRef = useRef();
  const cancelFun = () => {
    history.replace("/welcome");
  };
  const getData = async () => {
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyB-1cDOSrzhXi7pQ330k-yRNDTZCPoIj1o",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        // console.log(data);
        data.users.forEach((element) => {
          fullNameRef.current.value = element.displayName
            ? element.displayName
            : "";
          photoUrlRef.current.value = element.photoUrl ? element.photoUrl : "";
        });
      } else {
        const data = await res.json();
        let errorMessage = "Authentication failed!";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }

        throw new Error(errorMessage);
      }
    } catch (error) {
      // alert(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const updateUser = async () => {
    const fullName = fullNameRef.current.value;
    const Url = photoUrlRef.current.value;
    if (fullName.length < 2 || Url.length < 2) {
      alert("please enter all fields");
      return;
    }
    // console.log(token);
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB-1cDOSrzhXi7pQ330k-yRNDTZCPoIj1o",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
            displayName: fullName,
            photoUrl: Url,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        fullNameRef.current.value = "";
        photoUrlRef.current.value = "";
        alert("Nice :)");
        history.replace("/welcome");
        // console.log(data);
      } else {
        const data = await res.json();
        let errorMessage = "Authentication failed!";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }

        throw new Error(errorMessage);
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <>
      <div className="bor"></div>
      <div className="contain">
        <h5 className="contact">Contact Details</h5>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label className="inputLabel">Full Name</Form.Label>
            <Form.Control
              type="text"
              className="loginInputUser"
              ref={fullNameRef}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="inputLabel">Profile Photo Url</Form.Label>
            <Form.Control
              type="text"
              className="loginInputUser"
              ref={photoUrlRef}
            />
          </Form.Group>
          <Button variant="outline-danger" type="button" onClick={cancelFun}>
            Cancel
          </Button>{" "}
          <Button variant="primary" type="button" onClick={updateUser}>
            Update
          </Button>
        </Form>
      </div>
    </>
  );
}

export default UserProfile;
