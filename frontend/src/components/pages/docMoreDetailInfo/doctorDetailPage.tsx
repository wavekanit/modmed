import React from 'react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function DoctorDetailPage() {
    const navigate = useNavigate();
    const [confirmDelete, setConfirmDelete] = useState(false);
    const location = useLocation();
    const Data = location.state.val;

    function goBack() {
        navigate("/doctorinfo");
    }

    function confDel() {
        setConfirmDelete(!confirmDelete);
    }

    function delSuces() {
        alert("Sucessfully Delete Doctor !");
        navigate("/doctorinfo");
    }

    return (
        <>
            <div className="card w-96 bg-base-100 shadow-xl my-2 mx-auto">
                <div className="card-body">
                    <div className="card-actions justify-end">
                        <button className="btn btn-square btn-sm" onClick={goBack}>X</button>
                    </div>
                    <h2 className="card-title">
                        {Data.fName} {Data.mName ? Data.mName : ""} {Data.lName}
                    </h2>
                    <li>Gender : {Data.sex}</li>
                    <li>Email : {Data.email}</li>
                    <li>id Number : {Data.idNumber}</li>
                    <li>Nationality : {Data.Nationality}</li>
                    <li>Tel : {Data.tel}</li>
                    <div className="card-actions justify-end">
                        {!confirmDelete ?
                            <>
                                <button className="btn text-xs btn-md" onClick={confDel}>Delete</button>
                                <button className="btn text-xs btn-md">Edit</button>
                            </>   
                        : <><button className="btn text-xs btn-md" onClick={delSuces}>Confirm Delete</button></>}
                    </div>
                </div>
            </div>
        </>
    );
}