import axios from "axios";

var url = 'http://localhost:8080/';

const product = {
  id: '624245763a825749587431b9',
  timestamp: '20:32:06',
  name: 'Jordan 1 J Balvin',
  description: 'colores',
}

const idProduct = "624245b53a825749587431bb"

//getAll
axios.get(url + 'api/products')
  .then((response) => {
      console.log(response.data)
  }).catch((error) => {
      console.log(error)
})

//getById
axios.get(url + 'api/products/'+ idProduct)
  .then((response) => {
      console.log(response.data)
  }).catch((error) => {
      console.log(error)
})

//update
axios.put(url + 'api/products', product)
  .then((response) => {
      console.log(response.data)
  }).catch((error) => {
      console.log(error)
})

//delete
// axios.delete(url + 'api/products/'+ idProduct)
//   .then((response) => {
//       console.log(response.data)
//   }).catch((error) => {
//       console.log(error)
// })
