import React, { useEffect, useState } from 'react';
import { fetchData } from '../api/someApi';

const SomeComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData();
        setData(result);
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);
      }
    };

    getData();
  }, []);

  return (
    <div>
      {data ? <div>{data}</div> : <div>Loading...</div>}
    </div>
  );
};

export default SomeComponent;
