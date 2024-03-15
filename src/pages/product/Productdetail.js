import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import axios from 'axios';

function Productdetail(){
    let params = useParams();
    let navigate = useNavigate();

    const [id, setId] = useState(''); // update, delete 버튼을 시각화할지 정하기 위해서  
    const [product, setProduct] = useState();

    // 받을 데이터를 읽어 들이는 처리가 끝났는지 확인
    const [loading, setLoading] = useState(false); 

    async function getProduct(id){
        await axios.get("http://localhost:8080/api/v1/product/productdetail", { params:{"id":id} })
            .then(function(resp){
             //   console.log(resp.data);
                setId(id);
                setProduct(resp.data);

                setLoading(true);
            })
            .catch(function(err){
                alert('error');
            })
    }

    useEffect(() => {

        getProduct(params.id);
    }, [params.id]);


    if(loading === false){
        return <div>loading...</div>;
    }

    return(
        <div align="center">
            <table className="table table-bordered" style={{textAlign:"center"}}>
            <colgroup>
                <col style={{ width:'150px' }}/>
                <col style={{ width:'500px' }}/>
            </colgroup>
            <tbody>
            <tr>
                <th></th>
                <td><img src={product.url} style={{ maxWidth: '400px', maxHeight: '400px', margin: '10px' }} /></td>
            </tr>
            <tr>
                <th>제품명</th>
                <td>{product.name}</td>
            </tr>
            <tr>
                <th>가격</th>
                <td>{product.price}</td>
            </tr>            
            </tbody>
            </table>

        </div>
    )
}

export default Productdetail;