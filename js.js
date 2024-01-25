$("#no_show").hide();

function getData() {
  let masterNo = $("#master_no").text().trim();

  const data_Send = {};
  data_Send.menucode = "M000000042";
  data_Send.type = "get_data";
  data_Send.header = JSON.stringify({ masterNo: masterNo });
  $.ajax({
    type: "post",
    url: "/ajax.do",
    data: data_Send,
    async: false,
    success: function (response, status, request) {
      const { res_master, res_detail, sql1, sql } = JSON.parse(response.trim());
      // console.log({ res_master,res_detail,sql1,sql });
      let is_complete = "";
      let m_createdate = res_master[0].master_createdate || "";
      let mawb = res_master[0].master_no || "";
      let m_dest = res_master[0].master_destination || "";
      let flt_no = res_master[0].flight_no || "";
      let etd = res_master[0].etd || "";
      let etd_status = res_master[0].etd_status || "";
      let rate = res_master[0].rate || "";
      let remark = res_master[0].remark || "";
      let m_remark = "M Remark: " + res_master[0].master_remark || "";

      is_complete = `
                           <div id="title_table" style="display: flex">
                              <table style="height: 49px; width: 771px" border="1">
                                <tbody>
                                  <tr>
                                    <td style="width: 79px; text-align: center">TEAM</td>
                                    <td style="width: 79px; text-align: center">책임자</td>
                                    <td style="width: 89.3px; text-align: center">서류</td>
                                    <td style="width: 68.7px; text-align: center">면허</td>
                                    <td style="width: 79px; text-align: center">사전전송</td>
                                    <td style="width: 79px; text-align: center">CLP 마감</td>
                                    <td style="width: 79px; text-align: center">출력마감</td>
                                    <td style="width: 79px; text-align: center">적하</td>
                                    <td style="width: 79px; text-align: center">반입계</td>
                                  </tr>
                                  <tr>
                                    <td style="width: 79px; text-align: center"> </td>
                                    <td style="width: 79px; text-align: center"> </td>
                                    <td style="width: 89.3px; text-align: center">
                                      <strong> 파일업로드여부</strong>
                                    </td>
                                    <td style="width: 68.7px; text-align: center"><strong> </strong></td>
                                    <td style="width: 79px; text-align: center">
                                      <strong> 전송완료여부</strong>
                                    </td>
                                    <td id="CLP_id" style="width: 79px; text-align: center">
                                      <strong> </strong>
                                    </td>
                                    <td id="print_yn_id" style="width: 79px; text-align: center">
                                      <strong> </strong>
                                    </td>
                                    <td style="width: 79px; text-align: center">
                                      <strong> 전송완료여부</strong>
                                    </td>
                                    <td style="width: 79px; text-align: center">
                                      <strong> 제작여부</strong>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <div style="position: relative; white-space: nowrap">
                                <table style="height: 13px" border="0" width="185">
                                  <tbody>
                                    <tr>
                                      <td id="m_createdate" style="width: 175px; text-align: right">
                                        ${m_createdate}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            <table
                              id="data_table"
                              class="headergrid2"
                              style="height: 21px; width: 1373px"
                              border="1"
                            >
                              <tbody>
                                <tr style="height: 13px">
                                  <td style="width: 3%; height: 13px; text-align: center">
                                     <strong>MAWB#</strong>
                                  </td>
                                  <td id="mawb" style="width: 4%; height: 13px; text-align: center">
                                   ${mawb}
                                  </td>
                                  <td style="width: 6%; height: 13px; text-align: center">
                                    <strong>M/DEST</strong>
                                  </td>
                                  <td id="m_dest" style="width: 6%; height: 13px; text-align: center">
                                    ${m_dest}
                                  </td>
                                  <td style="width: 6%; height: 13px; text-align: center">
                                    <strong>FLT#</strong>
                                  </td>
                                  <td id="flt_no" style="width: 6%; height: 13px">
                                   ${flt_no}
                                  </td>
                                  <td style="width: 6%; height: 13px; text-align: center">
                                    <strong>ETD</strong>
                                  </td>
                                  <td id="etd" style="width: 8%; height: 13px">
                                 ${etd}
                                  </td>
                                  <td id="etd_status" style="width: 6%; height: 13px; text-align: center">
                                 ${etd_status}
                                  </td>
                                  <td style="width: 6%; height: 13px"> <strong>RATE</strong></td>
                                  <td id="rate" style="width: 6%; height: 13px; text-align: center">
                                    ${rate}
                                  </td>
                                  <td style="width: 2%; height: 13px"> </td>
                                  <td style="width: 6%; height: 13px">  <strong>Remark</strong></td>
                                  <td id="remark" style="width: auto; height: 13px; text-align: left" colspan="13">
                                   ${remark}
                                  </td>
                                </tr>
                                <tr class="rowsheader" style="height: 13px">
                                  <td id="m_remark" style="width: 5792px; height: 13px" colspan="17">
                                    <strong
                                      > ${m_remark}
                                    </strong>
                                  </td>
                                  <td style="width: 620px; height: 13px; text-align: center" colspan="2">
                                    <strong>MAWB 마감중량</strong>
                                  </td>
                                  <td id="sum-3" style="width: 294px; height: 13px; text-align: right">
                                     
                                  </td>
                                  <td id="sum-4" style="width: 265px; height: 13px; text-align: right">
                                     
                                  </td>
                                  <td style="width: 413px; height: 13px; text-align: center" colspan="2">
                                     
                                  </td>
                                </tr>
                                <tr id="tr_lv2" class="rowsheader" style="height: 13px">
                                  <td style="width: 212px; height: 13px"> </td>
                                  <td style="width: 187px; height: 13px; text-align: center">
                                    <strong>HAWB#</strong>
                                  </td>
                                  <td style="width: 265px; height: 13px; text-align: center">
                                    <strong>SHPR</strong>
                                  </td>
                                  <td style="width: 243px; height: 13px; text-align: center">
                                    <strong>CNEE</strong>
                                  </td>
                                  <td style="width: 243px; height: 13px; text-align: center">
                                    <strong>H/DEST</strong>
                                  </td>
                                  <td style="width: 492.281px; height: 13px; text-align: center">
                                    <strong>Q'ty</strong>
                                  </td>
                                  <td style="width: 530.719px; height: 13px; text-align: center">
                                    <strong>G/WT</strong>
                                  </td>
                                  <td style="width: 558px; height: 13px; text-align: center">
                                    <strong>V/WT</strong>
                                  </td>
                                  <td style="width: 262px; height: 13px; text-align: center">
                                    <strong>DIMS</strong>
                                  </td>
                                  <td style="width: 264px; height: 13px; text-align: center">
                                    <strong>면허</strong>
                                  </td>
                                  <td style="width: 285px; height: 13px; text-align: center">
                                    <strong>배차</strong>
                                  </td>
                                  <td style="width: 220px; height: 13px; text-align: center">
                                    <strong>입고</strong>
                                  </td>
                                  <td style="width: 403px; height: 13px; text-align: center">
                                    <strong>출고</strong>
                                  </td>
                                  <td style="width: 451px; height: 13px; text-align: center">
                                    <strong>INV#</strong>
                                  </td>
                                  <td style="width: 493px; height: 13px; text-align: center">
                                    <strong>PO#</strong>
                                  </td>
                                  <td style="width: 345px; height: 13px; text-align: center">
                                    <strong>H Remark</strong>
                                  </td>
                                  <td style="width: 338px; height: 13px; text-align: center">
                                    <strong>담당자</strong>
                                  </td>
                                  <td style="width: 321px; height: 13px; text-align: center">
                                    <strong>Selling</strong>
                                  </td>
                                  <td style="width: 299px; height: 13px; text-align: center">
                                    <strong>Q'ty</strong>
                                  </td>
                                  <td style="width: 294px; height: 13px; text-align: center">
                                    <strong>A.G/WT</strong>
                                  </td>
                                  <td style="width: 265px; height: 13px; text-align: center">
                                    <strong>A.V/WT</strong>
                                  </td>
                                  <td style="width: 413px; height: 13px; text-align: center">
                                    <strong>C/WT</strong>
                                  </td>
                                  <td style="width: 163px; height: 13px; text-align: center">
                                    <strong>DIMS</strong>
                                  </td>
                                </tr>
                            
                                
                                <tr class="rowsfooter" style="height: 13px">
                                  <td style="width: 212px; height: 13px"> </td>
                                  <td style="width: 187px; height: 13px"> </td>
                                  <td style="width: 265px; height: 13px"> </td>
                                  <td style="width: 243px; height: 13px"> </td>
                                  <td style="width: 243px; height: 13px"> </td>
                                  <td style="width: 492.281px; height: 13px"> </td>
                                  <td style="width: 530.719px; height: 13px"> </td>
                                  <td style="width: 558px; height: 13px"> </td>
                                  <td style="width: 262px; height: 13px"> </td>
                                  <td style="width: 264px; height: 13px"> </td>
                                  <td style="width: 285px; height: 13px"> </td>
                                  <td style="width: 220px; height: 13px"> </td>
                                  <td style="width: 403px; height: 13px"> </td>
                                  <td style="width: 451px; height: 13px"> </td>
                                  <td style="width: 493px; height: 13px"> </td>
                                  <td style="width: 345px; height: 13px"> </td>
                                  <td style="width: 338px; height: 13px"> </td>
                                  <td style="width: 321px; height: 13px; text-align: center">
                                    <strong>HAWB</strong>
                                  </td>
                                  <td id="sum-1" style="width: 299px; height: 13px; text-align: right">
                                     
                                  </td>
                                  <td style="width: 294px; height: 13px; text-align: center"> </td>
                                  <td style="width: 265px; height: 13px; text-align: center">
                                     <strong>Total</strong>
                                  </td>
                                  <td id="sum-2" style="width: 413px; height: 13px; text-align: right">
                                     
                                  </td>
                                  <td style="width: 163px; height: 13px"> </td>
                                </tr>
                              </tbody>
                            </table>

                       `;
      //   is_complete += row_master;
      //   console.log(is_complete);
      $("#printDIV div").html(is_complete);

      var is_completee = "";
      for (let i = 0; i < res_detail.length; i++) {
        let item = res_detail[i];
        //     total += item.release_qty;

        let hawb_no = item.hawb_no || "";
        let shpr = item.shipper || "";
        let cnee = item.consignee || "";
        let h_dest = item.destination || "";
        let qty = item.total_qty || 0;
        let g_wt = item.total_weight || "";
        let volume_weight = item.volume_weight || "";
        let dims = item.volume || "";
        let custom_party = item.custom_party || "";
        let dom_transport = item.dom_transport || "";
        let dom_transport_date = item.dom_transport_date || "";
        let shipment = item.shipment || "";
        let invoice_no = item.invoice_no || "";
        let po_no = item.po_no || "";
        let shipping_mark_level = item.shipping_mark_level || "";
        let dsv_contact = item.dsv_contact || "";
        let notes = item.notes || "";
        let charge_weight = item.charge_weight || "";

        let newRow = `
                   <tr class="rowsrepeat" style="height: 13px">
                      <td style="width: 212px; height: 13px; text-align: center"> </td>
                      <td class="hawb_no" style="width: 187px; height: 13px">
                        ${hawb_no}
                      </td>
                      <td class="shpr" style="width: 265px; height: 13px">
                       ${shpr}
                      </td>
                      <td class="cnee" style="width: 243px; height: 13px">
                        ${cnee}
                      </td>
                      <td class="h_dest" style="width: 243px; height: 13px">
                       ${h_dest}
                      </td>
                      <td class="qty" style="width: 492.281px; height: 13px; text-align: right">
                        ${qty}
                      </td>
                      <td class="g_wt" style="width: 530.719px; height: 13px; text-align: right">
                        ${g_wt}
                      </td>
                      <td class ="volume_weight" style="width: 558px; height: 13px; text-align: right">
                        ${volume_weight}
                      </td>
                      <td class="dims" style="width: 262px; height: 13px">
                        ${dims}
                      </td>
                      <td class="custom_party" style="width: 264px; height: 13px">
                         ${custom_party}
                      </td>
                      <td class="dom_transport" style="width: 285px; height: 13px">
                         ${dom_transport}
                      </td>
                      <td class="dom_transport_date" style="width: 220px; height: 13px">
                        ${dom_transport_date}
                      </td>
                      <td class="shipment" style="width: 403px; height: 13px">
                       ${shipment}
                      </td>
                      <td class="invoice_no" style="width: 451px; height: 13px">
                      ${invoice_no}
                      </td>
                      <td class="po_no" style="width: 493px; height: 13px">
                       ${po_no}
                      </td>
                      <td class="shipping_mark_level" style="width: 345px; height: 13px">
                        ${shipping_mark_level}
                      </td>
                      <td class="dsv_contact" style="width: 338px; height: 13px">
                        ${dsv_contact}
                      </td>
                      <td class="notes" style="width: 321px; height: 13px">
                        ${notes}
                      <td class="sum-1" style="width: 299px; height: 13px; text-align: right">
                        ${qty}
                      </td>
                      <td class="sum-3" style="width: 294px; height: 13px; text-align: right">
                       ${g_wt}
                      </td>
                      <td class="sum-4" style="width: 265px; height: 13px; text-align: right">
                       ${volume_weight} 
                      </td>
                      <td class="sum-2" style="width: 413px; height: 13px; text-align: right">
                        ${charge_weight} 
                      </td>
                      <td style="width: 163px; height: 13px">
                         ${dims}
                      </td>
                </tr>
                `;

        is_completee += newRow;
      }

      $("#tr_lv2").after(is_completee);

      let release_request = res_master[0].release_request || "";
      let print_yn = res_master[0].print_yn || "";
      // console.log({ print_yn });
      release_request === "출고요청"
        ? $("#CLP_id").text("O")
        : $("#CLP_id").text("");
      print_yn === "Y"
        ? $("#print_yn_id").text("O")
        : $("#print_yn_id").text("");
    },
    error: function (xmlHttpRequest, txtStatus, errorThrown) {
      console.log("erorr");
    },
  });
}
getData();

// $("#printDIV div").hide();
let height = $("#printDIV").height();
if (height > 757) {
  //     let a=$("#printDIV div").clone()
  //     console.log(a)
  //   $("#printDIV").append(a);
  // // $("#title_table").clone().appendTo(("#printDIV div"));
}
console.log(height);

//Declare variable
let elements_1 = $(".sum-1");
let elements_2 = $(".sum-2");
let elements_3 = $(".sum-3");
let elements_4 = $(".sum-4");
let sum1 = 0;
let sum2 = 0;
let sum3 = 0;
let sum4 = 0;

//get total by id
for (let i = 0; i < elements_1.length; i++) {
  let a = elements_1[i].innerText;
  a = parseFloat(a);

  if (isNaN(a)) {
    a = 0;
  }
  sum1 += a;
}

//get total by id
for (let i = 0; i < elements_2.length; i++) {
  let a = elements_2[i].innerText;
  a = parseFloat(a.replace(",", ""));

  if (isNaN(a)) {
    a = 0;
  }
  sum2 += a;
}

//get total by id
for (let i = 0; i < elements_3.length; i++) {
  let a = elements_3[i].innerText;
  a = parseFloat(a.replace(",", ""));

  if (isNaN(a)) {
    a = 0;
  }
  sum3 += a;
}

//get total by id
for (let i = 0; i < elements_4.length; i++) {
  let a = elements_4[i].innerText;
  a = parseFloat(a.replace(",", ""));

  if (isNaN(a)) {
    a = 0;
  }
  sum4 += a;
}

$("#sum-1")[0].innerText = formatNumber(getNum(sum1));
$("#sum-2")[0].innerText = formatNumber(getNum(sum2));
$("#sum-3")[0].innerText = formatNumber(getNum(sum3));
$("#sum-4")[0].innerText = formatNumber(getNum(sum4));
$("#sum-1").css("font-weight", "bold");
$("#sum-2").css("font-weight", "bold");
$("#sum-3").css("font-weight", "bold");
$("#sum-4").css("font-weight", "bold");

//format number
function formatNumber(number) {
  // Chuyển số thành chuỗi
  let numStr = number.toString();

  // Tìm vị trí của dấu thập phân
  let decimalIndex = numStr.indexOf(".");

  // Nếu không có dấu thập phân, gán vị trí cuối cùng của chuỗi
  if (decimalIndex === -1) {
    decimalIndex = numStr.length;
  }

  // Duyệt qua chuỗi từ cuối về đầu và chèn dấu ',' sau mỗi ba chữ số
  for (let i = decimalIndex - 3; i > 0; i -= 3) {
    numStr = numStr.slice(0, i) + "," + numStr.slice(i);
  }

  // Trả về chuỗi đã định dạng
  return numStr;
}

//prevent NaN val
function getNum(val) {
  if (isNaN(val)) {
    return 0;
  }
  return val;
}

// Function to add numbering to the 순번 column
function addSequenceNumbers() {
  // Get the tbody element
  var tbody = document
    .getElementById("data_table")
    .getElementsByTagName("tbody")[0];

  // Get all rows in the tbody
  var rows = tbody.getElementsByTagName("tr");

  // Iterate through the rows and add sequence number to the first cell
  for (var i = 2; i < rows.length - 2; i++) {
    var sequenceCell = rows[i + 1].getElementsByTagName("td")[0];
    sequenceCell.textContent = i - 1;
  }
}

// Combined function to run both functions on window.onload
function onWindowLoad() {
  addSequenceNumbers();
}

// Call the combined function to add sequence numbers when the page loads
window.onload = onWindowLoad;
