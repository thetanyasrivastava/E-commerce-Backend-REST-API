const { Cart } = require("../models/Cart");

async function addProductToCart(req, res) {
  try {
    const { productId, quantity } = req.body;

    // 1. Find the user's cart
    let cart = await Cart.findOne({ user: req.user.id });

    // 2. If cart does NOT exist → create new one
    if (!cart) {
      cart = new Cart({
        user: req.user.id,
        items: [
          {
            product: productId,
            quantity: Number(quantity),
          },
        ],
      });
    } else {
      // 3. Cart exists → check if product already in cart
      const existingItem = cart.items.find(
        (item) => item.product.toString() === productId
      );

      if (existingItem) {
        // 4. Product exists → increase quantity
        existingItem.quantity += Number(quantity);
      } else {
        // 5. Product does NOT exist → add new item
        cart.items.push({
          product: productId,
          quantity: Number(quantity),
        });
      }
    }

    // 6. Save cart to MongoDB
    await cart.save();

    // 7. Send response
    res.status(200).json({
      message: "Product added to cart",
      cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}


async function getMyCart(req, res) {
    try{
    const userId = req.user.id;

    let cart = await Cart.findOne({ user: userId }).populate("items.product");

    if(!cart) {
        return res.status(200).json({ 
                message: "Cart is empty",
                items: []
        })
    }

    const shapedItems = cart.items.map((item) => ({
      product: {
        id: item.product.id,
        name: item.product.name,
        price: item.product.price
      },
      quantity: item.quantity
    }));


    const totalItems = cart.items.reduce(
      (sum, item) => sum + item.quantity,
       0
    );

  const totalPrice = cart.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
       0
    );


    res.status(200).json({ 
        user: userId,
        items: shapedItems,
        totalItems,
        totalPrice
    })
    }catch (error) {
        res.status(500).json({ error: "Server error" });
    }
}


async function decreaseCartItem(req,res) {
  try{
    const { productId } = req.body;

    let cart = await Cart.findOne({ user: req.user.id });

    if(!cart) {
      return res.status(404).json({ 
        message: "Cart is empty"
      })

    }
      const item = cart.items.find(
        (item) => item.product.toString() === productId
      );

    if(!item){
      return res.status(404).json({
        message: "Product not found in cart"
      });
    }
    
      if(item.quantity > 1){
        item.quantity -= 1
      } else{
        cart.items = cart.items.filter(
          (item) => item.product.toString() !== productId
        );
    }

    await cart.save();

    res.status(200).json({
      message: "Cart updated",
      cart
    });
    

  }catch (error) {
    res.status(500).json({error: "Server error" })
  }
}



async function removeProductFromCart(req, res) {
  try{
    const { productId } = req.params;

    let cart = await Cart.findOne({ user: req.user.id });

    if(!cart) {
      return res.status(404).json({ 
        message: "Cart is empty"
      });
    }

    const item = cart.items.find(
      (item) => item.product.toString() === productId
      );

    if(!item){
      return res.status(404).json({
        message: "Product not found in cart"
      });
    }else{
      cart.items = cart.items.filter(
        (item) => item.product.toString() !== productId
      )
    }

    await cart.save();

    res.status(200).json({
      message: "Cart updated",
      cart
    });

  }catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}



async function clearCart(req, res) {
  try{

    let cart = await Cart.findOne({ user: req.user.id });

    if(!cart) {
      return res.status(200).json({ 
        message: "Cart already empty"
      });
    }else{
      cart.items = [];
    }

    await cart.save();
    
    res.status(200).json({
      message: "Cart updated",
      cart
    });


  }catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}


module.exports = {
  addProductToCart,
  getMyCart,
  decreaseCartItem,
  removeProductFromCart,
  clearCart,
};