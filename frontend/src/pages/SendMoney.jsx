import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';
import Valid from '../components/Valid';
export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);
    const [success, setSuccess] = useState("none");
    return <div className="flex justify-center h-screen bg-gray-100">
        <Valid/>
        <div className="h-full flex flex-col justify-center">
            <div
                className="border h-min text-card-foreground max-w-md p-4 space-y-3 w-96 bg-white shadow-lg rounded-lg"
            >
                <div className="flex flex-col space-y-1.5 p-1">
                <h2 className="text-3xl font-bold text-center">Send Money</h2>
                </div>
                <div className="p-6 ">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
                    </div>
                    <h3 className="text-2xl font-semibold">{name}</h3>
                </div>
                <div className="space-y-4 flex flex-col justify-center">
                    <div className="space-y-2">
                    <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="amount"
                    >
                        Amount (in Rs)
                    </label>
                    <input
                        onChange={(e) => {
                            setAmount(e.target.value);
                        }}
                        type="number"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        id="amount"
                        placeholder="Enter amount"
                    />
                    </div>
                    <button onClick={async () => {

                           const response = await axios.post("http://localhost:3000/api/v1/account/transfer", {
                                to: id,
                                amount 
                            }, {
                                headers: {
                                    Authorization: "Bearer " + localStorage.getItem("token")
                                }
                            })
                            if(response.data.message == "Insufficient balance" || response.data.message == "Invalid account"){
                                setSuccess("Failed");
                            } else if(response.data.message == 'Transfer successful'){
                                setSuccess("Success");
                            } else if(response.data.message == "Negative/Zero amount not allowed"){
                                setSuccess("Negative");
                            }
                       
                    
                    }} className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                        Initiate Transfer
                    </button>
                    {success === "Success" ? (
                        <div className="flex text-green-700 items-center">
                            <div>Transaction Successful</div>
                        </div>
                    ) : success === "Failed" ? (
                        <div className="flex items-center text-red-600">
                            Transaction Failed
                        </div>
                    ) : success === "Negative" ? (
                        <div className="flex items-center text-red-600">
                            Negative amount not Allowed
                        </div>
                    ):null}

                    </div>
                </div>
        </div>
      </div>

    </div>
}