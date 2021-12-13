import React , {useState , useEffect} from 'react'
import axios from 'axios'
export default function Profile({token}) {
const [user, setuser] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:5000/user`)
        .then(res =>{
            setuser(res.data)
          
        })
        .catch(err => {
          console.log(err);
        })
        
    }, [token])
    console.log(user.userName);
    return (
        <div>
            <div>
               {user.userName}
               

            </div>
        </div>
    )
}
