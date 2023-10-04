import React from 'react'
import Header from './Header';
import Footer from './Footer';


const Template = (props) => {

  return (
    <div>
    <Header/>
    <main>
      {props.children}



    </main>
    <Footer/>
    </div>
  )
}

export default Template