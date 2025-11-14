import React from "react";

function ErrorBox({ message }) {
    return (
        <div className="alert alert-danger" role="alert">
            {message}
        </div>
    );
}

export default ErrorBox;