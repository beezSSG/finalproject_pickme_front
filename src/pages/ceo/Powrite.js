import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './powrite.css';

const Powrite = () => {
    const [categoryList, setCategoryList] = useState([]);

    const [categoryName, setCategoryname] = useState([]);
    const [productName, setProductName] = useState([]);

    const [modalOpen, setModalOpen] = useState(false);
    const modalBackground = useRef();

    const [checkedList, setCheckedList] = useState([]);


    // 검색
    const [choice, setChoice] = useState("");
    const [search, setSearch] = useState("");

    const getPowrite = () => {
        axios.get("http://localhost:8080/powriteCn")
            .then(function(resp){
                console.log(resp.data); // 확인용
                setCategoryList(resp.data); // 받아온 데이터로 카테고리 목록 업데이트
                setCategoryname(resp.data.categoryName);
            })
            .catch(function(err){
                alert('error');
            })
    }

    useEffect(() => {
        getPowrite();
    }, []);

    function searchBtn(){        
        // choice, search 검사
        if(choice === ''){
            alert('카테고리를 선택해 주십시오');
            return;
        }   
      getPowrite(choice, search);
    }  

    // Checkbox가 선택되었을 때의 동작
            const onCheckedElement = (checked, item) => {
                if (checked) {
                  setCheckedList([...checkedList, item]);
                } else if (!checked) {
                  setCheckedList(checkedList.filter(el => el !== item));
                }
              }; 
              const onRemove = item => {
                setCheckedList(checkedList.filter(el => el !== item));
              };
            
    return(
        <div>
            <table style={{ marginLeft:"auto", marginRight:'auto', marginTop:"3px", marginBottom:"3px" }}>
                <tbody>
                    <tr>
                        <td style={{ paddingLeft:"3px" }}>
                            <select className='custom-select' value={choice} onChange={(e)=>{setChoice(e.target.value)}}>
                                <option value="name">상품명</option>
                            </select>
                        </td>
                        <td style={{ paddingLeft:"5px"}} className='align-middle'>
                            <input className='form-control' placeholder='상품명을 입력하세요' 
                                value={search} onChange={(e)=>{setSearch(e.target.value)}} />
                        </td>
                        <td style={{ paddingLeft:"5px" }}>  
                            <button className='btn btn-primary' onClick={searchBtn}>검색</button>
                        </td>
                    </tr>                
                </tbody>    
            </table>
            <h1>카테고리</h1>
    
            <div>

            </div>
        </div>
    )
}

export default Powrite;
