import React, { useState, useEffect } from 'react';
import Banner from '../components/UserComponents/Banner';
import DirectoryComponent from '../components/UserComponents/Directory/DirectoryComponent';
import Loading from '../components/UserComponents/Loading';

const Directory = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [directoryReady, setDirectoryReady] = useState(false);
  const language = localStorage.getItem('language') || 'en';

  useEffect(() => {
    console.log('Directory: Initial loading started');
    const timer = setTimeout(() => {
      setInitialLoading(false);
      console.log('Directory: Initial loading finished');
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const handleDirectoryLoaded = () => {
    console.log('Directory: DirectoryComponent data loaded');
    setDirectoryReady(true);
  };

  console.log('Directory: Render cycle', { initialLoading, directoryReady });

  if (initialLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Banner title={language === 'en' ? 'Directory' : 'निर्देशिका'} />
      <DirectoryComponent onDataLoaded={handleDirectoryLoaded} />
      {!directoryReady && <Loading />}
    </div>
  );
};

export default Directory;