import React from 'react'
import "./CreditCard.scss"

const CreditCard = ({number, expiry, name }) => {

    // const maskCardNumber = (number) => {
        const lastFourDigits = number.substr(-4);
        const maskedDigits = number.slice(0, -4).replace(/\d/g, '*');
      
        number = maskedDigits + lastFourDigits;
    //   };
  return (
    <div className='card_wrapper w-[100vw] sm:w-[250px] pt-10 absolute top-[-20px] right-0 left-0 flex flex-col items-center'>
        <div className='border self-center'></div>
        <div className='card'>
            <div className='card_chip top pt-[20px] mb-[100px]'>
                <img src='/chip.png' width={'40px'} height="40px"/>
                <img src='/service.png' width={'60px'} height="60px"/>
            </div>
            <div className='card_name'>{name || "Your Name Here"}</div>
            <div className='card_number'>{number || "**** **** **** 0000"}</div>

            <div className='card_bottom'>
                <div className='card_expiry'>{expiry || 'MM/YY'}</div>
                <img src='/mastercard2.png' width={'40px'} height="40px"/>
            </div>
        </div>
    </div>
  )
}

export default CreditCard