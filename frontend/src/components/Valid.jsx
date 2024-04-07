// Valid.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { balanceState } from "../atoms/balance";
import { useSetRecoilState } from "recoil";
import { nameState } from "../atoms/firstName";
import axios from "axios";


function Valid() {
    const navigate = useNavigate();
    const [redirect, setRedirect] = useState(false);
    const setBalance  = useSetRecoilState(balanceState);
    const setName = useSetRecoilState(nameState);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/user/me", {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.data.msg === "invalid") {
                    setRedirect(true);
                } else if(response.data.msg === "valid"){
                    setBalance(response.data.balance);
                    setName(response.data.firstName);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (redirect) {
            navigate("/signup");
        }
    }, [navigate, redirect]);

    return null;
}

export default Valid;
