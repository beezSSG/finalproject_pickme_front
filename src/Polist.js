import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination'; // npm i react-js-pagination
import axios from 'axios';


function Polist(){
    const [polist, setPolist] = useState([]);

    // 검색
    const [choice, setChoice] = useState("");
    const [search, setSearch] = useState("");

    // 페이징
    const [page, setPage] = useState(1);
    const [totalCnt, setTotalCnt] = useState(0);

    function getPolist(c, s, pn){
        axios.get("http://localhost:8081/polist", 
                    {params:{ choice:c, search:s, pageNumber:pn}})
             .then(function(resp){  // success:function
                console.log(resp.data.polist);
                setPolist(resp.data.polist);
                setTotalCnt(resp.data.cnt); // 글의 총수
             })
             .catch(function(err){     // error:function
                alert('error');
             })
    }

    useEffect(function(){
        getPolist('', '', 0);
    }, []);

    function searchBtn(){        
        // choice, search 검사
        if(choice === ''){
            alert('카테고리를 선택해 주십시오');
            return;
        }

        getPolist(choice, search, 0);
    }

    function handlePageChange(page){
        setPage(page);
        getPolist(choice, search, page-1);
    }

    return(
        <div>
            <table style={{ marginLeft:"auto", marginRight:'auto', marginTop:"3px", marginBottom:"3px" }}>
            <tbody>
                <tr>
                    <td style={{ paddingLeft:"3px" }}>
                        <select className='custom-select' value={choice} onChange={(e)=>{setChoice(e.target.value)}}>
                           <option value="name">상품명</option>
                           <option value="wdate">발주 일자</option>
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

            <br/>

            <table className='table table-hover'>
            <colgroup>
                <col width="70"/><col width="500"/><col width="100"/><col width="150"/>
            </colgroup>

            <thead>
            <tr>
                <th>번호</th><th>대표 이미지</th><th>상품명</th><th>수량</th><th>발주 일자</th><th></th>
            </tr>
            </thead>

            <tbody>
            {
                polist.map(function(po, i){
                   return(
                        <TableRow po={po} rownum={i+1} key={i} />
                   );     
                })
            }
            </tbody>
            </table>

            <br/>
            {/* https://mui.com/material-ui/react-pagination/ */}
            {/* 첫번째와 두번째의 경우 */}
            {/*             
            <Pagination 
                activePage={page}
                itemsCountPerPage={10}
                totalItemsCount={totalCnt}
                pageRangeDisplayed={10}
                prevPageText={"이전"}
                nextPageText={"다음"}
                onChange={handlePageChange}/>
             */}

            {/* 세번째의 경우 */}     
            <Pagination
               itemClass='page-item'
               linkClass='page-link' 
               activePage={page}
               itemsCountPerPage={10}
               totalItemsCount={totalCnt}
               pageRangeDisplayed={10}
               prevPageText={"prev"}
               nextPageText={"next"}
               onChange={handlePageChange} />

        <div className='my-5 d-flex justify-content-center'>
            <Link className='btn btn-primary' to="/powrite">발주신청</Link>
        </div>       

        <br/><br/><br/><br/>

        </div>
    );
}

function TableRow(props){
    return(
        <tr>
            <th>{ props.rownum }</th>
            <td className='underline'>
                <Link to={`/bbsdetail/${props.bbs.seq}`}>{ props.bbs.title }</Link>
            </td>           
            <td>{ props.bbs.readcount }</td>
            <td>{ props.bbs.id }</td>
        </tr>
    )
}



export default Polist;