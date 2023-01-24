import React, { useContext, useRef } from "react";
import "./UserProfile.css";
import { Form, Button } from "react-bootstrap";
import LoginContext from "../../Store/LoginContext";

function UserProfile() {
  const loginCtx = useContext(LoginContext);
  //   const usertoken = localStorage.getItem("token");
  const fullNameRef = useRef();
  const photoUrlRef = useRef();
  const cancelFun=()=>{
    console.log("cancel");
  }
  const updateUser = async () => {
    const fullName = fullNameRef.current.value;
    const Url = photoUrlRef.current.value;
    // console.log(loginCtx.token);
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB-1cDOSrzhXi7pQ330k-yRNDTZCPoIj1o",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: loginCtx.token,
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
      <div className="bor">
        <span className="quote">
          Winners Never Quit, Quitters Never Win
          <br />
        </span>
        <span className="complete">
          Your profile is 64% completed.A complete profile has higher chances of
          landing a job
        </span>
      </div>
      <div className="contain">
        <h5 className="contact">Contact Details</h5>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label className="inputLabel">Full Name</Form.Label>
            <Form.Control
              type="text"
              className="loginInput"
              ref={fullNameRef}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="inputLabel">Profile Photo Url</Form.Label>
            <Form.Control
              type="text"
              className="loginInput"
              ref={photoUrlRef}
            />
          </Form.Group>
          <Button variant="outline-danger" type="button" onClick={cancelFun}>
            Danger
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
