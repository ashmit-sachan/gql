import { useState, useEffect } from 'react';
import api from '../../api';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import DeleteIcon from '@mui/icons-material/Delete';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import InputText from "../InputText";

function Account() {
    const email = Cookies.get('user');

    const [name, setName] = useState('');
    const [password, setPassword] = useState('dummyPassword');
    const [passwordError, setPasswordError] = useState('');
    const [isEdited, setIsEdited] = useState(false);
    const [dateOfJoining, setDateOfJoining] = useState('');

    useEffect(() => {
        if (email) {
            api.post('/users/user', { email: email })
                .then(response => {
                    setName(response.data.name);
                    setDateOfJoining(response.data.createdAt.split('T')[0]);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, []);


    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newInputValue = event.target.value;
        setName(newInputValue);
        setIsEdited(true);
    }

    const handlePasswordChange = (newPassword: string) => {
        setPassword(newPassword);
        setIsEdited(true);
    };

    const validatePassword = (password: string) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#+-])[A-Za-z\d@$!%*?&#+-]{8,}$/;
        return regex.test(password);
    };

    const handleUpdate = async () => {
        if (!validatePassword(password)) {
            setPasswordError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.');
            return;
        } else {
            setPasswordError('');
            api.patch('/users/edit', { email, name, password })
                .then(response => {
                    setName(response.data.name);
                    Cookies.set('user_name', name);
                    toast.success('Details updated successfully');
                    setIsEdited(false);
                })
                .catch(error => {
                    toast.error('Failed to update details');
                    console.error(error);
                });
        }
    };

    return (
        <div className="mx-auto flex flex-col space-y-4 w-2/5 md:w-1/2">
            <div className="relative w-full ">
                <span className="mt-3 px-0.5 text-sm font-semibold">Name<span className="text-red-500">*</span></span>
                <input
                    name="Name"
                    type="text"
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 mt-1 border border-zinc-300 placeholder-zinc-500 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm  "
                    placeholder="Name"
                    value={name}
                    onChange={handleNameChange} />
            </div>

            <div className="relative">
                <InputText
                    name="Email"
                    type="email"
                    autoComplete="email"
                    disabled={true}
                    placeholder="Email"
                    value={email}
                />
            </div>

            <div className="relative w-full hover:cursor-not-allowed">
                <span className="mt-3 px-0.5 text-sm font-semibold">Date of Joining</span>
                <input
                    name="DateOfJoining"
                    type="date"
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 mt-1 border border-zinc-300 placeholder-zinc-500 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm cursor-not-allowed hover:cursor-not-allowed bg-slate-200"
                    placeholder="Date of Joining"
                    disabled={true}
                    value={dateOfJoining} />
            </div>

            <div className="relative">
                <InputText
                    name="Password"
                    type="password"
                    autoComplete="password"
                    required={true}
                    placeholder="Password"
                    value={password}
                    error={passwordError}
                    onChange={handlePasswordChange}
                />
            </div>

            <button
                className={`p-2 rounded-lg hover:scale-105 flex justify-center ${isEdited ? 'bg-yellow-500' : 'bg-gray-500'}`}
                onClick={handleUpdate}
            >
                <UpgradeIcon sx={{ color: "white" }} fontSize='small' />
                <span className="text-sm font-semibold text-white">Update Details</span>
            </button>

            <button className='bg-red-600 p-2 rounded-lg hover:scale-105 flex justify-center'>
                <DeleteIcon sx={{ color: "white" }} fontSize='small' />
                <span className="text-sm font-semibold text-white">Delete Account</span>
            </button>
        </div>
    );
}

export default Account;
