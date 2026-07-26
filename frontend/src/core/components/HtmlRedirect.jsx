import React, { useEffect } from 'react';

export const HtmlRedirect = ({ to }) => {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);
  return null;
};
