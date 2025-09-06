function tno_pre(tno) {
    if (tno =="")
    {        }
    else
    {
        var purl = "/tree/bbl?kind=tad&bbl=tp&tno=" +tno
        window.open(purl, 'home_target_pre_'+tno ,'top=1, left=1,width=' + screen.width + ',height=' + screen.height + ',fullscreen=yes');
    }
}

function tno_pcid(tno) {
    if (tno =="")
    {        }
    else
    {
    var purl = "/tree/bbl?kind=tad&bbl=tp&tno=" +tno
    window.open(purl, 'home_target_pcid_'+tno ,'top=1, left=1,width=' + screen.width + ',height=' + screen.height + ',fullscreen=yes');
    }
}

function tno_next(tno) {
    if (tno =="")
    {        }
    else
    {
    var purl = "/tree/bbl?kind=tad&bbl=tn&tno=" +tno
    window.open(purl, 'home_target_next_'+tno ,'top=1, left=1,width=' + screen.width + ',height=' + screen.height + ',fullscreen=yes');
    }
}

 function tno_partner(tno) {
     if (tno =="")
    {        }
    else
    {
        var purl = "/tree/bbl?kind=tad&bbl=pa&tno=" +tno
        window.open(purl, 'home_target_partner_'+tno ,'top=1, left=1,width=' + screen.width + ',height=' + screen.height + ',fullscreen=yes');
    }
}

function imgview_category(cate,imgidsrc)
{
    fetch('https://hapix.halfclub.com/searches/prdList/?limit=0,1&sortSeq=12&siteCd=1&device=pc&dpCtgrNo2='+cate)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    if (data?.data?.result?.hits?.hits?.[0] === undefined) {
        } else {
          var getimgsrc = data.data.result.hits.hits[0]._source.appPrdImgUrl ;
            document.getElementById(imgidsrc).src = getimgsrc;
        }
       }
  )
}

function imgview_product(prd,imgidsrc)
{
    fetch('https://hapix.halfclub.com/product/products/recentViewListSrch?prdNoList='+prd)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // 예시: 결과가 data.searchPrdList[0].appPrdImgUrl에 있다고 가정
    //console.log(imgidsrc);
    //console.log(data);
    //console.log(data.data[0].basicExtNm);
    var getimgsrc = data.data[0].basicExtNm ;
    document.getElementById(imgidsrc).src = "https://cdn2.halfclub.com/rimg/30x30/contain/"+getimgsrc;

  })
}


function fn_tree(pkind,pdevice) {
       var psite = document.getElementById("site").value;
       var pday = document.getElementById("day").value;
       window.open('/tree?kind='+pkind+'&day='+pday+'&site='+psite+'&device='+pdevice, 'tree_' + new Date().getTime() ,'top=1, left=1,width=' + screen.width + ',height=' + screen.height + ',fullscreen=yes');
}

function fn_bbl(pkind,pdevice) {
       var psite = document.getElementById("site").value;
       var pday = document.getElementById("day").value;
       window.open('/tree/bbl?bbl='+pkind+'&day='+pday+'&site='+psite+'&device='+pdevice, 'bbl_' + new Date().getTime() ,'top=1, left=1,width=' + screen.width + ',height=' + screen.height + ',fullscreen=yes');
}

