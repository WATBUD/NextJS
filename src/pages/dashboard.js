 
import Image from 'next/image'
import Link from 'next/link';
const dashboard = () => {
    return (
      <>
      <title>Dashboard Example</title>
      <div class="bg-gray-100">
        <div class="flex h-screen">
          <div class="w-1/5 bg-blue-500 text-white p-4">
            <h2 class="text-xl font-semibold mb-4">Dashboard Menu</h2>
            <ul class="space-y-2">
              <li><a href="#" class="block py-1">Home</a></li>
              <li><a href="#" class="block py-1">Reports</a></li>
              <li><a href="#" class="block py-1">Analytics</a></li>
              <li><a href="#" class="block py-1">Settings</a></li>
            </ul>
          </div>
          <div class="w-4/5 p-8">
            <h1 class="text-3xl font-semibold mb-4">Welcome to the Dashboard</h1>
            <div class="grid grid-cols-3 gap-6">
              <div class="bg-white p-4 rounded shadow">
                <h3 class="text-lg font-semibold mb-2">Users</h3>
                <p class="text-gray-600">Total Users: 1000</p>
              </div>
              <div class="bg-white p-4 rounded shadow">
                <h3 class="text-lg font-semibold mb-2">Sales</h3>
                <p class="text-gray-600">Total Sales: $50,000</p>
              </div>
              <div class="bg-white p-4 rounded shadow">
                <h3 class="text-lg font-semibold mb-2">Visits</h3>
                <p class="text-gray-600">Total Visits: 5000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
      
    )
  };
  
  export default dashboard;