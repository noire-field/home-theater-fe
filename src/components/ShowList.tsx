import React from 'react';

function ShowList() {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-400">
                <thead className="text-xs uppercase bg-gray-700 text-gray-400 text-center">
                    <tr>
                        <th scope="col" className="px-6 py-3">ID</th>
                        <th scope="col" className="px-6 py-3">PIN</th>
                        <th scope="col" className="px-6 py-3 text-left">Title</th>
                        <th scope="col" className="px-6 py-3">Start Time</th>
                        <th scope="col" className="px-6 py-3">Duration</th>
                        <th scope="col" className="px-6 py-3">Smart Sync</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                        <th scope="col" className="px-6 py-3">Action</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    <tr className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
                        <td className="px-6 py-4">3</td>
                        <td className="px-6 py-4 font-medium text-white whitespace-nowrap tracking-widest">19402</td>
                        <td className="px-6 py-4 font-medium text-white whitespace-nowrap text-left">Doctor Strange (2016)</td>
                        <td className="px-6 py-4">13:30 Jan 21, 2022</td>
                        <td className="px-6 py-4">02:15:24</td>
                        <td className='px-6 py-4 text-center'><span className='text-green-500'>ON</span></td>
                        <td className="px-6 py-4"><span className='text-yellow-400'>Processing</span></td>
                        <td className="px-6 py-4">
                            <a href="#" className="font-medium text-yellow-500 hover:underline"><i className="fa-solid fa-pen-to-square mr-1"></i>Edit</a>
                        </td>
                    </tr>
                    <tr className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
                        <td className="px-6 py-4">2</td>
                        <td className="px-6 py-4 font-medium text-white whitespace-nowrap tracking-widest">44202</td>
                        <td className="px-6 py-4 font-medium text-white whitespace-nowrap text-left">Spider Man 2 (2004)</td>
                        <td className="px-6 py-4">13:30 Jan 21, 2022</td>
                        <td className="px-6 py-4">02:15:24</td>
                        <td className='px-6 py-4 text-center'><span className=''>OFF</span></td>
                        <td className="px-6 py-4"><span className='text-green-400'>Scheduled</span></td>
                        <td className="px-6 py-4">
                            <a href="#" className="font-medium text-yellow-500 hover:underline"><i className="fa-solid fa-pen-to-square mr-1"></i>Edit</a>
                        </td>
                    </tr>
                    <tr className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
                        <td className="px-6 py-4">1</td>
                        <td className="px-6 py-4 font-medium text-white whitespace-nowrap tracking-widest">19402</td>
                        <td className="px-6 py-4 font-medium text-white whitespace-nowrap text-left">Doctor Strange (2016)</td>
                        <td className="px-6 py-4">13:30 Jan 21, 2022</td>
                        <td className="px-6 py-4">02:15:24</td>
                        <td className='px-6 py-4 text-center'><span className=''>OFF</span></td>
                        <td className="px-6 py-4"><span className='text-blue-400'>Finished</span></td>
                        <td className="px-6 py-4">
                            <a href="#" className="font-medium text-yellow-500 hover:underline"><i className="fa-solid fa-pen-to-square mr-1"></i>Edit</a>
                        </td>
                    </tr>
                    <tr className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
                        <td className="px-6 py-4">1</td>
                        <td className="px-6 py-4 font-medium text-white whitespace-nowrap tracking-widest">19402</td>
                        <td className="px-6 py-4 font-medium text-white whitespace-nowrap text-left">Doctor Strange (2016)</td>
                        <td className="px-6 py-4">07:30 Jan 21, 2022</td>
                        <td className="px-6 py-4">02:15:24</td>
                        <td className='px-6 py-4 text-center'><span className='text-green-500'>ON</span></td>
                        <td className="px-6 py-4"><span className='text-pink-400'>Watching</span></td>
                        <td className="px-6 py-4">
                            <a href="#" className="font-medium text-yellow-500 hover:underline"><i className="fa-solid fa-pen-to-square mr-1"></i>Edit</a>
                        </td>
                    </tr>
                    <tr className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
                        <td className="px-6 py-4">1</td>
                        <td className="px-6 py-4 font-medium text-white whitespace-nowrap tracking-widest">19402</td>
                        <td className="px-6 py-4 font-medium text-white whitespace-nowrap text-left">Doctor Strange (2016)</td>
                        <td className="px-6 py-4">13:30 Jan 21, 2022</td>
                        <td className="px-6 py-4">02:15:24</td>
                        <td className='px-6 py-4 text-center'><span className='text-green-500'>ON</span></td>
                        <td className="px-6 py-4"><span className='text-red-400'>Error</span></td>
                        <td className="px-6 py-4">
                            <a href="#" className="font-medium text-yellow-500 hover:underline"><i className="fa-solid fa-pen-to-square mr-1"></i>Edit</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default React.memo(ShowList);