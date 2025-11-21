import React from "react";

function ErrorBox({ message }) {
    return (
        <div className="alert alert-danger m-0" role="alert">
            {message}
        </div>
    );
}

export default ErrorBox;