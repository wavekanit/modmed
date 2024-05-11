import React from 'react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function DoctorDetailPage() {
    const navigate = useNavigate();
    const [confirmDelete, setConfirmDelete] = useState(false);
    const location = useLocation();
    const val = location.state.val;

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

    function editInfo() {
        navigate("/doctorinfo/details/edit", {replace: true, state: {val}});
    }

    return (
        <>
            {console.log(val)}
            <div className="card w-96 bg-base-100 shadow-xl my-2 mx-auto">
                <div className="card-body">
                    <div className="card-actions justify-end">
                        <button className="btn btn-square btn-sm" onClick={goBack}>X</button>
                    </div>
                    <h2 className="card-title">
                        {val.fName} {val.mName ? val.mName : ""} {val.lName}
                    </h2>
                    <li>Gender : {val.sex}</li>
                    <li>Email : {val.email}</li>
                    <li>id Number : {val.idNumber}</li>
                    <li>Nationality : {val.nationality}</li>
                    <li>Tel : {val.tel}</li>
                    <div className="card-actions justify-end">
                        {!confirmDelete ?
                            <>
                                <button className="btn text-xs btn-md" onClick={confDel}>Delete</button>
                                <button className="btn text-xs btn-md" onClick={editInfo}>Edit</button>
                            </>   
                        : <><button className="btn text-xs btn-md" onClick={delSuces}>Confirm Delete</button></>}
                    </div>
                </div>
            </div>
        </>
    );
}