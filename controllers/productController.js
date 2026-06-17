const { Product } = require("../models/Product");

async function showProducts (req,res) {

    try {
        const allProducts = await Product.find();
        res.status(200).json({
            message: "All Products",
            product: {
                allProducts,
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });    
    }

}


async function createProduct (req, res) {

    try {

        const newProduct = await Product.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
        });

        res.status(200).json({
        product: newProduct
     })

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" })
    }
    
}


async function updateProduct (req, res) {
    try{
        const productId = req.params.id;
        const updateData = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            updateData,
            { new: true } 
        );

        if(!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json({ 
            message: "Product updated successfully",
            product: updatedProduct,
         });

    }catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
   
}

async function deleteProduct (req, res) {
    try{

    const productID = req.params.id;

    const deletedProduct = await Product.findByIdAndDelete(
        productID
    )

    if(!deletedProduct){
        return res.status(404).json({ error: "Product not found" });
    }
    
    return res.status(200).json({
        message: "Product deleted successfully",
        product: deletedProduct.name,
    });

    }catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" })
    }

}

/*req.params.id → which product
req.body → new values
findByIdAndUpdate → update + save
{ new: true } → return updated version
*/


module.exports = { showProducts, createProduct, updateProduct, deleteProduct }
