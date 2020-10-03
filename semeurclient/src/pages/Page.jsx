import React, { useEffect } from 'react';

const Page = (props) => {
  useEffect(() => {
    document.title = props.title || '';
  }, [props.title]);
  // console.log(props)
  return props.title;

};
export default Page;