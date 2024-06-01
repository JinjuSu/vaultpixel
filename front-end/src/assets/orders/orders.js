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

[
  {
    orderId: "00001",
    id: "mrANj8GsfiOEjTPD3yiTwTqJAjQ2",
    cartItems: ["2", "6", "12"],
    totalPrice: 2788.98,
    address: {
      firstname: "Mark",
      lastname: "Micheals",
      street: "Queens Lane",
      post: 32000,
      state: "Sydney",
      counrty: "Australia",
    },
    cardDetails: {
      firstname: "Mark",
      lastname: "Micheals",
      cardNumber: "5200828282828210",
      cardType: "MasterCard",
      expiryDate: "09/2034",
      cvv: "888",
    },
  },
  {
    orderId: "00002",
    id: "uTbPn7JNkqlEfgAH5yoHgNwVAqP1",
    cartItems: ["1", "4", "9"],
    totalPrice: 1499.5,
    address: {
      firstname: "Anna",
      lastname: "Smith",
      street: "Baker Street",
      post: 56001,
      state: "Melbourne",
      counrty: "Australia",
    },
    cardDetails: {
      firstname: "Anna",
      lastname: "Smith",
      cardNumber: "4111111111111111",
      cardType: "Visa",
      expiryDate: "05/2031",
      cvv: "123",
    },
  },
  {
    orderId: "00003",
    id: "vkLpW4QsdrOYkhBR1ziTgBnJAkR3",
    cartItems: ["3", "7", "10"],
    totalPrice: 1987.75,
    address: {
      firstname: "John",
      lastname: "Doe",
      street: "Elm Street",
      post: 45002,
      state: "Brisbane",
      counrty: "Australia",
    },
    cardDetails: {
      firstname: "John",
      lastname: "Doe",
      cardNumber: "6011000990139424",
      cardType: "Discover",
      expiryDate: "11/2032",
      cvv: "456",
    },
  },
  {
    orderId: "00004",
    id: "xMnVb6RyuupQigCM2xoJtTjUAlR4",
    cartItems: ["5", "8", "11"],
    totalPrice: 2578.25,
    address: {
      firstname: "Jane",
      lastname: "Brown",
      street: "Maple Avenue",
      post: 67003,
      state: "Perth",
      counrty: "Australia",
    },
    cardDetails: {
      firstname: "Jane",
      lastname: "Brown",
      cardNumber: "378282246310005",
      cardType: "American Express",
      expiryDate: "02/2030",
      cvv: "789",
    },
  },
];
