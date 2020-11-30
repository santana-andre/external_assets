//$("body").append("<script src='https://193.122.145.73:3000/occjs' cliente='teste'></script>")

function getSyncScriptParams() {
    var scripts = document.getElementsByTagName('script');
    var lastScript = scripts[scripts.length - 1];
    var scriptName = lastScript;
    return scriptName.getAttribute('cliente');
}


//Get Cliente Param
var cliente = getSyncScriptParams()

var url_base = "https://193.122.145.73:3000/v1/external_assets";
//---------------------------- Buscar customizações expecifica
function getCustomer(callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4) {
            if (xmlHttp.status == 200) {
                callback(xmlHttp.responseText);
            } else if (xmlHttp.status == 500) {
                alert("Erro Response: " + xmlHttp.responseText);
            }
        }
    }
    let customer_name = cliente;
    let url = url_base + "/costumer_name/" + customer_name;
    xmlHttp.open('GET', url, true); // true for asynchronous 
    xmlHttp.setRequestHeader('Access-Control-Allow-Origin', url);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.setRequestHeader("Authorization", "Basic YWRtaW46b3JhY2xlMTIz");
    xmlHttp.send();
}

function responseGetCustomer(response) {
    // console.log("responseGetCustomer ", response);
    var resp = JSON.parse(response)
    if (resp.message == "success") {
        json = resp.data;
        init(json)
        // console.log(resp.data);
    }

}

function triggerGetCustomer() {
    getCustomer(responseGetCustomer);
}

triggerGetCustomer()

//INSERINDO DADOS NA PAGINA

function init(json) {
    //Custom CSS
    var customcss = `
<style id="custom_style"> 
@import url('${json.url_da_fonte}');
*{
    font-family: ${json.nome_da_fonte};
}

a, a:link, a:visited, a:hover {
    color: ${json.cor_do_link};
}
.cc-button-primary {
    background-color: ${json.cor_do_fundo_do_botao};
    color: ${json.cor_do_texto_do_botao};
    border-color: ${json.cor_da_borda_do_botao};
}
.cc-button-primary:hover, .cc-button-primary:active {
    background-color: ${json.cor_do_fundo_do_botao_hover};
    color: ${json.cor_do_texto_do_botao_hover};
    border-color: ${json.cor_da_borda_do_botao_hover};
}

.logo img{
    height: 80px;
    width: auto;
}

.collapse.navbar-collapse.mega-menu-fullwidth-collapse {
    background: ${json.cor_do_fundo_do_menu} !important;
}

#megaMenu_v5-megaMenuInst_v5 #CC-megaMenu .mega-menu .nav>li>a {
    color     : ${json.cor_do_texto_do_menu} !important;
    background: ${json.cor_do_fundo_do_menu} !important;
}

.footer-links {
    background: ${json.cor_do_fundo_do_rodape} !important;
    color     : ${json.cor_do_texto_do_rodape} !important;
}

footer.col-xs-12.footer a {
    color: ${json.cor_do_texto_do_rodape};
}
${json.css_customizado}
</style>`


    $.Topic("page.ready.memory").subscribe(function () {
        clearElements();

        setTimeout(function () {
            $("body").append(customcss)

            //Logo
            $(".logo img").attr("src", json.url_do_logo)

            //Banner Home
            if ($("#alert-page-change").html() == "homePage is loaded.") {
                $("#main").append('<img id="banner_home" src="' + json.url_do_banner_da_home + '" style="width:100%;"/>')
            }
        }, 500)

    })


    function clearElements() {
        $("#banner_home, #custom_style").remove();
    }
}
