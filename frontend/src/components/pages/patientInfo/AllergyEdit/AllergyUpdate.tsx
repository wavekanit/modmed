import React, { useEffect } from 'react'
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FormWrapper from "../../FormWrapper";
import axios from 'axios';

type AllergyData = {
    allergy_id: number;
    p_id: number;
    type_allergy: string;
    allergy: string;
    status_allergy: number;
};

export default function AllergyUpdate() {
    const location = useLocation();
    const value = location.state.val;
    const val = value.p_id;

    const [data, setData] = useState<AllergyData>(value);

    const navigate = useNavigate();

    const submit = async (e: React.FormEvent) => {
            e.preventDefault();
            console.log("data : ",data);
            try {
                const response = await axios.post("http://localhost:3000/api/updatePatientAllergies", {
                    allergy_id: data.allergy_id,
                    type_allergy: data.type_allergy,
                    allergy: data.allergy,
                    status_allergy: data.status_allergy,
                });
                alert(response.data);
                // alert("Success");
            } catch (error) {
                console.error(error);
            } finally {
                navigate("/search_patient/details", { replace: true, state: { val: val}});
            }
        };

    return (
        <>
            <FormWrapper title="แก้ไขข้อมูลการแพ้ยา">
                <form onSubmit={submit}>
                    <div className="form-group">
                        <label>สิ่งที่แพ้</label>
                        <input  type="text" 
                                className="form-control" 
                                name="allergy" 
                                value={data.allergy} 
                                onChange={(e) => {
                                    setData({...data, allergy: e.target.value});
                                    console.log("data: ", data);
                                }} />
                    </div>
                    <div className="form-group">
                        <label>ประเภทการแพ้</label>
                        <input  type="text" 
                                className="form-control" 
                                name="status_allergy" 
                                value={data.status_allergy} 
                                onChange={(e) => {
                                    setData({...data, status_allergy: e.target.value});
                                    // console.log("data: ", data);
                                }} />
                    </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </FormWrapper>
    </>
  )
}