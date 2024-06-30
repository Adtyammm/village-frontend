import React from "react";
import logo from "../../assets/sukamaju.png";

const ProfileVillageScreen = () => {
  const villageData = {
    villageName: "Sukamaju Village",
    villageImage: logo,
    villageLocation:
      "Majalaya District, Bandung City, West Java Province, Indonesia.",
    villageDescription:
      "Sukamaju Village is a village located in Majalaya District, Bandung City, West Java Province, Indonesia. Sukamaju Village is one of 9 Villages in the Majalaya District Area. Sukamaju Village has a rich history and unique culture. This village is famous for its natural beauty and the friendliness of its people..",
    villagePopulation: "- 4500 Villagers",
    villageArea: "2.166 km²",
    villageLocationCoords:
      "Latitude. -6.4469° or 6° 26' 49' south ; Longitude. 107.6317° or 107° 37' 54",
    villageHead: {
      name: "Asep Sugianto S.Kep",
      contact: "-",
    },
    villageFacilities: [
      "School",
      "Public health center",
      "Traditional market",
      "Village meeting hall",
      "Sports Facilities",
    ],
    villagePotential:
      "Sukamaju Village has fertile agricultural potential and is a center for agricultural production in the surrounding area. Apart from that, this village also has tourism potential with beautiful natural scenery.",
    villageEvents: [
      "Independence Day Celebration",
      "Traditional ceremonies",
      "Cultural Festival",
    ],
    villageOrganizations: ["Karang Taruna", "PKK", "Kelompok Tani"],
    villageContact: {
      address: "Sukamaju, Kec. Majalaya, Bandung Regency, West Java 41262",
      phone: "-",
      email: "-",
      instagram: "-",
    },
  };

  return (
    <div className="container-profile">
      <div className="profile-village">
        <div className="village-image-container-profile">
          <img
            src={villageData.villageImage}
            alt="Village"
            className="village-image"
          />
        </div>
        <div className="village-details">
          <div className="village-info">
            <h2 className="village-name">{villageData.villageName}</h2>
            <br></br>
            <p className="village-description">
              {villageData.villageDescription}
            </p>
          </div>
          <div className="village-stats">
            <div className="stat">
              <span className="stat-label">Population : </span> <br></br>
              <span className="stat-value">
                {villageData.villagePopulation}
              </span>
            </div>
            <div className="stat">
              <span className="stat-label">Area : </span>
              <br></br>
              <span className="stat-value">{villageData.villageArea}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Location : </span>
              <span className="stat-value">
                {villageData.villageLocationCoords}
              </span>
            </div>
          </div>
          <div className="village-details-section">
            <h3 className="section-heading">The head of the village</h3>
            <p className="section-content">
              Name : {villageData.villageHead.name}
            </p>
            <p className="section-content">
              Contact : {villageData.villageHead.contact}
            </p>
          </div>
          <div className="village-details-section">
            <h3 className="section-heading">Facilities and Infrastructure</h3>
            <ul className="section-list">
              {villageData.villageFacilities.map((facility, index) => (
                <li key={index}>{facility}</li>
              ))}
            </ul>
          </div>
          <div className="village-details-section">
            <h3 className="section-heading">Village Potential</h3>
            <p className="section-content">{villageData.villagePotential}</p>
          </div>
          <div className="village-details-section">
            <h3 className="section-heading">Events and Traditions</h3>
            <ul className="section-list">
              {villageData.villageEvents.map((event, index) => (
                <li key={index}>{event}</li>
              ))}
            </ul>
          </div>
          <div className="village-details-section">
            <h3 className="section-heading">Community Organization</h3>
            <ul className="section-list">
              {villageData.villageOrganizations.map((organization, index) => (
                <li key={index}>{organization}</li>
              ))}
            </ul>
          </div>
          <div className="village-details-section">
            <h3 className="section-heading">Contact</h3>
            <p className="section-content">
              Village Office Address : {villageData.villageContact.address}
            </p>
            <p className="section-content">
              Phone Number : {villageData.villageContact.phone}
            </p>
            <p className="section-content">
              Email : {villageData.villageContact.email}
            </p>
            <p className="section-content">
              Instagram : {villageData.villageContact.instagram}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileVillageScreen;
