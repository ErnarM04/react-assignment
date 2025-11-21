import React from 'react';
import {Navigate, useNavigate} from "react-router";
import {useAuth} from "../services/AuthContext";
import {signOut} from "firebase/auth";

function Profile() {

    const { user, auth } = useAuth();
    const navigate = useNavigate();

    if (!user) {
        return <Navigate to="/login" replace/>
    }

    function handleLogout() {
        signOut(auth).then(() => {
            navigate("/");
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <div 
            className="d-flex align-items-center justify-content-center"
            style={{ width: "100%", minHeight: "90vh" }}
        >
            <div className="card shadow border-0 p-4" style={{ width: "100%", maxWidth: "500px" }}>
                <h3 className="card-title mb-4">Profile</h3>
                <div className="mb-3">
                    <h5 className="text-muted mb-1">Email</h5>
                    <div className="bg-light border-0">
                        {user.email}
                    </div>
                </div>

                <div className="mb-4">
                    <h5 className="text-muted mb-1">User ID</h5>
                    <div className="bg-light border-0">
                        {user.uid}
                    </div>
                </div>

                <button onClick={handleLogout}
                    className="btn btn-danger m-auto w-50">
                    Log Out
                </button>
            </div>

        </div>
    );
}

export default Profile;