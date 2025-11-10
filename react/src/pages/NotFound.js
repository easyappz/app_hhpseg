import React from 'react';
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';

const NotFound = () => {
  return (
    <div data-easytag="id1-react/src/pages/NotFound.js" className="flex justify-center items-center min-h-[80vh]">
      <Result
        data-easytag="id2-react/src/pages/NotFound.js"
        status="404"
        title="404"
        subTitle="Извините, страница, которую вы ищете, не существует."
        extra={
          <Link to="/">
            <Button data-easytag="id3-react/src/pages/NotFound.js" type="primary" size="large">
              Вернуться на главную
            </Button>
          </Link>
        }
      />
    </div>
  );
};

export default NotFound;
