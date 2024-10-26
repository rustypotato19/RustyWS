import React, { useState } from 'react';

const Contact = () => {
    // State for managing the message and the character count
    const [message, setMessage] = useState('');
    const maxChars = 500;

    // Handle change in the message textarea
    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    return (
        <section className='mx-auto flex justify-center items-center w-full mb-[5.5rem]'>
            <div className='flex flex-col justify-center items-center h-full w-[90dvw] lg:w-[60dvw] transition-all duration-200 border border-rws-dark-blue rounded-3xl py-3 px-6 lg:py-6 lg:px-12'>
                
                <h1 className="text-center text-3xl text-rws-dark-blue rounded-full font-bold py-1 lg:py-2 w-full">
                    Contact Us
                </h1>
                <p className='text-sm text-rws-gray opacity-80'>* indicates required field</p>
                
                {/* Contact Form */}
                <form className='flex flex-col w-full justify-center'>
                    <label htmlFor='name' className='text-rws-dark-blue text-lg font-bold'>Name *</label>
                    <input type='text' id='name' name='name' placeholder='Jane Doe' className='border-2 border-rws-dark-blue rounded-lg p-2 my-2 text-ellipsis' required />
                    
                    <label htmlFor='email' className='text-rws-dark-blue text-lg font-bold'>Email *</label>
                    <input type='email' id='email' name='email' placeholder='example@email.com' className='border-2 border-rws-dark-blue rounded-lg p-2 my-2 text-ellipsis' required />
                    
                    <label htmlFor='message' className='text-rws-dark-blue text-lg font-bold'>Message *</label>
                    <textarea 
                        id='message' 
                        name='message' 
                        rows="5" 
                        placeholder='Enter your message here...' 
                        className='border-2 border-rws-dark-blue rounded-lg p-2 my-2 text-ellipsis'
                        maxLength={maxChars}
                        value={message}
                        onChange={handleMessageChange}
                        required
                    />
                    <div className="text-right text-sm text-rws-gray opacity-80">
                        {maxChars - message.length} characters remaining
                    </div>
                    
                    <button type='submit' className='bg-rws-dark-blue text-white rounded-lg py-2 px-4 my-2 w-fit hover:bg-rws-light-blue transition-all duration-500'>Submit</button>
                </form>
            
            </div>
            <div id="contact" className="text-transparent absolute left-0">
                <p>Invisible About Us Tag</p>
            </div>
        </section>
    )
};

export default Contact;
