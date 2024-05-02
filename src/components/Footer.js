import React from 'react';


const Footer = () =>{
    const currentYear = new Date().getFullYear();

    return (
        <footer className='footer-section'>
            <div className='footer-data'>
                
                <p> &copy; {currentYear} Teerex Store.  All rights reserved.</p>

            </div>
        </footer>
    )
}
export default Footer;