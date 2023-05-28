import React, { useRef, useState } from 'react';
import {
    formatCVC,
    formatExpirationDate,
    formatFormData,
} from '../utils';

import './Payment.scss';
import CreditCard from '../CreditCard/CreditCard';
import Header from '../Header/Header';

const PaymentForm = () => {
    const [number, setNumber] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCVC] = useState('');
    const [issuer, setIssuer] = useState('');
    const [focused, setFocused] = useState('');
    const [formData, setFormData] = useState(null);
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const formRef = useRef(null);

    const handleInputFocus = ({ target }) => {
        setFocused(target.name);
    };

    const handleInputChange = ({ target }) => {
        let value = target.value;
        const name = target.name;

        if (name === 'number') {
            value
                .replace(/\s/g, '') // Remove existing whitespace
                .replace(/(\d{4})/g, '$1 ') // Add whitespace after every four digits

        } else if (name === 'expiry') {
            value = formatExpirationDate(value);
        } else if (name === 'cvc') {
            value = formatCVC(value);
        }

        switch (name) {
            case 'number':
                setNumber(value);
                break;
            case 'name':
                setName(value);
                break;
            case 'expiry':
                setExpiry(value);
                break;
            case 'cvc':
                setCVC(value);
                break;
                case 'password':
                    setPassword(value);
                    break;
            default:
                break;
        }

    };

    const handleCardNumberChange = (event) => {
        // Remove any non-digit characters from the input value
        const rawValue = event.target.value.replace(/\D/g, ' ');

        // Apply the desired format using regular expressions
        const formattedValue = rawValue.replace(/(\d{4})(?=\d)/g, '$1 ');

        setNumber(formattedValue);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        // const formElements = [...formRef.current.elements];

        // const formData = formElements
        //     .filter((element) => element.name)
        //     .reduce((acc, element) => {
        //         acc[element.name] = element.value;
        //         return acc;
        //     }, {});

        // setFormData(formData);
        // formRef.current.reset();
    };

    return (
        <>
            <div className="payment flex flex-col-reverse md:flex-row-reverse gap-5">

                <div className='relative bg-white pt-[100px] md:px-5'>
                    <div className='wrapper flex-1 xxl:flex-2  flex flex-col w-auto lg:max-w-[320px] rounded-lg'>
                        <CreditCard number={number} name={name} expiry={`${month}${year}`} />
                        <div className='checkout_Details w-[300px] px-5 flex flex-col gap-2 m-auto pt-[220px] pb-[30px]'>
                            <div className='company_name flex flex-row justify-between'>
                                <h3 className='text-[#a9b0c5]'>Company</h3>
                                <h3 className='font-[500] inline-flex'> <img src="/apple.png" width="25px" height="25px" />Apple</h3>
                            </div>
                            <div className='company_name flex flex-row justify-between'>
                                <h3 className='text-[#a9b0c5]'>Order Number</h3>
                                <h3 className='font-[500]'>1266101</h3>
                            </div>
                            <div className='company_name flex flex-row justify-between'>
                                <h3 className='text-[#a9b0c5]'>Product</h3>
                                <h3 className='font-[500]'>Macbook Air</h3>
                            </div>
                            <div className='company_name flex flex-row justify-between'>
                                <h3 className='text-[#a9b0c5]'>VAT (20%)</h3>
                                <h3 className='font-[500]'>$100.0</h3>
                            </div>
                        </div>
                    </div>
                    <div className='border-b-[2px] border-dashed border-b-[darkgrey] w-[calc(100%-40px)] m-auto'></div>
                    <div className='checkout_bottom p-5 w-[auto] lg:max-w-[320px]'>
                        <div className='company_name flex flex-col justify-between'>
                            <h3 className='text-[#a9b0c5]'>You have to pay</h3>
                            <div className='font-[500] flex justify-between items-center rounded-lg'>
                                <h3>599 <small>.99 <span>USD</span></small> </h3><img src='/invoice.png' width="50px" height="50px" className='ml-0' /> </div>
                        </div>
                    </div>
                </div>


                <form ref={formRef} onSubmit={handleSubmit} className='sm:flex-3 flex flex-col gap-5 w-[100vw] px-5 md:px-5'>
                    <Header />

                    <div className="form-group flex gap-4 flex-col sm:flex-col">
                        <div className='flex flex-row'>
                            <div className='flex flex-col w-[90%]'>
                                <label className='font-[500]'>Card Number</label>
                                <small className='text-[#a9b0c5]'>Enter the 16 digit number on the card</small>
                            </div>
                            <div className='text-[#5785ce] flex items-center cursor-pointer'><img src='/edit.png' width="25px" height="25px" /> Edit</div>
                        </div>

                        <div className=' w-[100%] flex flex-row gap-3 px-3 py-3 border bg-[#e2e2e21f] focus:outline-none focus-within:border-[blue]  focus-within:text-blue-700 rounded focus-within:bg-[#ecf3fe] focus-within:ring-2'>
                            <img src='/mastercard.png' width={"30px"} height={"30px"} />
                            <input
                                type="tel"
                                name="number"
                                className="form-control w-[100%] focus:outline-none focus:bg-transparent bg-transparent"
                                placeholder="0000 - 0000 - 0000 - 0000"
                                //   pattern="[\d| ]{16,22}"
                                required
                                maxLength="19"
                                value={number}
                                onChange={handleCardNumberChange}
                                onFocus={handleInputFocus}

                            />
                            {
                                number.length >= 19 && (
                                    <img src='/markIcon.png' width={"15px"} height={"15px"} />
                                )
                            }

                        </div>

                    </div>

                    <div className="form-group flex flex-col sm:flex-row gap-5">
                        <div className='flex flex-col '>
                            <label className='font-[500]'>Card Name</label>
                            <small className='text-[#a9b0c5]'>Enter the name on the card</small>
                        </div>
                        <input
                            type="text"
                            name="name"
                            className="flex-1 px-3 py-3 border bg-[#e2e2e21f] focus:outline-none focus-within:border-[blue]  focus-within:text-blue-700 rounded focus-within:bg-[#ecf3fe] focus-within:ring-2"
                            placeholder="Name"
                            required
                            maxLength="18"
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                        />
                    </div>


                    <div className="flex flex-col sm:flex-row gap-5">
                        <div className=' flex flex-col w-[max-content]'>
                            <label className='font-[500]'>Expiry Date Number</label>
                            <small className='text-[#a9b0c5]'>Enter the expiration date of the card</small>
                        </div>
                        <div className='flex-1 flex flex-row gap-3 h-[max-content] items-center '>

                            <input
                                type="tel"
                                name="month"
                                className=" w-[100px] px-2 py-2 text-center border bg-[#e2e2e21f] focus:outline-none focus-within:border-[blue]  focus-within:text-blue-700 rounded focus-within:bg-[#ecf3fe] focus-within:ring-2"
                                required
                                placeholder="MM"
                                value={month}
                                maxLength="2"
                                onChange={(e) => setMonth(e.target.value)}
                                onFocus={handleInputFocus}
                            />
                            <span>/</span>
                            <input
                                type="tel"
                                name="year"
                                className="max-w-[100px] px-3 py-3 border text-center bg-[#e2e2e21f] focus:outline-none focus-within:border-[blue]  focus-within:text-blue-700 rounded focus-within:bg-[#ecf3fe] focus-within:ring-2"
                                required
                                placeholder="YY"
                                value={year}
                                maxLength="2"
                                onChange={(e) => setYear(e.target.value)}
                                onFocus={handleInputFocus}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-5">
                        <div className='flex flex-col'>
                            <label className='font-[500]'>CVV Number</label>
                            <small className='text-[#a9b0c5]'>Enter the 3 or 4 digit number on the card</small>
                        </div>
                        <div className=' flex-1 w-[100%] flex flex-row gap-3 px-3 py-3 border bg-[#e2e2e21f] focus:outline-none focus-within:border-[blue]  focus-within:text-blue-700 rounded focus-within:bg-[#ecf3fe] focus-within:ring-2'>
                            <input
                                type="number"
                                name="cvc"
                                className="form-control w-[100%] focus:outline-none focus:bg-transparent bg-transparent"
                                placeholder="CVV"
                                required
                                maxLength="3"
                                value={cvc}
                                onChange={handleInputChange}
                                onFocus={handleInputFocus}

                            />

                            <img src='/menuIcon.png' width={"30px"} height={"30px"} />



                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-5">
                        <div className='flex flex-col'>
                            <label className='font-[500]'>Password</label>
                            <small className='text-[#a9b0c5]'>Enter your Dynamic password</small>
                        </div>
                        <div className=' flex-1 w-[100%] flex flex-row gap-3 px-3 py-3 border bg-[#e2e2e21f] focus:outline-none focus-within:border-[blue]  focus-within:text-blue-700 rounded focus-within:bg-[#ecf3fe] focus-within:ring-2'>
                            <input
                                type="password"
                                name="password"
                                className="form-control w-[100%] focus:outline-none focus:bg-transparent bg-transparent"
                                placeholder="********"
                                required
                                maxLength="12"
                                value={password}
                                onChange={handleInputChange}
                                onFocus={handleInputFocus}

                            />

                            <img src='/menuIcon.png' width={"30px"} height={"30px"} />



                        </div>
                    </div>

                    <div className=" button md:flex">
                        <button className="bg-[#025efe] text-white w-[100%] max-[200px] py-3 rounded cursor-pointer">Pay Now</button>
                    </div>
                </form>


            </div>

            <div className="button2 form-actions flex md:hidden my-10">
                <button className="bg-[#025efe] text-white text-center m-auto w-[95%] py-3 rounded cursor-pointer">Pay Now</button>
            </div>
        </>
    );
};

export default PaymentForm