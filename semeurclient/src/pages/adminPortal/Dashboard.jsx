import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

const Dashboard = () => {
    const { state: authState } = useContext(AuthContext);
    return (
        <div className="adminportal__container-dashboard">
          <h2 >Bienvenue {authState.user.username} </h2>
        </div>
    )
}

export default Dashboard;