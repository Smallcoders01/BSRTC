import React from 'react'
import TenderComp from '../components/UserComponents/Tender/TenderComp'
import Banner from '../components/UserComponents/Banner';
const Tender = () => {
  const language = localStorage.getItem('language') || 'en';
  
  return (
    <div>
        <Banner title={language === 'en' ? 'Tenders' : 'निविदाएं'}/>
      <TenderComp/>
    </div>
  )
}

export default Tender
