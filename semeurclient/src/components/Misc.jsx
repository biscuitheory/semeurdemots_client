import React from 'react';

export default function InputCount(){
  return (
    <input
      type="number"
      id="tentacles"
      name="tentacles"
      min="1"
      max="100"
      placeholder="0"
      className="input-count"
    ></input>
  );
};

export function SubmitButton () {
  return <button className="submit-button">Ajouter au panier</button>;
};

export function TestText () {
  return <p>Test Text</p>;
};

 