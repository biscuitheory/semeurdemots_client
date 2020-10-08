import React from 'react';

const API = process.env.REACT_APP_API_URL;
console.log(API);

const AddProductForm = () => {
  return (
    <div className="addproduct_container">
      <form className="addproduct_container-form">
        <div className="addproduct_container-form-type">
          <label>Type de produit</label>
          <input placeholder="Nom du produit"></input>
        </div>
        <div>
          <div className="addproduct_container-form-type-option">
            <input
              type="radio"
              name="type"
              className="addproduct_container-form-type-"
              value="Livre"
            ></input>
            <label>Livre</label>
          </div>
          <div className="addproduct_container-form-type-option">
            <input type="radio" name="type" value="Produit dérivé"></input>
            <label>Produit dérivé</label>
          </div>
        </div>
        <div>
          <label>Prix</label>
          <input placeholder="Prix"></input>
        </div>
        <div>
          <label>Stock</label>
          <input placeholder="Stock"></input>
        </div>
        <div>
          <label>Description</label>
          <input placeholder="Description"></input>
        </div>
        <div>
          <label>Image</label>
          <input placeholder="Image"></input>
        </div>
        <button>Enregistrer</button>
      </form>
    </div>
  );
};

export default AddProductForm;
