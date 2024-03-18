import { useState } from "react";
import axios from "axios";


function ContactUs() {

    const [ccblist, setCcblist] = useState([])


    return(
        <>
        <div className="flex flex-row">
            <div className='text-3xl mt-10 font-medium'>1:1문의하기 창입니다.</div>
            <table>
                <colgroup>
                    <col width="70px"/><col width="500px"/><col width="100px"/><col width="150px"/>
                </colgroup>
                <thead>
                <tr>
                    <th>번호</th><th>제목</th><th>조회수</th><th>작성자</th>
                </tr>
                </thead>
            </table>
        </div>
        </>
    );
}

export default ContactUs;