import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

const Customers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(`${API}users`);
      setUsers(res.data);
      // console.log('from customers ', res.data);
    };
    fetchUsers();
  }, []);

  return (
    <div className="adminportal__container-customers-container">
      <section className="adminportal__container-customers-container-header">
        <h5>Clients</h5>
      </section>
      <main className="adminportal__container-customers-container-main">
        <table className="adminportal__container-customers-container-main-table">
          <thead>
            <tr className="adminportal__container-customers-container-main-table-regular">
              <th className="adminportal__container-customers-container-main-table-regular">
                Nom
              </th>
              <th className="adminportal__container-customers-container-main-table-regular">
                Prénom
              </th>
              <th className="adminportal__container-customers-container-main-table-email">
                Email
              </th>
              <th className="adminportal__container-customers-container-main-table-regular">
                Téléphone
              </th>
              <th className="adminportal__container-customers-container-main-table-regular">
                Nom d'utilisateur
              </th>
              <th className="adminportal__container-customers-container-main-table-regular">
                Commandes
              </th>
              <th className="adminportal__container-customers-container-main-table-regular">
                Adresse
              </th>
              <th className="adminportal__container-customers-container-main-table-regular">
                Code postal
              </th>
              <th className="adminportal__container-customers-container-main-table-regular">
                Ville
              </th>
              <th className="adminportal__container-customers-container-main-table-regular">
                Pays
              </th>
            </tr>
          </thead>
          {users.map((user, i) => (
            <CustomerTableRow key={i} {...user} />
          ))}
        </table>
      </main>
    </div>
  );
};

const CustomerTableRow = ({
  address,
  zipcode,
  city,
  country,
  email,
  firstname,
  lastname,
  username,
  phone,
}) => {
  return (
    <>
      <tbody>
        <tr className="adminportal__container-customers-container-main-table-regular">
          <td className="adminportal__container-customers-container-main-table-regular">
            {lastname}
          </td>
          <td className="adminportal__container-customers-container-main-table-regular">
            {firstname}
          </td>
          <td className="adminportal__container-customers-container-main-table-email">
            {email}
          </td>
          <td className="adminportal__container-customers-container-main-table-regular">
            {phone}
          </td>
          <td className="adminportal__container-customers-container-main-table-regular">
            {username}
          </td>
          <td className="adminportal__container-customers-container-main-table-regular">
            orders
          </td>
          <td className="adminportal__container-customers-container-main-table-regular">
            {address}
          </td>
          <td className="adminportal__container-customers-container-main-table-regular">
            {zipcode}
          </td>
          <td className="adminportal__container-customers-container-main-table-regular">
            {city}
          </td>
          <td className="adminportal__container-customers-container-main-table-regular">
            {country}
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default Customers;
