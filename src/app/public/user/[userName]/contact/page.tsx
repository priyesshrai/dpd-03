import CommonFooter from '@/components/CommonFooter'
import React from 'react'

export default function ContactPage() {
    return (
        <div className='other-page'>
            <div className="other-page-wraper">
                <div className="heading">
                    <h2>
                        Let&apos;s <span> 👋 Work </span> Together
                    </h2>
                    <p>
                        I&apos;m here to help if you&apos;re searching for a product designer to bring your idea to life or a design partner to help take your business to the next level.
                    </p>
                </div>

                <div className="body" style={{ marginTop: "80px" }}>
                    <form className="contact-body">
                        <div className="details-edit-wraper">
                            <div className="edit-input-container">
                                <input
                                    type="text"
                                    name='name'
                                    placeholder=''
                                    required
                                    className='inputs'
                                />
                                <label className='label'>Name</label>
                            </div>
                            <div className="edit-input-container">
                                <input
                                    type="email"
                                    name='email'
                                    placeholder=''
                                    required
                                    className='inputs'
                                />
                                <label className='label'>Email</label>
                            </div>
                            <div className="edit-input-container">
                                <input
                                    type="text"
                                    name='subject'
                                    placeholder=''
                                    required
                                    className='inputs'
                                />
                                <label className='label'>Subject</label>
                            </div>
                            <div className="edit-input-container">
                                <input
                                    type="tel"
                                    name='contact'
                                    placeholder=''
                                    required
                                    className='inputs'
                                />
                                <label className='label'>Contact No</label>
                            </div>
                            <div className="edit-input-container" style={{ gridColumn: "span 2" }}>
                                <textarea
                                    name='intro'
                                    placeholder=''
                                    required
                                    className='inputs'
                                    rows={5}
                                />
                                <label className='label'>Message</label>
                            </div>
                        </div>
                        <button type='submit'>Send</button>
                    </form>
                </div>
                <CommonFooter />
            </div>
        </div>
    )
}
