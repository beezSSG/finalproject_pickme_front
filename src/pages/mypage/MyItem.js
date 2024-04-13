import axios from "axios";

const MyItem = ({ item, cart, setCart }) => {
  
  const { url, price, id, quantity, name} = item; // 아이템 내부 정보

  const plusQuantity = async () => {
    await axios.post("http://localhost:8080/api/v1/customer/cart/getCart", null,
      { "quantity" : (quantity + 1), }
    )
    .then((response)=>{
      console.log(response.data);
      setCart(response.data);
    })
    .then(async (res) => {
      if (res.ok) {
      await axios.get("customer/cart/changeQuantity")
      .then((response)=>{
        console.log(response.data);
        setCart(response.data);
      })
      .catch((err)=>{
        alert(err);
      })}
    })
    .catch((err)=>{
      alert(err);
    })
  }

  /*
  const plusQuantity = () => {
    fetch(`http://localhost:8080/api/v1/carts/${cart_id}`, {
      method: 'PATCH',
      headers: {
        Authorization: localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        quantity: quantity + 1,
      }),
    }).then(res => {
      if (res.ok) {
        fetch('http://localhost:8080/carts', {
          method: 'GET',
          headers: {
            Authorization: localStorage.getItem('jwt'),
          },
        })
          .then(res => res.json())
          .then(data => {
            setItemList(data.results);
          });
      }
    });
  };
  */

  const minusQuantity = () => {
    if (quantity === 1) {
      alert('물건의 최소수량은 1개입니다.');
    } else {
      fetch(`http://localhost:8080/carts/${cart_id}`, {
        method: 'PATCH',
        headers: {
          Authorization: localStorage.getItem('jwt'),
        },
        body: JSON.stringify({
          quantity: quantity - 1,
        }),
      }).then(res => {
        if (res.ok) {
          fetch('http://10.58.3.71:8000/carts', {
            method: 'GET',
            headers: {
              Authorization: localStorage.getItem('jwt'),
            },
          })
            .then(res => res.json())
            .then(data => {
              setItemList(data.results);
            });
        }
      });
    }
  };

  const deleteItem = () => {
    fetch(`http://10.58.3.71:8000/carts/${cart_id}`, {
      method: 'DELETE',
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
  };

  return (

    <tr key={cart.id} className="h-28 border-b-2">
      <td className="cartbox text-center ">
        <input type="checkbox" onChange={(e) => CheckHandler(e.target.checked, data.id)} checked={checkItems.includes(data.id) ? true : false} />
      </td>
      <td><img src={data.productUrl} className="w-[150px] " /></td>
      <td className="text-xl font-medium">{data.productName}</td>
      <td className="text-right text-lg">{data.productPrice}</td>
      <td className="text-right text-lg">{productTotalPrice}</td>
      <td className="text-center text-lg">
        <button onClick={() => {minusQuantity} }>-</button>
        &nbsp;{data.quantity}
        <button onClick={ () => {plusQuantity} }>+</button>
      </td>
      <td className="text-center"><button>X</button></td>
    </tr>

  //   <tr key={i} className="h-28 border-b-2">
  //   <td className="cartbox text-center ">
  //     <input type="checkbox" onChange={(e) => CheckHandler(e.target.checked, cart.id)} checked={checkItems.includes(cart.id) ? true : false} />
  //   </td>
  //   <td><img src={url} className="w-[150px] " /></td>
  //   <td className="text-xl font-medium">{name}</td>
  //   <td className="text-right text-lg">{price}</td>
  //   <td className="text-right text-lg">1</td>
  //   <td className="text-center text-lg">
  //     <button onClick={() => {minusQuantity} }>-</button>
  //     &nbsp;{quantity}
  //     <button onClick={ () => {plusQuantity} }>+</button>
  //   </td>
  //   <td className="text-center"><button>X</button></td>
  // </tr>
  );
};

export default MyItem();