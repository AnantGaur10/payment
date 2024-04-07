import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import { useRecoilState } from "recoil"
import { balanceState } from "../atoms/balance"
import { useRecoilValue } from 'recoil';
import { nameSelector } from '../atoms/firstName';


export const Dashboard = () => {
    const [balance,setBalance] = useRecoilState(balanceState);
    // const [name,setName] = useRecoilState(nameState);
    const name = useRecoilValue(nameSelector);
    return <div>
        <Appbar name={name}/>
        <div className="m-8">
            <Balance value = {balance} />
            <Users/> {/*hopefully users prop ki tarah pass karne hai*/}
        </div>
    </div>
}