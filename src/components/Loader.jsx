import React from "react";

const Loader = () => {

    return (
        <>
            <div className="flex absolute self-center justify-center items-center min-h-screen min-w-screen z-5 filter bg-gray-800 bg-opacity-50">
                <div className="i-mdi:loading w-25 h-25 z-5 fixed bg-orange-400 rounded-full animate-spin rounded"></div>
            </div>
        </>
    );
};

export default Loader;
