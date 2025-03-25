import React from 'react';

const Forms = () => {
    const forms = [
        { id: 1, title: 'Form 1' },
        { id: 2, title: 'Form 2' },
        { id: 3, title: 'Form 3' },
        { id: 1, title: 'Form 1' },
        { id: 2, title: 'Form 2' },
        { id: 3, title: 'Form 3' },
    ];

    return (
        <div className='body flex flex-col w-full h-[100vh] p-4 md:p-10 bg-gray-100'>
            <h1 className='text-3xl font-bold mb-6'>Forms Dashboard</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {forms.map((form) => (
                    <div key={form.id} className='bg-dblue text-white font-semibold text-xl p-6 rounded-lg shadow-lg flex flex-col justify-between'>
                        <h2>{form.title}</h2>
                        <p className='text-sm font-light mt-2'>This is a brief description of {form.title}. You can add more details here.</p>
                        <button className='mt-4 bg-white text-dblue p-2 rounded-sm shadow'>
                            View Details
                        </button>
                    </div>
                ))}
            </div>
            <button className='fixed bottom-16 right-8 bg-dblue text-white text-2xl p-4 rounded-sm shadow-white shadow-lg'>
                +
            </button>
        </div>
    );
};

export default Forms
