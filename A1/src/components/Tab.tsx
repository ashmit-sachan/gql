import React from 'react';

function Tab({children}: { children: React.ReactNode}) {
    return (
        <div>
            <main className="p-4">
                <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Tab;