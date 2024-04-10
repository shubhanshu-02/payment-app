import { useEffect, useState } from "react"
import { Button } from "./Button"
import { Logo } from "./Logo";
import axios from "axios";

export const Users = () => {
    // Replace with backend call
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios
        .get("http://localhost:3000/api/v1/user/users")
        .then(response => {
            setUsers(response.data.user)
        })
    }, [])
    return <>
        <div className="font-bold mt-6 text-2xl p-2">
            Users
        </div>
        <div className="my-2 px-3">
            <input type="text" placeholder="Search users..." className="w-full px-2 py-2 border rounded border-slate-200"></input>
        </div>
        <div>
            {users.map(user => <User user={user} />)}
        </div>
    </>
}

function User({user}) {
    return <div className="flex justify-between">
        <div className="flex">
             <Logo label = {`${user.firstName}`} />
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-full">
            <Button label={"Send Money"} />
        </div>
    </div>
}