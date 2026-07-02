import React from 'react';

const LiveClass = () => {
  const classes = [
    { id: 1, title: 'DSA - Array', time: '10:00 AM', students: 15 },
    { id: 2, title: 'DBMS - Normalization', time: '12:00 PM', students: 28 },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Live Classes</h2>
      <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4">Course</th>
              <th className="p-4">Time</th>
              <th className="p-4">Students</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((cls) => (
              <tr key={cls.id} className="border-b border-gray-100">
                <td className="p-4 font-medium">{cls.title}</td>
                <td className="p-4 text-gray-600">{cls.time}</td>
                <td className="p-4 text-gray-600">{cls.students} Students</td>
                <td className="p-4">
                  <button className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition">Start</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LiveClass;
