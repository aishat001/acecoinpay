import React, { useState, useEffect } from 'react';

const Timer = ({ durationInSeconds }) => {
    const [timer, setTimer] = useState(durationInSeconds);

    useEffect(() => {
        if (timer > 0) {
            const countdown = setTimeout(() => {
                setTimer(timer - 1);
            }, 1000);

            return () => clearTimeout(countdown);
        }
    }, [timer]);

    // Convert seconds to minutes and seconds format
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;

    return (
        <div className='flex flex-row gap-1 items-center'>
            {
                minutes < 10 ?
                    (
                        <><span className='p-2 bg-[#1e2a53] text-white rounded'>0</span>
                            <span className='p-2 bg-[#1e2a53] text-white rounded'>
                                {minutes}
                            </span>

                        </>
                    ) :
                    (
                        <div>

                            {minutes}
                        </div>
                    )
            }
            <span  className='font-[5=800]'>:</span>
            {
                seconds < 10 ?
                    (
                        <div className='flex flex-row utems-center gap-1'>
                            <span className='p-2 bg-[#1e2a53] text-white rounded'>0</span>
                            <span className='p-2 bg-[#1e2a53] text-white rounded'>{seconds}</span>


                        </div>
                    ) :
                    (
                        <div className='flex flex-row gap-1'>
                            {seconds.toString().split('').map((char, index) => (
                                <span key={index} className='p-2 bg-[#1e2a53] text-white rounded'>{char}</span>
                            ))}


                        </div>
                    )}
        </div>
    );
};

export default Timer;