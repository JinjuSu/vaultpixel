import { post } from "jquery";

const orders = [
  {
    orderId: "", // auto-incremented
    id: "mrANj8GsfiOEjTPD3yiTwTqJAjQ2", // this.user.uid
    cartItems: {},
    totalPrice: Number,
    address: {
      firstname: "",
      lastname: "",
      street: "",
      post: Integer,
      state: "",
      counrty: "",
    },
    cardDetails: {
      firstname: "",
      lastname: "",
      cardNumber: "",
      cardType: "",
      expiryDate: "",
      cvv: "",
    },
  },
];

const users = {
  id: "mrANj8GsfiOEjTPD3yiTwTqJAjQ2", // this.user.uid
  cartItems: {}, // submitted prudctIds
  orders: {}, // generated orderId from order table
};
