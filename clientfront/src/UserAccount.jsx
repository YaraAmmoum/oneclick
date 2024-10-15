import React, { useState, useEffect } from "react";
import account from "./assets/image/profile.png";
import "./assets/styles/style.css";
import Nav from "./Nav";
import Footer from "./Footer";
export default function UserAccount() {
  const [userData, setUserData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    country: "",
    city: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token"); 

  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        try {
          const response = await fetch(`http://localhost:5000/api/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const user = await response.json();
            setUserData(user);
          } else {
            console.error("User not found, allowing new entry.");
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      }
      setIsLoading(false);
    };
    fetchUserData();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify(userData),
      });
      const responseData = await response.json();
      if (response.ok) {
        alert(responseData.message);
      } else {
        alert(`Error: ${responseData.error}`);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("An unexpected error occurred while updating user data.");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <Nav/>
    <div className="profile">
      <PersonalImage handleInputChange={handleInputChange}        userData={userData}
 />
      <ProfileSetting
        userData={userData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </div>
    <Footer/>
    </>
  );
}

function PersonalImage({ handleInputChange,userData}) {
  return (
    <div className="personalStyle">
      <img className="userImage" src={account} alt="Profile" />
      <div className="userEmail">
        <input
          className="perInput"
          type="email"
          name="email"
          value={userData.email}
          placeholder="your email@gmail.com"
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}

function ProfileSetting({ userData, handleInputChange, handleSubmit }) {
  return (
    <div className="profileSettings">
      <h2>Personal Information</h2>
      <form className="formProfile" onSubmit={handleSubmit}>
        <div className="formGroup">
          <label className="perlabel">First Name</label>
          <input
            className="perInput"
            type="text"
            name="firstName"
            value={userData.firstName}
            onChange={handleInputChange}
            placeholder="Salma.."
          />
        </div>
        <div className="formGroup">
          <label className="perlabel">Last Name</label>
          <input
            className="perInput"
            type="text"
            name="lastName"
            value={userData.lastName}
            onChange={handleInputChange}
            placeholder="Hayek.."
          />
        </div>
        <div className="formGroup">
          <label className="perlabel">Phone Number</label>
          <input
            className="perInput"
            type="tel"
            name="phone"
            value={userData.phone}
            onChange={handleInputChange}
            placeholder="00962.."
          />
        </div>
        <div className="formGroup">
          <label className="perlabel">Country</label>
          <input
            className="perInput"
            type="text"
            name="country"
            value={userData.country}
            onChange={handleInputChange}
            placeholder="Jordan.."
          />
        </div>
        <div className="formGroup">
          <label className="perlabel">City</label>
          <input
            className="perInput"
            type="text"
            name="city"
            value={userData.city}
            onChange={handleInputChange}
            placeholder="Amman"
          />
        </div>
        <button className="btn" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}
