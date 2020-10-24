const totalCart = (allProducts) => {
    let totalMemo = 0; // accumulator
    allProducts.map(product => 
      totalMemo += parseFloat(product.price) * parseFloat(product.quantity)
      // équivaut: totalMemo = totalMemo +  parseFloat(product.price) * parseFloat(product.quantity)
    )
    return totalMemo
}

export default totalCart;