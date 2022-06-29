import React, { useState } from "react";

import Wrapper from "../../assets/wrappers/DashboardFormPage.js";
import { useStateValue } from "../../context/StateContext.js";
import { Alert, FormRow } from "../../components";

const Profile = () => {
  const { isLoading, showMessage, displayAlert, user, updateUser } =
    useStateValue();

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastname, setLastname] = useState(user?.lastname);
  const [location, setLocation] = useState(user?.location);
  const [image, setImage] = useState(user?.image);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !name || !location || !lastname ||!image) {
      displayAlert();
      return;
    }

    updateUser({ name, email, lastname, location, image });
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>Profile</h3>
        {showMessage && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <FormRow
            type="text"
            name="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />

          <FormRow
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <FormRow
            type="text"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <FormRow
            type="text"
            name="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <button type="submit" className="btn btn-block">
            {isLoading ? "Loading..." : "Update"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
