import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import iocLogo from '../public/ioc.png';




export default function Index() {
  return (
    
    <div className='nav-container'>
      <div className='logo-holder'>
        <Image
          src="/ioc.png"
          width={100}          // Set the desired width
          height={100}
        />
      </div>
      <div className='menu-holder'>
          <h2>Fuel Accounting</h2>
          
      </div>
      <div className='userdata-holder'>
          <Link href="/">
          <button>Home</button>
          </Link>
          <Link href="/dsr/DSR">
          <button>DSR</button>
          </Link>
          <button>Purchse</button>
          <button>Sales</button>
          <button>Ledgers</button>
          <button>Report</button>
          <button>Inspection</button> 


      </div>
      
    </div>
  );
}
