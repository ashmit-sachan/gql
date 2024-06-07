import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InputText from "../InputText";

function Account() {
    return (
        <>
            <div className="mx-auto flex flex-col space-y-4 w-2/5 md:w-1/2">
                <InputText
                    name="Name"
                    value="Kullu"
                    autoComplete="name"
                    type="text"
                    placeholder="Name"
                    disabled={true}
                />

                <div className="relative">
                    <InputText
                        name="Email"
                        type="email"
                        autoComplete="email"
                        required={true}
                        placeholder="Email"
                    />

                    <div className="absolute right-0 bottom-px flex space-x-2">
                        <button className='bg-green-600 px-1.5 pt-1 pb-2 rounded-lg hover:scale-105'>
                            <EditIcon sx={{ color: "white" }} fontSize='small' />
                        </button>
                    </div>
                </div>

                <div className="relative">
                    <InputText
                        name="DateOfJoining"
                        type="date"
                        placeholder="Date of Birth"
                        disabled={true}
                        className="cursor-not-allowed"
                        value='2021-09-01'
                    />
                </div>

                <div className="relative">
                    <InputText
                        name="Password"
                        type="password"
                        autoComplete="password"
                        required={true}
                        placeholder="Password"
                    />

                    <div className="absolute right-0 bottom-px flex space-x-2">
                        <button className='bg-green-600 px-1.5 pt-1 pb-2 rounded-lg hover:scale-105'>
                            <EditIcon sx={{ color: "white" }} fontSize='small' />
                        </button>
                    </div>
                </div>

                <button className='bg-red-600 p-2 rounded-lg hover:scale-105 flex justify-center'>
                    <DeleteIcon sx={{ color: "white" }} fontSize='small' />
                    <span className="text-sm font-semibold text-white">Delete Account</span>
                </button>
            </div >
        </>
    );
}

export default Account;
