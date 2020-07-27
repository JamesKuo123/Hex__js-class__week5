

new Vue({
    el: '#app',
    data: {
        products: [],
        tempProduct: {
        },
        status: {
            loadingItem: '',
        },
        form: {
            name: '',
            email: '',
            tel: '',
            address: '',
            payment: '',
            message: '',
        },
        cart: [],
        cartTempProduct: {
        },
        cartTotal: 0,
        isLoading: false,
        isNew: true,
        uuid: 'c1755f54-f16e-4c43-9219-49017fb1e8e8',
    },
    methods: {
        renderProducts(page = 1) {
            let api = `https://course-ec-api.hexschool.io/api/${this.uuid}/ec/products?page=${page}`;
            this.isLoading = true;
            axios.get(api).then((response) => {
                this.products = response.data.data;
                this.isLoading = false;
            });
        },
        renderCart(completeMsg) {
            let api = `https://course-ec-api.hexschool.io/api/${this.uuid}/ec/shopping`;
            this.isLoading = true;
            axios.get(api).then((response) => {
                this.cart = response.data.data;
                this.cartTotal = 0;
                this.cart.forEach(element => {
                    this.cartTotal += (element.product.price * element.quantity);
                });
                this.isLoading = false;

                if (completeMsg !== undefined) {
                    alert(completeMsg);
                };
            });
        },
        triggerCartFunction(productID, itemQuantity = 1) {
            let api = `https://course-ec-api.hexschool.io/api/${this.uuid}/ec/shopping`;
            this.cartTempProduct.product = productID;
            this.cartTempProduct.quantity = itemQuantity;
            this.cart.forEach(element => {
                if (element.product.id == productID) {
                    this.isNew = false;
                    this.cartTempProduct.quantity = element.quantity + itemQuantity;
                    if (this.cartTempProduct.quantity == 0) {
                        this.deleteFromCart(productID);
                    } else {
                        this.updateQuantityInCart(this.cartTempProduct);
                    }
                };
            });
            if (this.isNew) {
                this.addToCart(this.cartTempProduct);
            };
            this.isNew = true;
        },
        addToCart(newProduct) {
            let api = `https://course-ec-api.hexschool.io/api/${this.uuid}/ec/shopping`;
            this.isLoading = true;
            axios.post(api, newProduct).then(() => {
                this.renderCart('This product is put into your cart successfully.');
            });
        },
        updateQuantityInCart(updatingProduct) {
            let api = `https://course-ec-api.hexschool.io/api/${this.uuid}/ec/shopping`;
            this.isLoading = true;
            axios.patch(api, updatingProduct).then(() => {
                this.renderCart('Product already in cart. Updated successfully.');
            });
        },
        deleteFromCart(productID) {
            if (confirm('Are you sure to remove this product from cart?')) {
                let api = `https://course-ec-api.hexschool.io/api/${this.uuid}/ec/shopping/${productID}`;
                this.isLoading = true;
                axios.delete(api).then(() => {
                    this.renderCart('Product already remove from cart.');
                });
            };
        },
        clearCart() {
            if (confirm('Are you sure to REMOVE ALL product from cart?')) {
                let api = `https://course-ec-api.hexschool.io/api/${this.uuid}/ec/shopping/all/product`;
                this.isLoading = true;
                axios.delete(api).then(() => {
                    this.renderCart('Cart cleared');
                });
            }
        },
        openDetailModal(product, productimg) {
            this.tempProduct = JSON.parse(JSON.stringify(product));
            this.tempProduct.tempimg = productimg;
            $('#productDetailModal').modal('show');
        },
        createOrder() {
            alert('order submitted.')
        },
    },
    created() {
        this.renderProducts();
        this.renderCart();
    },
});


// {
//     "id": "zvEyZQna0xHdX3NPqNSU01SGgFGaNHXDLS66kO4IXUqT5toSOvIsHq38QtPEKbGL",
//     "title": "asd",
//     "category": "asd",
//     "content": "qwe",
//     "imageUrl": [
//       "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
//     ],
//     "enabled": true,
//     "origin_price": 5235,
//     "price": 235235,
//     "unit": "asd"
//   },

// 刪除、品茗、數量、單位、單價