import { capitalize } from '@mui/material';
import { useState } from 'react';

import Tab from '../components/Tab';
import Account from '../components/profile/Account';
import Plans from '../components/profile/Plans';
import Profiles from '../components/profile/Profiles';

interface ProfileProps {
    active: string;
}

Profile.defaultProps = {
    active: 'account'
};

function Profile({active}: ProfileProps) {
    // State to track the active tab
    const [activeTab, setActiveTab] = useState(active);

    // Function to change the active tab
    const handleTabChange = (tabName: string) => {
        if (activeTab != tabName) {
            setActiveTab(tabName);
        }
    }

    const activeTabStyle = "bg-green-700 rounded-xl";
    const inActiveTabStyle = "hover:underline underline-offset-2";

    return (
        <>
            <section className="">
                <section className="bg-green-600 p-4 text-white border-b border-gray-200">
                    <div className="max-w-7xl w-full md:w-11/12 mx-auto flex justify-between items-center">
                        <div className="flex space-x-3 items-center">
                            <button onClick={() => handleTabChange('account')} className={`p-2 text-sm font-medium ${activeTab === 'account' ? activeTabStyle : inActiveTabStyle}`}>Account</button>
                            <button onClick={() => handleTabChange('profiles')} className={`p-2 text-sm font-medium ${activeTab === 'profiles' ? activeTabStyle : inActiveTabStyle}`}>Profiles</button>
                            <button onClick={() => handleTabChange('plans')} className={`p-2 text-sm font-medium ${activeTab === 'plans' ? activeTabStyle : inActiveTabStyle}`}>Plans</button>
                        </div>
                    </div>
                </section>

                <header className="bg-green-600 text-white p-4 relative">
                    <div className="max-w-7xl mx-auto z-10">
                        <h1 className="text-2xl font-semibold">{capitalize(activeTab)}</h1>
                    </div>
                </header>

                <Tab>
                    {activeTab === 'account' && <Account />}
                    {activeTab === 'profiles' && <Profiles />}
                    {activeTab === 'plans' && <Plans />}
                </Tab>
            </section>
        </>
    );
}

export default Profile;