import React from 'react'

const ToggleItem = () => {
    const [isOn, setIsOn] = React.useState(false);

    const toggle = () => {
        setIsOn(!isOn);
    };

    return (
        <div className='bg-[#DAE1EC] h-12 flex items-center'>
            <div className={`w-1 h-full ${isOn ? 'bg-dblue' : 'bg-gray-300'}`}></div>
            <div className='flex-1 px-4'>
                <span className='text-lg font-semibold text-dblue '>Item Name</span>
            </div>
            <button
                onClick={toggle}
                className={`w-12 h-6 mx-4 rounded-md ${isOn ? 'bg-dblue' : 'bg-gray-300'} flex items-center p-1 transition-colors duration-300`}
            >
                <div
                    className={`bg-white w-4 h-4 rounded-md shadow-md transform ${isOn ? 'translate-x-6' : ''} transition-transform duration-300`}
                ></div>
            </button>
        </div>
    );
}

export default ToggleItem
