
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
// import { Component, useEffect, useState, createContext,useRef } from 'react';
// import { useNavigate } from 'react-router-dom'; // location.href
// import axios from 'axios';
// import { react } from '@babel/types';
// // import { Checkbox } from '@mui/material';
// import React from 'react';
// import './powrite.css';

// const Powrite = () => {
//     const CheckboxContext = createContext();

//     const [powrite, setPowrite] = useState([]);  

//     const [modalOpen, setModalOpen] = useState(false);

//     const modalBackground = useRef();

//     // 검색
//     const [choice, setChoice] = useState("");
//     const [search, setSearch] = useState("");

//     const getPowrite = (c,s) => {
//         axios.get("http://localhost:8080/powrite", 
//                     {params:{ choice:c, search:s }})
//                     .then(function(resp){  // success:function
//                         console.log(resp.data.powrite);
//                         setPowrite(resp.data);
//                      })
//                      .catch(function(err){     // error:function
//                         alert('error');
//              })
//              .catch((err)=>{
//                 alert('error');
//              })
//     }

//     useEffect(function(){
//         getPowrite('', '');
//     }, []);

//     function searchBtn(){        
//         // choice, search 검사
//         if(choice === ''){
//             alert('카테고리를 선택해 주십시오');
//             return;
//         }   
//       getPowrite(choice, search);
//     }  

//     const Product_list = [powrite.categoryName, powrite.name]

//     function Product() {    

//         const [checkedList, setCheckedList] = useState([]); // 데이터를 넣을 빈 배열

//         // onChange함수를 사용하여 이벤트 감지, 필요한 값 받아오기
//         const onCheckedElement = (checked, item) => {
//             if(checked) {
//                 setCheckedList([...checkedList, item]); 
//             }else if(!checked){
//                 setCheckedList(checkedList.filter(el => el !== item));
//             }
//         };

//         // onChange함수를 사용하여 이벤트 감지, 필요한 값 받아오기
//         const onRemove = item => {
//             setCheckedList(checkedList.filter(el => el !== item));
//         };


        
//     }

//     return(
//         <div>
//             <table style={{ marginLeft:"auto", marginRight:'auto', marginTop:"3px", marginBottom:"3px" }}>
//                 <tbody>
//                     <tr>
//                         <td style={{ paddingLeft:"3px" }}>
//                             <select className='custom-select' value={choice} onChange={(e)=>{setChoice(e.target.value)}}>
//                             <option value="name">상품명</option>
//                             </select>
//                         </td>
//                         <td style={{ paddingLeft:"5px"}} className='align-middle'>
//                             <input className='form-control' placeholder='상품명을 입력하세요' 
//                                 value={search} onChange={(e)=>{setSearch(e.target.value)}} />
//                         </td>
//                         <td style={{ paddingLeft:"5px" }}>  
//                             <button className='btn btn-primary' onClick={searchBtn}>검색</button>
//                         </td>
//                     </tr>                
//                 </tbody>    
//             </table>
//             <h1>신청가능 품목</h1>
    
//             {Product_list}<Checkbox value="" onClick={() => setModalOpen(true)}></Checkbox>
//             {
//                 modalOpen &&
//                 <div className={'modal-container'} ref={modalBackground} onClick={e => {
//                     if (e.target === modalBackground.current){
//                         setModalOpen(false);
//                     }
//                 }}>
//                     <div className={'modal-content'}>
//                     <button className={'modal-close-btn'} onClick={() => setModalOpen(false)}>
//                         모달 닫기
//                     </button>
//                     </div>
//                 </div>    
//             }
//         </div>
//     )
// }
// export default Powrite;