import React from 'react';
import { getAccessToken } from '../../api/axiosClient';
const Dashboard = () => {
    console.log(getAccessToken())
    return (
        <div>
            this is dashboard
        </div>
    );
};

export default Dashboard;