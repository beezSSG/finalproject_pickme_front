import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


function ContactUs() {

    let navigate = useNavigate();

    const [ccblist, setCcblist] = useState([])

    function ccblistup() {
        axios.get("http://localhost:8080/api/v1/manager/ccblist")
                .then(function(resp){
                     console.log(resp.data);
                     setCcblist(resp.data);
                })
                .catch(function(){
                    console.log("error");
                })
    }

    useEffect(() => {
        ccblistup();
    }, []);

    return(
        <>
        <div className="flex justify-center items-center">
            <div>
            <div className='text-3xl mt-10 font-medium text-center'>1:1문의하기 창입니다.</div>
                <table className="mt-4">
                    <colgroup>
                        <col width="50px"/><col width="100px"/><col width="500px"/><col width="150px"/><col width="150px"/>
                    </colgroup>
                    <thead>
                        <tr>
                            <th>번호</th><th>분류</th><th>제목</th><th>작성자</th><th>작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            ccblist.map((ccb, index) => {
                                return (
                                    <tr key={ccb.id} className="text-center">
                                        <th>{index+1}</th>
                                        <td>{ccb.category}</td>
                                       
                                        <td className="text-left">
                                            <Link to={`/contactusdetail/${ccb.id}`}>
                                                {ccb.title}
                                            </Link>
                                        </td>
                                        <td>{ccb.customerId}</td>
                                        <td>{ccb.createAt}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>

                <button onClick={()=>navigate("/contactuswrite")}>문의작성</button>
            </div>
        </div>
       </>
    );
}

export default ContactUs;