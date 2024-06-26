
import { DateTime } from 'luxon';


import {product_modal_state} from '$lib/store/product/state';

import {table_state} from '$lib/store/common/state';



import {productModalOpen} from '$lib/store/product/function';

import { carModalOpen } from '$lib/store/car/function';

import { companyModalOpen } from '$lib/store/company/function';
import { phoneNumber,businessNumber,updateSupplyPrice } from './function';

import { userModalOpen} from '$lib/store/user/function';

import { userOrderModalOpen,updateUserOrder,deleteUserOrder} from '$lib/store/user_order/function';









var addIcon = function(cell:any, formatterParams:any, onRendered:any){ //plain text value
    return "<i class='fa fa-print'></i>";
};

let table_data : any;



const TABLE_HEADER_LIST_FILTER : any = {
    type : {"채소류" : "채소류","김치":"김치","수산물":"수산물","육류":"육류","젓갈":"젓갈","건어물":"건어물","냉동":"냉동","일회용품":"일회용품","공산품":"공산품","기타":"기타"}
    
   
}






table_state.subscribe((data : any) => {
    table_data = data;
  })
  

const LOGIN_ALERT = {
    type : 'success',
    title : '로그인',
    content : '로그인에 실패했습니다. 계정 및 비밀번호를 확인해주십시오,',
    
}

const DATA_SUCCESS_ALERT = {
    color : 'blue',
    data : [{
        title : '저장', 
        content : '데이터 저장에 성공했습니다.',
    },
    {
        title : '수정', 
        content : '데이터 수정에 성공했습니다.',
    },
    {
        title : '삭제', 
        content : '데이터 삭제에 성공했습니다.',
    }]
}


const DATA_FAIL_ALERT = {
    color : 'red',
    add : {title : '추가', content : '데이터 저장에 실패했습니다.'},

    update : {title : '수정', content : '데이터 수정에 실패했습니다.'},
    delete : {title : '삭제', content : '데이터 삭제에 실패했습니다.'},
    check_delete : {title : '선택 삭제', content : '데이터 선택 삭제에 실패했습니다.'},
    
}

const PROD_TYPE_ARRAY : any =  ["전체","채소류","김치","육류","수산물","젓갈","건어물","냉동","일회용품","공산품","기타"];



const DATA_SELECT_ALERT = {
    color : 'red',
    select : {title : '실패', content : '데이터를 1개 이상 선택해주세요.'},
}

const MENU = {
    info : [
        {name: '주문 하기', help: "고객이 주문을 하는 메뉴입니다."},
        {name: '주문 현황', help: "기간별 사용자가 주문한 현황을 확인하는 메뉴입니다."},
            
        {name: '마이페이지', help: "사용자의 정보를 수정하는 곳입니다."},
    
    ],
}


const TOAST_SAMPLE = {
   
    success : {type : 'success', value : false, counter : 2},
    fail : {type : 'fail', value : false, counter : 2}
    
}


const CLIENT_INFO = {  // 업체정보
   
    code  : "314-13-24575",
    company_name : "장안유통(대청254번)",
    name : "김옥병",
    address : "대전시 대덕구 오정동 705 대청254번",
    type : "도,소매",
    type2 : "음식재료",
    fax : "042-369-6892",

}




const TABLE_FILTER : any = {
    product : [
    {value : "all",name : "전체"},
    {value : "name", name : "상품명"},
    {value : "type", name : "분류"},
    {value : "company", name : "매입처"},
  
    ],
    
    car : [
        {value : "all",name : "전체"},
        {value : "name", name : "차량번호"},
    ],
    company : [
        {value : "all",name : "전체"},
        {value : "code", name : "사업자등록번호"},
        {value : "name", name : "매입처명"},
        {value : "phone", name : "연락처"},
        {value : "email", name : "이메일"},

        
    ],
    user : [
        {value : "all",name : "전체"},
        {value : "id", name : "ID"},
        {value : "car", name : "지정차량"},
        {value : "code", name : "사업자번호"},
        {value : "name", name : "이름"},
        {value : "email", name : "이메일"},
        {value : "phone", name : "연락처"},
    ],
    user_order : [
        {value : "all",name : "전체"},
        {value : "code", name : "사업자번호"},
        {value : "customer_name", name : "거래처명"},
        {value : "order_status", name : "주문상태"},
        {value : "price_status", name : "수금유무"},

        {value : "car", name : "지정차량"},
    ],
    user_order_sub : [
        {value : "all",name : "전체"},
        {value : "company", name : "매입처명"},
        {value : "name", name : "상품명"},
        {value : "type", name : "분류명"},
        {value : "car", name : "지정차량"},
        {value : "order_status", name : "주문상태"},
       
    ],
}

const EXCEL_CONFIG : any = {
    product : [
    {header: '번호코드', key: 'uid', width: 30},
    {header: '분류', key: "type", width: 30},
    {header: '상품명', key: 'name', width: 30},
   
   
    {header: '등록일', key: 'created', width: 30},
    ],
  
   
    car : [
        {header: '번호코드', key: 'uid', width: 30},
        {header: '차량번호', key: 'name', width: 30},
        {header: '등록일', key: 'created', width: 30},
    ],
    company : [
        {header: '번호코드', key: 'uid', width: 30},
        {header: '사업자등록번호', key: 'code', width: 30},
        {header: '회사명', key: 'name', width: 30},
        {header: '연락처', key: 'phone', width: 30},
        {header: '이메일', key: 'email', width: 30},
        {header: '등록일', key: 'created', width: 30},
    ],
    user : [
        {header: 'ID', key: 'id', width: 30},
        {header: '지정차량', key: 'car', width: 30},
        {header: '사업자등록번호', key: 'code', width: 30},
        {header: '회사명', key: 'customer_name', width: 30},
        {header: '대표자명', key: 'name', width: 30},
        {header: '연락처', key: 'phone', width: 30},
        {header: '이메일', key: 'email', width: 30},
        {header: '등록일', key: 'created', width: 30},
    ],
    user_product : [
        {header: '번호코드', key: 'uid', width: 30},
        {header: '분류', key: "type", width: 30},
        {header: '상품명', key: 'name', width: 150},
        {header: '개수', key: 'qty', width: 30},

        {header: '등록일', key: 'created', width: 30},
        ],
        user_order_sub : [
            {header: '매입처', key: 'company', width: 30},
            {header: '상품명', key: 'name', width: 150},  
            {header: '주문수량', key: 'qty', width: 30},  
            {header: '차량명', key: 'car', width: 30},
        
            ],
}; 


const TABLE_HEADER_CONFIG : any = {
    product : [
        {formatter:"rowSelection",width : 60, field: "selected", titleFormatter:"rowSelection", hozAlign:"center", headerSort:false, 
        cellClick:function(e : any, cell:any){
            cell.getRow().toggleSelect()
        }},
        {title:"ID", field:"uid", width:150, headerFilter:"input"},
        {title:"분류", field:"type", width:150, headerFilter:"input"},
      
        {title:"상품명", field:"name", width:500, headerFilter:"input", 
        formatter:function(cell : any){
            var value = cell.getValue();
        return "<span style='color:#3FB449; font-weight:bold;'>" + value + "</span>";
         },

        cellClick:function(e : any, cell:any){
            let row = cell.getRow();
            if(row){
                productModalOpen(row.getData(),"update");
            }else{
                
            }
            }
        },
        
        {title:"매입처", field:"company.name", width:150, headerFilter:"input"},
        {title:"등록일", field:"created", hozAlign:"center", sorter:"date",  headerFilter:"input", 
        formatter: function(cell : any, formatterParams: any, onRendered: any) {
            // Luxon을 사용하여 datetime 값을 date로 변환
            const datetimeValue = cell.getValue();
            const date = DateTime.fromISO(datetimeValue).toFormat("yyyy-MM-dd");
            return date;
        },
    }],


    car : [
        {formatter:"rowSelection",width : 60, field: "selected", titleFormatter:"rowSelection", hozAlign:"center", headerSort:false, 
        cellClick:function(e : any, cell:any){
            cell.getRow().toggleSelect()
        }},
        {title:"ID", field:"uid", width:150, headerFilter:"input"},
        {title:"차량번호", field:"name", width:150, headerFilter:"input", 
        formatter:function(cell : any){
            var value = cell.getValue();
        return "<span style='color:#3FB449; font-weight:bold;'>" + value + "</span>";
         },

        cellClick:function(e : any, cell:any){
            let row = cell.getRow();
           if(row){
            carModalOpen(row.getData(),"update");
           }else{
          
           }
        }
    },
        {title:"등록일", field:"created", hozAlign:"center", sorter:"date",  headerFilter:"input", 
        formatter: function(cell : any, formatterParams: any, onRendered: any) {
            // Luxon을 사용하여 datetime 값을 date로 변환
            const datetimeValue = cell.getValue();
            const date = DateTime.fromISO(datetimeValue).toFormat("yyyy-MM-dd");
            return date;
        },
    }],

    company : [
        {formatter:"rowSelection",width : 60, field: "selected", titleFormatter:"rowSelection", hozAlign:"center", headerSort:false, 
        cellClick:function(e : any, cell:any){
            cell.getRow().toggleSelect()
        }},
        {title:"ID", field:"uid", width:150, headerFilter:"input"},
        {title:"사업자번호", field:"code", width:150, headerFilter:"input",
        formatter:function(cell : any){
            var value = cell.getValue();
        return businessNumber(value);
         },
        },
        
        {title:"매입처명", field:"name", width:150, headerFilter:"input", 
        formatter:function(cell : any){
            var value = cell.getValue();
        return "<span style='color:#3FB449; font-weight:bold;'>" + value + "</span>";
         },

        cellClick:function(e : any, cell:any){
            let row = cell.getRow();
           if(row){
            companyModalOpen(row.getData(),"update");
           }else{
          
           }
        }
    },
        
    {title:"연락처", field:"phone", width:150, headerFilter:"input", formatter:function(cell : any){
        var value = cell.getValue();
    return phoneNumber(value);
     }},
    {title:"이메일", field:"email", width:150, headerFilter:"input"},

        {title:"등록일", field:"created", hozAlign:"center", sorter:"date",  headerFilter:"input", 
        formatter: function(cell : any, formatterParams: any, onRendered: any) {
            // Luxon을 사용하여 datetime 값을 date로 변환
            const datetimeValue = cell.getValue();
            const date = DateTime.fromISO(datetimeValue).toFormat("yyyy-MM-dd");
            return date;
        },
    }],

   

   user_product : [
    {formatter:"rowSelection",width : 60, field: "selected", titleFormatter:"rowSelection", hozAlign:"center", headerSort:true, 
    cellClick:function(e : any, cell:any){
        cell.getRow().toggleSelect();
        console.log(cell.getRow());
    }},
    {title:"분류", field:"type.name", width:150, headerFilter:"list",headerFilterParams:{values:TABLE_HEADER_LIST_FILTER['type']}, clearable:true},
     
    {title:"상품명", field:"name", width:250, headerFilter:"input", 
    formatter:function(cell : any){
        var value = cell.getValue();
    return "<span style='color:#3FB449; font-weight:bold;'>" + value + "</span>";
     },
    },
    {title:"수량", field:"qty", width:90, editor : "input"},

   ],

   user_order : [
    {formatter:"rowSelection",width : 60, field: "selected", titleFormatter:"rowSelection", hozAlign:"center", headerSort:false, 
    cellClick:function(e : any, cell:any){
        cell.getRow().toggleSelect()
    }},
    {title:"ID", field:"uid", width:150, headerFilter:"input"},
    {title:"사업자번호", field:"user.code", width:150, headerFilter:"input",
    formatter:function(cell : any){
        var value = cell.getValue();
    return businessNumber(value);
     },
    },
    {title:"거래처명", field:"user.customer_name", width:150, headerFilter:"input", 
    formatter:function(cell : any){
        var value = cell.getValue();
    return "<span style='color:#3FB449; font-weight:bold;'>" + value + "</span>";
     },

    cellClick:function(e : any, cell:any){
        let row = cell.getRow();
       if(row){
        userOrderModalOpen(row.getData(),"update");
       }else{
      
       }
    }
    },

    {title:"주문상태", field:"order_status", width:150, headerFilter:"input"},
    {title:"수금유무", field:"price_status", width:150, headerFilter:"input"},
 

    {title:"주문총액", field:"totalSupplyPrice", width:150, editor : "input",formatter: "money",  
    
    formatterParams: {    
        thousand:",",
        symbol:"원",
        symbolAfter:"p",
        precision:false,
    },
    bottomCalc:"sum", bottomCalcFormatter: "money", // 합계 포매터 지정
    bottomCalcFormatterParams: {
        thousand: ",",
        symbol: "원",
        symbolAfter: "p",
        precision: false,
      },


},

    {title:"등록일", field:"created", hozAlign:"center", sorter:"date",  headerFilter:"input", 
        formatter: function(cell : any, formatterParams: any, onRendered: any) {
            // Luxon을 사용하여 datetime 값을 date로 변환
            const datetimeValue = cell.getValue();
            const date = DateTime.fromISO(datetimeValue).toFormat("yyyy-MM-dd");
            return date;
        },
    },
],

    user_order_sub_list : [
       
        {title:"상품명", field:"name",  
        width:150,
     
        //frozen:true, 
        tooltip: true, // 특정 열에 대한 툴팁 설정
        formatter:function(cell : any){
            var value = cell.getValue();
        return "<div style='overflow: visible; white-space:normal;'><span style='color:black; font-weight:bold; '>" + value + "</span></div>";
         },
    
         
 

        },
        // {
        //     title: "클릭",
        //     headerSort: false,
        //     formatter: function (cell:any, formatterParams:any, onRendered:any) {
        //         var row = cell.getRow();
        //         var rowData = row.getData();
                
        //         // "+" 아이콘 버튼
        //         var plusButton = document.createElement("button");
        //         plusButton.innerHTML = "<i class='fas fa-plus'></i>"; // Font Awesome 등의 아이콘을 사용하는 예시
        //         plusButton.classList.add("icon-button"); // 아이콘 버튼에 클래스 추가
        //         plusButton.addEventListener("click", function () {
        //             let add_qty = parseInt(rowData.qty) + 1;
        //             row.update({qty : add_qty});
        //             updateUserOrder(cell);
        //         });
            
        //         // "-" 아이콘 버튼
        //         var minusButton = document.createElement("button");
        //         minusButton.innerHTML = "<i class='fas fa-minus'></i>"; // Font Awesome 등의 아이콘을 사용하는 예시
        //         minusButton.classList.add("icon-button"); // 아이콘 버튼에 클래스 추가
        //         minusButton.addEventListener("click", function () {
        //             let minus_qty = Math.max(0, parseInt(rowData.qty) - 1); // 최소값은 0으로 설정
        //             row.update({qty : minus_qty});
        //             updateUserOrder(cell);
        //         });
            
        //         var container = document.createElement("div");
        //         container.style.display = "flex"; // 아이콘 버튼들을 가로로 나란히 표시하기 위해 Flexbox 사용
        //         container.style.justifyContent = "space-between"; // 좌우로 간격 주기
        //         container.style.margin = "0 5px"; // 좌우 마진 5px 주기
        //         container.appendChild(plusButton);
        //         container.appendChild(minusButton);
             
        //         return container;
        //     }

        // },
         {title:"수량", field:"qty", width:100, editor : "input",formatter: "money",  formatterParams: {
          
            thousand:",",
            precision:false,

        },cellEdited: updateUserOrder},
       
        

    
       ],
       user_order_sub2_list : [
       
        {title:"상품명", field:"name",  
        width:100,
   
        tooltip: true, // 특정 열에 대한 툴팁 설정
        formatter:function(cell : any){
            var value = cell.getValue();
        return "<div style='overflow: visible; white-space:normal;'><span style='color:black; font-weight:bold; '>" + value + "</span></div>";
         },
    
         
 

        },
        {title:"수량", field:"qty", width:100, editor : "input",formatter: "money",  formatterParams: {
          
            thousand:",",
            precision:false,

        }},

     
        {title:"삭제", field:"delete", width:100,  
        formatter:function(cell : any){
           
        return "<span style='color:red; font-weight:bold;'>삭제</span>";
        },
        cellClick:function(e : any, cell:any){
            let row = cell.getRow();
        if(row){
            deleteUserOrder(row);
        }else{
        
        }
        }
        },
       ],

       user_order_sub: [
        {title:"상품명", field:"product.name", headerFilter:"input", 
        formatter:function(cell : any){
            var value = cell.getValue();
            return "<div style='overflow: visible; white-space:normal;'><span style='color:black; font-weight:bold; '>" + value + "</span></div>";
         }
        },
       
        {title:"수량", field:"qty", width:100, editor : "input",formatter: "money",  formatterParams: {
          
            thousand:",",
            precision:false,

        }},
       ],


}


let TABLE_COMPONENT : any = "example-table-theme";


const TABLE_TOTAL_CONFIG : any = {
    layout: "fitDataTable",
    pagination:"local",
  
    paginationSize:500,
   
    movableColumns:true,
    paginationCounter:"rows",
    paginationAddRow:"table", //add rows relative to the table
    height : "50vh",
    locale: "ko-kr",
    langs:{
        "ko-kr":{
            "columns":{
                // "name":"Name",
                 //replace the title of column name with the value "Name"
            
            },
            "data":{
                "loading":"Loading", //data loader text
                "error":"Error", //data error text
            },
            "groups":{ //copy for the auto generated item count in group header
                "item":"item", //the singular  for item
                "items":"items", //the plural for items
            },
            "pagination":{
            	"page_size":"행 개수", //label for the page size select element
                "page_title":"Show Page",//tooltip text for the numeric page button, appears in front of the page number (eg. "Show Page" will result in a tool tip of "Show Page 1" on the page 1 button)
                "first":"처음", //text for the first page button
                "first_title":"첫 페이지", //tooltip text for the first page button
                "last":"뒤 페이지",
                "last_title":"뒤 페이지",
                "prev":"이전",
                "prev_title":"이전 페이지",
                "next":"다음",
                "next_title":"다음 페이지",
                "all":"전체",
                "counter":{
                    "showing": "보여지기",
                    "of": "중",
                    "rows": "행",
                    "pages": "pages",
                }
            },
            
        }
    },
    rowFormatter:function(row : any){
        row.getElement().classList.add("table-primary"); //mark rows with age greater than or equal to 18 as successful;
     
  },

   
  
  
    
}






export {
    LOGIN_ALERT,
    DATA_SELECT_ALERT,
    DATA_SUCCESS_ALERT,
    DATA_FAIL_ALERT,
    MENU,
    TOAST_SAMPLE,
    TABLE_TOTAL_CONFIG,
    TABLE_HEADER_CONFIG,
    TABLE_COMPONENT,
    TABLE_FILTER,
    EXCEL_CONFIG,
    CLIENT_INFO,
    PROD_TYPE_ARRAY
}


